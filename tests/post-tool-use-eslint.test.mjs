import assert from 'node:assert/strict'
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import test from 'node:test'

const repoRoot = process.cwd()
const scriptPath = path.join(repoRoot, 'scripts', 'post-tool-use-eslint.mjs')

function setupGitRepo({ eslintScriptBody }) {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), 'agent-kit-hook-'))
  mkdirSync(path.join(tempDir, 'src'), { recursive: true })
  mkdirSync(path.join(tempDir, 'node_modules', '.bin'), { recursive: true })

  writeFileSync(path.join(tempDir, 'src', 'example.ts'), 'export const value = 1\n', 'utf8')
  writeFileSync(path.join(tempDir, 'package.json'), JSON.stringify({ name: 'fixture' }) + '\n', 'utf8')
  writeFileSync(path.join(tempDir, 'node_modules', '.bin', 'eslint'), eslintScriptBody, 'utf8')
  chmodSync(path.join(tempDir, 'node_modules', '.bin', 'eslint'), 0o755)

  spawnSync('git', ['init'], { cwd: tempDir, encoding: 'utf8' })
  spawnSync('git', ['config', 'user.email', 'hook@example.com'], { cwd: tempDir, encoding: 'utf8' })
  spawnSync('git', ['config', 'user.name', 'Hook Test'], { cwd: tempDir, encoding: 'utf8' })
  spawnSync('git', ['add', '.'], { cwd: tempDir, encoding: 'utf8' })
  spawnSync('git', ['commit', '-m', 'init'], { cwd: tempDir, encoding: 'utf8' })

  writeFileSync(path.join(tempDir, 'src', 'example.ts'), 'export const value = 2\n', 'utf8')
  return tempDir
}

function runHook(cwd, payload) {
  const result = spawnSync(process.execPath, [scriptPath], {
    cwd,
    encoding: 'utf8',
    input: JSON.stringify(payload),
  })

  assert.equal(result.status, 0, result.stderr)
  return result.stdout ? JSON.parse(result.stdout) : null
}

test('hook reports success and caches linted file set', () => {
  const cwd = setupGitRepo({
    eslintScriptBody: '#!/bin/sh\nexit 0\n',
  })

  try {
    const payload = {
      cwd,
      toolName: 'editFiles',
      toolArgs: JSON.stringify({ files: ['src/example.ts'] }),
      toolResult: {
        resultType: 'success',
      },
    }

    const firstRun = runHook(cwd, payload)
    const secondRun = runHook(cwd, payload)
    const cachePath = path.join(cwd, '.git', 'agent-kit-hooks', 'posttooluse-eslint-cache.json')

    assert.match(firstRun.hookSpecificOutput.additionalContext, /ESLint passed/)
    assert.match(firstRun.hookSpecificOutput.additionalContext, /No need to run repo-wide lint again/)
    assert.match(secondRun.hookSpecificOutput.additionalContext, /already succeeded/)
    assert.equal(JSON.parse(readFileSync(cachePath, 'utf8')).files[0], 'src/example.ts')
  } finally {
    rmSync(cwd, { recursive: true, force: true })
  }
})

test('hook reports lint failures for touched files', () => {
  const cwd = setupGitRepo({
    eslintScriptBody: '#!/bin/sh\necho "src/example.ts:1:1 Unexpected lint error" >&2\nexit 1\n',
  })

  try {
    const payload = {
      cwd,
      tool_name: 'editFiles',
      tool_input: { files: ['src/example.ts'] },
      tool_response: 'File edited successfully',
    }

    const output = runHook(cwd, payload)

    assert.match(output.hookSpecificOutput.additionalContext, /ESLint found issues/)
    assert.match(output.hookSpecificOutput.additionalContext, /Unexpected lint error/)
  } finally {
    rmSync(cwd, { recursive: true, force: true })
  }
})
