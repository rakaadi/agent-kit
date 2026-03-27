#!/usr/bin/env node

const args = process.argv.slice(2)
const informational = new Set(['--help', '-h', 'help', '--list', '-l', 'list'])
const isInformational = args.length > 0 && args.every(arg => informational.has(arg))

const lines = [
  'agent-kit is deprecated.',
  '',
  'This repository now ships as a shared GitHub Copilot plugin instead of a .github copier.',
  '',
  'Use one of these migration paths:',
  '  • Shared plugin: copilot plugin install <path-or-repo>',
  '    Examples:',
  '      copilot plugin install ./',
  '      copilot plugin install rakaadi/agent-kit',
  '',
  '  • Standalone skills: use the Skills CLI from Vercel',
  '      npx skills add <owner/repo>',
  '      npx skills add <owner/repo@skill-name>',
  '      More info: https://skills.sh',
  '',
  'The legacy agent-kit CLI no longer copies content into .github/.'
]

process.stdout.write(`${lines.join('\n')}\n`)
process.exit(isInformational ? 0 : 1)
