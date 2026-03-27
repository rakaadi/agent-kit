import assert from 'node:assert/strict'
import { existsSync, lstatSync, readFileSync, readlinkSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const repoRoot = process.cwd()
const contractPath = path.join(repoRoot, 'compat', 'shared-copilot-contract.json')
const manifestPath = path.join(repoRoot, 'plugin.json')
const packagePath = path.join(repoRoot, 'package.json')

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'))
}

test('shared contract exists and records reviewed source docs', () => {
  assert.equal(existsSync(contractPath), true)

  const contract = readJson(contractPath)

  assert.equal(contract.reviewedAt, '2026-03-19')
  assert.ok(Array.isArray(contract.sources))
  assert.ok(contract.sources.length >= 3)
  assert.ok(contract.sources.every(source => source.url && source.reviewedAt))
  assert.ok(contract.manualSmokePrerequisites.some(item => item.includes('chat.plugins.enabled')))
})

test('plugin manifest matches the shared contract', () => {
  const contract = readJson(contractPath)
  const manifest = readJson(manifestPath)
  const pkg = readJson(packagePath)

  for (const field of contract.pluginManifest.requiredFields) {
    assert.ok(manifest[field], `plugin.json is missing required field "${field}"`)
  }

  for (const field of contract.pluginManifest.recommendedFields) {
    assert.ok(manifest[field], `plugin.json is missing recommended field "${field}"`)
  }

  assert.equal(manifest.name, pkg.name)
  assert.equal(manifest.version, pkg.version)
  assert.equal(manifest.agents, contract.pluginManifest.requiredComponentPaths.agents)
  assert.equal(manifest.commands, contract.pluginManifest.requiredComponentPaths.commands)
  assert.equal(manifest.hooks, contract.pluginManifest.requiredComponentPaths.hooks)
  assert.equal(manifest.skills, contract.pluginManifest.requiredComponentPaths.skills)
})

test('VS Code prompt bridge points at canonical commands directory', () => {
  const promptBridgePath = path.join(repoRoot, '.github', 'prompts')

  assert.equal(existsSync(promptBridgePath), true)
  assert.equal(lstatSync(promptBridgePath).isSymbolicLink(), true)
  assert.equal(readlinkSync(promptBridgePath), '../commands')
})
