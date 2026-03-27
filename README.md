# Agent Kit

Agent Kit is now a shared GitHub Copilot plugin repository. It packages custom agents, agent skills, and shared guidance for both GitHub Copilot CLI and GitHub Copilot in VS Code.

Most of the content still reflects the author's React Native and Expo workflow, but the packaging model is now plugin-first instead of copying files into a workspace `.github/` folder.

## Supported Targets

- GitHub Copilot CLI
- Visual Studio Code with GitHub Copilot and Copilot Chat

## Repository Layout

```text
.
├── plugin.json                  # Shared plugin manifest
├── agents/                      # Custom agents
├── commands/                    # Canonical reusable slash-command content
├── skills/                      # Agent Skills-compatible skill folders
├── .github/prompts -> ../commands
│                               # VS Code workspace prompt discovery bridge
├── copilot-instructions.md      # Canonical shared guidance for plugin content
├── docs/                        # Supporting reference docs used by agents/skills
└── instructions/                # Kept in repo, outside the plugin MVP
```

The current plugin MVP covers `agents/`, `commands/`, `skills/`, `copilot-instructions.md`, and supporting docs they reference. The `instructions/` folder remains in the repo, but it is not yet packaged as a plugin-specific feature.

For prompt-style workflows, `commands/` is the canonical source of truth. The repository exposes the same files to VS Code through `.github/prompts`, so local workspace prompt discovery and plugin command packaging stay aligned.

## Built-in PostToolUse ESLint Hook

The plugin also ships with a `PostToolUse` hook for coding agents. After successful file-modifying tool calls, it tries to lint only the currently touched JS/TS files instead of encouraging a repo-wide ESLint run.

Behavior:

- only reacts to file-modifying tool calls
- filters to lintable touched files
- runs repo-local ESLint directly on those files
- caches successful results for the current changed file set
- tells the agent when ESLint already passed, so it does not need to rerun repo-wide lint

If ESLint is unavailable in the target repository, the hook skips cleanly.

## Install the Shared Plugin

### GitHub Copilot CLI

Install from a local checkout while developing:

```bash
copilot plugin install ./
```

Install from GitHub:

```bash
copilot plugin install rakaadi/agent-kit
```

After installation, verify the plugin is present:

```bash
copilot plugin list
```

### VS Code

VS Code agent plugins are currently preview-gated. Enable the `chat.plugins.enabled` setting first.

Then install the plugin from source:

- Run `Chat: Install Plugin From Source`
- Enter the repository URL, for example `https://github.com/rakaadi/agent-kit`

For local development, you can also register a local checkout with `chat.pluginLocations`.

Once installed and enabled, the plugin's agents and skills should appear in the Chat customizations surfaces.

For local workspace development, VS Code can also discover the same reusable prompts through `.github/prompts`, which points at the plugin's canonical `commands/` directory.

## Install Standalone Skills with `skills.sh`

The legacy `agent-kit` installer is deprecated. If you want skills without the full shared plugin flow, use the Skills CLI from Vercel instead:

```bash
npx skills add <owner/repo>
npx skills add <owner/repo@skill-name>
```

Browse the ecosystem at `https://skills.sh`.

## Recommended Global Companion Skills

On this machine, the plugin is paired with a set of globally installed skills managed by the Skills CLI:

```bash
npx skills list -g
```

Recommended companion skills:

- Workflow and planning: `brainstorming`, `writing-plans`, `verification-before-completion`, `writing-clearly-and-concisely`
- Code quality and implementation: `code-debugging`, `code-refactoring`, `javascript-testing-patterns`, `tdd`, `git-commit`, `typescript-advanced-types`
- React Native and Expo: `react-native-best-practices`, `building-native-ui`, `expo-deployment`, `upgrading-expo`, `vercel-react-best-practices`
- Discovery and tooling: `find-skills`, `mcp-builder`, `prd`, `agent-device`
- Also installed globally on this machine: `art-of-comment`

These skills work well alongside the plugin because they cover planning, testing, verification, React Native guidance, deployment, and tooling workflows that are useful across projects, not just inside this repository.

## Legacy CLI Status

`npx agent-kit` no longer copies files into `.github/`. It now prints migration guidance and points users to:

- `copilot plugin install <path-or-repo>` for the shared plugin flow
- `npx skills add ...` for standalone skill installation

This compatibility wrapper is temporary and will be removed after the migration window.

## Manual Verification Checklist

Use this checklist before calling a release ready:

```bash
# Copilot CLI
copilot plugin install ./
copilot plugin list
```

In VS Code:

- Enable `chat.plugins.enabled`
- Run `Chat: Install Plugin From Source`
- Confirm the plugin appears in the Agent Plugins view
- Confirm the shared agents and skills appear in chat customization UI
- Confirm the PostToolUse hook runs after file edits and reports touched-file ESLint status
