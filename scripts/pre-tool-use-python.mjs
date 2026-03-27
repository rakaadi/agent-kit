#!/usr/bin/env node

import { readFileSync } from 'node:fs'

const SHELL_TOOLS = new Set([
  'bash',
  'cmd',
  'command',
  'exec',
  'execute',
  'execute_bash',
  'execute_command',
  'run',
  'run_command',
  'run_in_terminal',
  'runInTerminal',
  'shell',
  'terminal',
])

// Matches bare `python` (not python3, python3.x, or python2.x as distinct version specs)
// Catches: `python script.py`, `python -m pip`, `python -c "..."`, `/usr/bin/python ...`
const BARE_PYTHON_PATTERN = /\bpython(?!3)(?=\s|$|-)/m

function main() {
  try {
    const rawInput = readStdin()
    if (!rawInput.trim()) return

    const payload = JSON.parse(rawInput)
    const toolName = payload.toolName ?? payload.tool_name ?? ''

    if (!toolName || !SHELL_TOOLS.has(toolName)) return

    const command = extractCommand(payload)
    if (!command || !BARE_PYTHON_PATTERN.test(command)) return

    writeHookOutput('Use `python3` instead of `python`. The `python` command is absent or points to Python 2 on most macOS/Linux systems.')
  } catch {
    // fail silently — never block the agent on hook errors
  }
}

function readStdin() {
  return readFileSync(0, 'utf8')
}

function extractCommand(payload) {
  const args = getToolArgs(payload)

  for (const key of ['command', 'cmd', 'input', 'code', 'script']) {
    const value = args[key]
    if (typeof value === 'string' && value.trim()) {
      return value
    }
  }

  return null
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

function writeHookOutput(message) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        additionalContext: message,
      },
    })
  )
}

main()
