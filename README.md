# What Is In This Repository?
This repository is the custom agent, agent skills, prompt, and custom instructions that I personally use for my development work. Most of it was made by me, and the rest of it I took from various sources - I will cite the source on the commit message.

Most of it is specifically tailored for the project I'm working on at the office, utilizing React Native with an Expo-managed workflow. Therefore, you will find references such as the project name, folder structures, dependencies used, and project conventions.

Still, it can be easily adjusted for a bare React Native workflow, or even React for web development.

# Supported Editors
- Visual Studio Code with GitHub Copilot and Copilot Chat extensions

# Installation

Install directly from GitHub using your preferred package manager. **Use the optional flag** (`-O` / `--optional`) since agent-kit is for development use:

```bash
# npm
npm install github:rakaadi/agent-kit -O

# pnpm
pnpm add github:rakaadi/agent-kit -O

# bun
bun add github:rakaadi/agent-kit --optional
```

This will automatically copy agents and skills to your `.github/` folder (if they don't already exist).

## Manual Installation

For more control, use the CLI directly:

```bash
# Install everything
npx agent-kit

# Install specific content types
npx agent-kit --agents            # Install only agents
npx agent-kit --skills             # Install only skills
npx agent-kit --prompts            # Install only prompts
npx agent-kit --instructions       # Install only instructions
npx agent-kit --agents --skills    # Combine multiple flags

# List available content
npx agent-kit --list

# Install to a specific directory
npx agent-kit --dest ./path/to/project
```

## What Gets Installed

```
your-project/
└── .github/
    ├── agents/           # Agent persona definitions
    │   ├── code-reviewer.agent.md
    │   └── code-simplifier.agent.md
    ├── skills/           # Reusable skill modules
    │   ├── art-of-comment/
    │   ├── code-debugging/
    │   └── code-refactoring/
    ├── prompts/          # Prompt templates
    ├── instructions/     # Custom instruction files
    └── copilot-instructions.md
```

## Usage with VS Code & GitHub Copilot

Once installed, the agents and skills are automatically available to GitHub Copilot in VS Code:

- **Agents**: Use with Copilot Chat by referencing them in your prompts
- **Skills**: Referenced by agents for specialized guidance
- **.instructions.md**: Provides project-wide context to Copilot

## Updating

Re-run the install command to get the latest version. Existing files are preserved (not overwritten) to protect your customizations.