import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const repoRoot = process.cwd()
const contract = JSON.parse(readFileSync(path.join(repoRoot, 'compat', 'shared-copilot-contract.json'), 'utf8'))
const skillsRoot = path.join(repoRoot, 'skills')
const agentsRoot = path.join(repoRoot, 'agents')

function readFrontmatter(filePath) {
  const content = readFileSync(filePath, 'utf8')
  const match = content.match(/^---\n([\s\S]*?)\n---/)

  assert.ok(match, `${path.relative(repoRoot, filePath)} is missing frontmatter`)

  const fields = {}
  for (const line of match[1].split('\n')) {
    const fieldMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (fieldMatch) {
      fields[fieldMatch[1]] = fieldMatch[2]
    }
  }

  return {
    content,
    fields,
  }
}

test('skill directories match SKILL.md names', () => {
  const skillDirs = readdirSync(skillsRoot, { withFileTypes: true }).filter(entry => entry.isDirectory())

  for (const entry of skillDirs) {
    const skillPath = path.join(skillsRoot, entry.name, 'SKILL.md')
    const { fields } = readFrontmatter(skillPath)

    for (const field of contract.skills.requiredFrontmatter) {
      assert.ok(fields[field], `${entry.name}/SKILL.md is missing "${field}"`)
    }

    assert.equal(entry.name, fields.name, `${entry.name}/SKILL.md name does not match directory`)
  }
})

test('agents satisfy the shared frontmatter contract', () => {
  const agentFiles = readdirSync(agentsRoot).filter(name => name.endsWith('.agent.md'))

  for (const agentFile of agentFiles) {
    const { fields } = readFrontmatter(path.join(agentsRoot, agentFile))

    for (const field of contract.agents.requiredFrontmatter) {
      assert.ok(fields[field], `${agentFile} is missing "${field}"`)
    }

    if (fields.tools) {
      for (const legacyId of contract.agents.sharedToolPolicy.legacyToolIdsToRemove) {
        assert.equal(fields.tools.includes(legacyId), false, `${agentFile} still references legacy tool "${legacyId}"`)
      }
    }
  }
})

test('plugin content no longer points at legacy guidance locations', () => {
  const filesToCheck = [
    path.join(agentsRoot, 'code-reviewer.agent.md'),
    path.join(agentsRoot, 'code-simplifier.agent.md'),
    path.join(skillsRoot, 'code-debugging', 'SKILL.md'),
  ]

  for (const filePath of filesToCheck) {
    const content = readFileSync(filePath, 'utf8')

    for (const legacyRef of contract.instructions.forbiddenLegacyReferences) {
      assert.equal(content.includes(legacyRef), false, `${path.relative(repoRoot, filePath)} still references ${legacyRef}`)
    }
  }
})
