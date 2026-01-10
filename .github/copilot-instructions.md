# Agent Kit - Copilot Instructions

This repository contains reusable AI agent definitions, skills, prompts, and instructions. When editing content in this repo, follow these conventions.

## Repository Structure

```
agents/          # Agent persona definitions (*.agent.md)
skills/          # Reusable skill modules (<skill>/SKILL.md)
prompts/         # Prompt templates (*.md)
instructions/    # Custom instruction files (*.md)
```

## File Conventions

### Agents (`agents/`)
- Naming: `<name>.agent.md`
- YAML frontmatter required: `name`, `description`, `model`, `tools`
- Optional: `handoffs` for agent-to-agent delegation
- Body sections: Overview, Guidelines, Expected Outputs

Example frontmatter:
```yaml
---
name: Code Reviewer Agent
description: Performs code reviews with actionable feedback
model: Claude Opus 4.5 (copilot)
tools: ['read/problems', 'read/readFile', 'search', 'edit/editFiles']
handoffs:
  - label: Start Implementation
    agent: agent
    prompt: Implement the plan
---
```

### Skills (`skills/`)
- Always named `SKILL.md` inside a descriptive folder (e.g., `skills/code-refactoring/SKILL.md`)
- YAML frontmatter: `name`, `description`
- Structure: Problem patterns → Anti-pattern examples → Refactored solutions

### Prompts (`prompts/`)
- Reusable prompt templates for common tasks
- Use clear, descriptive filenames

### Instructions (`instructions/`)
- Project-specific or context-specific instruction files
- Can be referenced by agents or used standalone

## Writing Guidelines

### For Agents
- Keep guidelines actionable and specific
- Include "What To Look For" checklists
- Define clear expected outputs (report format, handoff criteria)
- Reference skills using relative paths: `../skills/code-refactoring/SKILL.md`

### For Skills
- Pair every anti-pattern with a refactored solution
- Explain *why* the pattern is problematic, not just *what* to change
- Use fenced code blocks with language hints (`typescript`, `tsx`)
- Keep examples self-contained and runnable

### General
- Preserve YAML frontmatter structure exactly
- Use consistent heading hierarchy (H1 for title, H2 for sections)
- Avoid hardcoding project-specific paths—use placeholders or notes for customization
- When referencing external tools/libraries, note version constraints if relevant

## Quality Checklist

Before committing changes:
- [ ] YAML frontmatter parses correctly
- [ ] All relative path references are valid
- [ ] Code examples have proper syntax highlighting
- [ ] Anti-pattern/solution pairs are complete
- [ ] No orphaned sections or incomplete examples
