#!/usr/bin/env node

import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname, relative } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PACKAGE_ROOT = join(__dirname, '..')

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  dim: '\x1b[2m',
}

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`)
}

function parseArgs(args) {
  const options = {
    agents: false,
    skills: false,
    prompts: false,
    instructions: false,
    all: false,
    auto: false,
    help: false,
    list: false,
    dest: process.cwd(),
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    switch (arg) {
      case '--agents':
      case '-a':
        options.agents = true
        break
      case '--skills':
      case '-s':
        options.skills = true
        break
      case '--prompts':
      case '-p':
        options.prompts = true
        break
      case '--instructions':
      case '-i':
        options.instructions = true
        break
      case '--all':
        options.all = true
        break
      case '--auto':
        options.auto = true
        break
      case '--help':
      case '-h':
        options.help = true
        break
      case '--list':
      case '-l':
        options.list = true
        break
      case '--dest':
      case '-d':
        options.dest = args[++i] || process.cwd()
        break
    }
  }

  // Default to all if no specific option
  const hasSpecific = options.agents || options.skills || options.prompts || options.instructions
  if (!hasSpecific && !options.all && !options.help && !options.list) {
    options.all = true
  }

  return options
}

function showHelp() {
  console.log(`
agent-kit - Install AI agent definitions, skills, prompts, and instructions

Usage:
  npx agent-kit [options]

Options:
  --agents, -a        Install agent definitions
  --skills, -s        Install skill modules
  --prompts, -p       Install prompt templates
  --instructions, -i  Install instruction files
  --all               Install everything (default)
  --list, -l          List available content
  --dest, -d          Destination directory (default: current directory)
  --help, -h          Show this help message

Examples:
  npx agent-kit                     # Install all to .github/
  npx agent-kit --agents --skills   # Install agents and skills only
  npx agent-kit --prompts           # Install only prompts
  npx agent-kit -d ./my-project     # Install to specific directory

Installation via package manager (recommended as optional dependency):
  npm install github:rakaadi/agent-kit -O
  pnpm add github:rakaadi/agent-kit -O
  bun add github:rakaadi/agent-kit --optional

