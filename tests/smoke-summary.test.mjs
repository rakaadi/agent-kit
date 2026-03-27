import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const repoRoot = process.cwd()
const pkg = JSON.parse(readFileSync(path.join(repoRoot, 'package.json'), 'utf8'))

test('npm test is the single verification entry point', () => {
  assert.equal(pkg.scripts.test, 'node --test')
})

test('core validation tests exist', () => {
  const expected = [
    'tests/plugin-manifest.test.mjs',
    'tests/content-compatibility.test.mjs',
    'tests/cli-deprecation.test.mjs',
    'tests/post-tool-use-eslint.test.mjs',
    'tests/readme-installation.test.mjs',
    'tests/smoke-summary.test.mjs',
  ]

  for (const relativePath of expected) {
    assert.equal(existsSync(path.join(repoRoot, relativePath)), true, `${relativePath} is missing`)
  }
})
