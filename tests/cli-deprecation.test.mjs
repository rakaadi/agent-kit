import assert from 'node:assert/strict'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import test from 'node:test'

const repoRoot = process.cwd()
const cliPath = path.join(repoRoot, 'bin', 'cli.js')

function runCli(args = []) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
  })
}

test('help invocation prints migration guidance and succeeds', () => {
  const result = runCli(['--help'])

  assert.equal(result.status, 0)
  assert.match(result.stdout, /deprecated/i)
  assert.match(result.stdout, /copilot plugin install/)
  assert.match(result.stdout, /npx skills add/)
  assert.match(result.stdout, /skills\.sh/)
})

test('default invocation no longer installs files and exits non-zero', () => {
  const result = runCli()

  assert.equal(result.status, 1)
  assert.match(result.stdout, /deprecated/i)
  assert.match(result.stdout, /no longer copies content into \.github\//)
})
