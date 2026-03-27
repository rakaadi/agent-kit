#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'

const LINTABLE_EXTENSIONS = new Set([
  '.js',
  '.jsx',
  '.cjs',
  '.mjs',
  '.ts',
  '.tsx',
  '.cts',
  '.mts',
])

const FILE_MODIFYING_TOOLS = new Set([
  'apply_patch',
  'create',
  'createFile',
  'edit',
  'editFiles',
  'multiEdit',
  'replaceStringInFile',
  'write',
  'writeFile',
])

function main() {
  try {
    const rawInput = readStdin()
    if (!rawInput.trim()) {
      return
    }

    const payload = JSON.parse(rawInput)
    const cwd = payload.cwd
    const toolName = payload.toolName ?? payload.tool_name ?? ''

    if (!cwd || !toolName || !FILE_MODIFYING_TOOLS.has(toolName) || !didToolSucceed(payload)) {
      return
    }

    const lintTargets = resolveLintTargets(cwd, payload)
    if (lintTargets.length === 0) {
      return
    }

    const cachePath = getCachePath(cwd)
    const signature = createSignature(lintTargets)
    const cache = readCache(cachePath)

    if (cache?.signature === signature) {
      writeHookOutput(
        `Agent Kit hook: ESLint already succeeded for the current touched files (${formatFileList(cwd, lintTargets)}). Do not rerun repo-wide lint unless these files change.`
      )
      return
    }

    const eslintResult = runEslint(cwd, lintTargets)
    if (eslintResult.kind === 'unavailable') {
      writeHookOutput(
        `Agent Kit hook: skipped ESLint because no repo-local eslint executable was available for the touched files (${formatFileList(cwd, lintTargets)}).`
      )
      return
    }

    if (eslintResult.exitCode === 0) {
      writeCache(cachePath, {
        signature,
        files: lintTargets.map(file => path.relative(cwd, file)),
      })

      writeHookOutput(
        `Agent Kit hook: ESLint passed for the current touched files (${formatFileList(cwd, lintTargets)}). No need to run repo-wide lint again unless these files change.`
      )
      return
    }

    writeHookOutput(
      [
        `Agent Kit hook: ESLint found issues in the current touched files (${formatFileList(cwd, lintTargets)}). Fix these issues instead of running repo-wide lint.`,
        trimOutput(eslintResult.output),
      ]
        .filter(Boolean)
        .join('\n')
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    writeHookOutput(`Agent Kit hook: skipped touched-file ESLint due to an internal hook error: ${message}`)
  }
}

function readStdin() {
  return readFileSync(0, 'utf8')
}

function didToolSucceed(payload) {
  const resultType = payload.toolResult?.resultType ?? payload.tool_result?.resultType
  if (!resultType) {
    return true
  }

  return resultType === 'success'
}

function resolveLintTargets(cwd, payload) {
  const gitFiles = listGitChangedFiles(cwd)
  const inputFiles = extractInputPaths(cwd, getToolArgs(payload))
  const candidates = gitFiles.length > 0 ? gitFiles : inputFiles

  return [...new Set(candidates)]
    .filter(filePath => existsSync(filePath))
    .filter(filePath => {
      try {
        return statSync(filePath).isFile()
      } catch {
        return false
      }
    })
    .filter(filePath => LINTABLE_EXTENSIONS.has(path.extname(filePath)))
    .sort()
}

function getToolArgs(payload) {
  if (payload.tool_input && typeof payload.tool_input === 'object') {
    return payload.tool_input
  }

  if (payload.toolArgs && typeof payload.toolArgs === 'string') {
    try {
      return JSON.parse(payload.toolArgs)
    } catch {
      return {}
    }
  }

  if (payload.toolArgs && typeof payload.toolArgs === 'object') {
    return payload.toolArgs
  }

  return {}
}

function listGitChangedFiles(cwd) {
  const gitRootResult = spawnSync('git', ['rev-parse', '--show-toplevel'], {
    cwd,
    encoding: 'utf8',
  })

  if (gitRootResult.status !== 0) {
    return []
  }

  const gitRoot = gitRootResult.stdout.trim()
  const statusResult = spawnSync('git', ['status', '--porcelain', '--untracked-files=all'], {
    cwd: gitRoot,
    encoding: 'utf8',
  })

  if (statusResult.status !== 0) {
    return []
  }

  return statusResult.stdout
    .split('\n')
    .map(line => line.trimEnd())
    .filter(Boolean)
    .map(line => {
      const status = line.slice(0, 2)
      const rawPath = line.slice(3)
      const relativePath = rawPath.includes(' -> ') ? rawPath.split(' -> ').at(-1) : rawPath

      if (status.includes('D')) {
        return null
      }

      return path.join(gitRoot, relativePath)
    })
    .filter(Boolean)
}

function extractInputPaths(cwd, value, keyName = '') {
  if (typeof value === 'string') {
    if (!/(^|_)(file|path|paths?)$/i.test(keyName)) {
      return []
    }

    return [path.resolve(cwd, value)]
  }

  if (Array.isArray(value)) {
    return value.flatMap(item => extractInputPaths(cwd, item, keyName))
  }

  if (!value || typeof value !== 'object') {
    return []
  }

  return Object.entries(value).flatMap(([entryKey, entryValue]) => extractInputPaths(cwd, entryValue, entryKey))
}

function getCachePath(cwd) {
  const gitDirResult = spawnSync('git', ['rev-parse', '--git-dir'], {
    cwd,
    encoding: 'utf8',
  })

  const baseDir = gitDirResult.status === 0
    ? path.resolve(cwd, gitDirResult.stdout.trim())
    : path.join(cwd, '.copilot-agent-kit')

  return path.join(baseDir, 'agent-kit-hooks', 'posttooluse-eslint-cache.json')
}

function readCache(cachePath) {
  try {
    if (!existsSync(cachePath)) {
      return null
    }

    return JSON.parse(readFileSync(cachePath, 'utf8'))
  } catch {
    return null
  }
}

function writeCache(cachePath, value) {
  mkdirSync(path.dirname(cachePath), { recursive: true })
  writeFileSync(cachePath, JSON.stringify(value, null, 2) + '\n', 'utf8')
}

function createSignature(files) {
  const hash = createHash('sha256')

  for (const filePath of files) {
    const stats = statSync(filePath)
    hash.update(`${filePath}:${stats.size}:${Math.floor(stats.mtimeMs)}\n`)
  }

  return hash.digest('hex')
}

function runEslint(cwd, files) {
  const localExecutable = path.join(cwd, 'node_modules', '.bin', process.platform === 'win32' ? 'eslint.cmd' : 'eslint')
  const args = files.map(filePath => path.relative(cwd, filePath))
  const result = existsSync(localExecutable)
    ? spawnSync(localExecutable, args, { cwd, encoding: 'utf8' })
    : spawnSync('npx', ['--no-install', 'eslint', ...args], { cwd, encoding: 'utf8' })

  if (result.error && result.error.code === 'ENOENT') {
    return { kind: 'unavailable' }
  }

  const output = [result.stdout, result.stderr].filter(Boolean).join('\n').trim()
  return {
    kind: 'executed',
    exitCode: result.status ?? 1,
    output,
  }
}

function formatFileList(cwd, files) {
  const relativeFiles = files.map(filePath => path.relative(cwd, filePath))
  if (relativeFiles.length <= 5) {
    return relativeFiles.join(', ')
  }

  return `${relativeFiles.slice(0, 5).join(', ')}, +${relativeFiles.length - 5} more`
}

function trimOutput(output) {
  if (!output) {
    return ''
  }

  const lines = output.split('\n').filter(Boolean)
  return lines.slice(0, 20).join('\n')
}

function writeHookOutput(message) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PostToolUse',
        additionalContext: message,
      },
    })
  )
}

main()