Note: Install with optional flags (-O/--optional) since agent-kit is for
development use and the project remains fully functional without it.
`)
}

function listContents() {
  log('\n📦 Available content:\n', 'blue')

  const agentsDir = join(PACKAGE_ROOT, 'agents')
  const skillsDir = join(PACKAGE_ROOT, 'skills')
  const promptsDir = join(PACKAGE_ROOT, 'prompts')
  const instructionsDir = join(PACKAGE_ROOT, 'instructions')

  log('Agents:', 'green')
  if (existsSync(agentsDir)) {
    const agents = readdirSync(agentsDir).filter(f => f.endsWith('.md'))
    agents.length > 0
      ? agents.forEach(f => log(`  • ${f}`, 'dim'))
      : log('  (empty)', 'dim')
  }

  log('\nSkills:', 'green')
  if (existsSync(skillsDir)) {
    const skills = readdirSync(skillsDir).filter(d => statSync(join(skillsDir, d)).isDirectory())
    skills.length > 0
      ? skills.forEach(d => log(`  • ${d}/SKILL.md`, 'dim'))
      : log('  (empty)', 'dim')
  }

  log('\nPrompts:', 'green')
  if (existsSync(promptsDir)) {
    const prompts = readdirSync(promptsDir).filter(f => f.endsWith('.md'))
    prompts.length > 0
      ? prompts.forEach(f => log(`  • ${f}`, 'dim'))
      : log('  (empty)', 'dim')
  }

  log('\nInstructions:', 'green')
  if (existsSync(instructionsDir)) {
    const instructions = readdirSync(instructionsDir).filter(f => f.endsWith('.md'))
    instructions.length > 0
      ? instructions.forEach(f => log(`  • ${f}`, 'dim'))
      : log('  (empty)', 'dim')
  }

  console.log()
}

function copyDirRecursive(src, dest, options = {}) {
  const { onConflict = 'skip' } = options
  const copied = []
  const skipped = []

  if (!existsSync(src)) {
    return { copied, skipped }
  }

  mkdirSync(dest, { recursive: true })

  const entries = readdirSync(src)

  for (const entry of entries) {
    const srcPath = join(src, entry)
    const destPath = join(dest, entry)
    const stat = statSync(srcPath)

    if (stat.isDirectory()) {
      const result = copyDirRecursive(srcPath, destPath, options)
      copied.push(...result.copied)
      skipped.push(...result.skipped)
    } else {
      if (existsSync(destPath)) {
        if (onConflict === 'skip') {
          skipped.push(destPath)
          continue
        }
        // For 'merge' - append content for .md files
        if (onConflict === 'merge' && entry.endsWith('.md')) {
          const existing = readFileSync(destPath, 'utf-8')
          const incoming = readFileSync(srcPath, 'utf-8')
          if (!existing.includes(incoming)) {
            writeFileSync(destPath, existing + '\n\n' + incoming)
            copied.push(destPath)
          } else {
            skipped.push(destPath)
          }
          continue
        }
      }
      copyFileSync(srcPath, destPath)
      copied.push(destPath)
    }
  }

  return { copied, skipped }
}

function install(options) {
  const githubDir = join(options.dest, '.github')
  const contentDirs = [
    { name: 'agents', flag: options.agents },
    { name: 'skills', flag: options.skills },
    { name: 'prompts', flag: options.prompts },
    { name: 'instructions', flag: options.instructions },
  ]

  let totalCopied = []
  let totalSkipped = []

  log('\n🚀 Installing agent-kit...\n', 'blue')

  // Ensure .github exists
  mkdirSync(githubDir, { recursive: true })

  for (const { name, flag } of contentDirs) {
    if (options.all || flag) {
      const src = join(PACKAGE_ROOT, name)
      const dest = join(githubDir, name)

      if (existsSync(src)) {
        // Skip if only contains .gitkeep
        const entries = readdirSync(src).filter(f => f !== '.gitkeep')
        if (entries.length === 0) continue

        log(`Installing ${name}...`, 'yellow')
        const { copied, skipped } = copyDirRecursive(src, dest)
        totalCopied.push(...copied)
        totalSkipped.push(...skipped)
      }
    }
  }

  // Copy copilot-instructions.md if it doesn't exist
  if (options.all) {
    const instructionsSrc = join(PACKAGE_ROOT, '.github', 'copilot-instructions.md')
    const instructionsDest = join(githubDir, 'copilot-instructions.md')

    if (existsSync(instructionsSrc)) {
      if (!existsSync(instructionsDest)) {
        copyFileSync(instructionsSrc, instructionsDest)
        totalCopied.push(instructionsDest)
        log('Installing copilot-instructions.md...', 'yellow')
      } else {
        totalSkipped.push(instructionsDest)
      }
    }
  }

  // Summary
  console.log()
  if (totalCopied.length > 0) {
    log(`✅ Installed ${totalCopied.length} file(s):`, 'green')
    totalCopied.forEach(f => log(`   ${relative(options.dest, f)}`, 'dim'))
  }

  if (totalSkipped.length > 0) {
    log(`⏭️  Skipped ${totalSkipped.length} existing file(s)`, 'yellow')
  }

  log('\n✨ Done! Your agent-kit is ready.\n', 'green')
}

// Main
const args = process.argv.slice(2)
const options = parseArgs(args)

if (options.help) {
  showHelp()
  process.exit(0)
}

if (options.list) {
  listContents()
  process.exit(0)
}

// Auto mode (postinstall) - only install if not already present
if (options.auto) {
  const githubDir = join(options.dest, '.github')
  const agentsExist = existsSync(join(githubDir, 'agents'))
  const skillsExist = existsSync(join(githubDir, 'skills'))

  if (!agentsExist && !skillsExist) {
    install(options)
  } else {
    log('agent-kit: Content already exists, skipping auto-install.', 'dim')
    log('Run "npx agent-kit --help" to see manual installation options.\n', 'dim')
  }
} else {
  install(options)
}
