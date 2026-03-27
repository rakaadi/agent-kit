import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const readme = readFileSync(path.join(process.cwd(), 'README.md'), 'utf8')

test('README documents the plugin-first installation flow', () => {
  assert.match(readme, /copilot plugin install/)
  assert.match(readme, /Chat: Install Plugin From Source/)
  assert.match(readme, /chat\.plugins\.enabled/)
})

test('README documents standalone skills and legacy CLI deprecation', () => {
  assert.match(readme, /skills\.sh/)
  assert.match(readme, /npx skills add/)
  assert.match(readme, /deprecated/i)
})

test('README documents plugin MVP scope boundaries', () => {
  assert.match(readme, /commands\//)
  assert.match(readme, /\.github\/prompts/)
  assert.match(readme, /instructions\//)
  assert.match(readme, /plugin MVP/)
})
