# Agent Kit

Agent Kit is now a shared GitHub Copilot plugin repository. It packages custom agents, agent skills, and shared guidance for both GitHub Copilot CLI and GitHub Copilot in VS Code.

## Supported Targets

- GitHub Copilot CLI
- Visual Studio Code with GitHub Copilot and Copilot Chat

## Repository Layout

```text
.
├── plugin.json                  # Shared plugin manifest
├── .claude-plugin/plugin.json   # VS Code / Claude-compatible manifest mirror
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

`plugin.json` at the repository root remains the canonical Copilot CLI manifest. The `.claude-plugin/plugin.json` file mirrors the same metadata for VS Code's preview agent-plugin loader and other Claude-compatible scanners.

For prompt-style workflows, `commands/` is the canonical source of truth. The repository exposes the same files to VS Code through `.github/prompts`, so local workspace prompt discovery and plugin command packaging stay aligned.

## Built-in Hooks

The plugin ships with small `PreToolUse` and `PostToolUse` helpers under `scripts/`.

See [`scripts/README.md`](scripts/README.md) for the hook overview, the current hook list, and the behavior of the ESLint and Python command checks.

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

If VS Code reports that no plugins were found in the repository, make sure you are testing a revision that includes the `.claude-plugin/plugin.json` compatibility mirror. Copilot CLI accepts a root-level `plugin.json`, but VS Code's preview loader is more reliable when the Claude-compatible manifest location is present too.

For local workspace development, VS Code can also discover the same reusable prompts through `.github/prompts`, which points at the plugin's canonical `commands/` directory.

## Install Standalone Skills with `skills.sh`

The legacy `agent-kit` installer is deprecated. If you want skills without the full shared plugin flow, use the Skills CLI from Vercel instead:

```bash
npx skills add <owner/repo>
npx skills add <owner/repo@skill-name>
```

Browse the ecosystem at `https://skills.sh`.

## Recommended Companion Skills

| Skills | GitHub repository source |
| --- | --- |
| `agent-device` | [`callstackincubator/agent-device`](https://github.com/callstackincubator/agent-device) |
| `art-of-comment` | [`rakaadi/agent-kit`](https://github.com/rakaadi/agent-kit) |
| `building-native-ui` | [`expo/skills`](https://github.com/expo/skills) |
| `code-debugging` | [`rakaadi/agent-kit`](https://github.com/rakaadi/agent-kit) |
| `code-refactoring` | [`rakaadi/agent-kit`](https://github.com/rakaadi/agent-kit) |
| `expo-deployment` | [`expo/skills`](https://github.com/expo/skills) |
| `find-skills` | [`vercel-labs/skills`](https://github.com/vercel-labs/skills) |
| `git-commit` | [`github/awesome-copilot`](https://github.com/github/awesome-copilot) |
| `javascript-testing-patterns` | [`wshobson/agents`](https://github.com/wshobson/agents) |
| `mcp-builder` | [`anthropics/skills`](https://github.com/anthropics/skills) |
| `prd` | [`github/awesome-copilot`](https://github.com/github/awesome-copilot) |
| `react-native-best-practices` | [`callstackincubator/agent-skills`](https://github.com/callstackincubator/agent-skills) |
| `tdd` | [`mattpocock/skills`](https://github.com/mattpocock/skills) |
| `typescript-advanced-types` | [`wshobson/agents`](https://github.com/wshobson/agents) |
| `upgrading-expo` | [`expo/skills`](https://github.com/expo/skills) |
| `verification-before-completion` | [`obra/superpowers`](https://github.com/obra/superpowers) |
| `vercel-react-best-practices` | [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) |
| `writing-clearly-and-concisely` | [`softaworks/agent-toolkit`](https://github.com/softaworks/agent-toolkit) |
| `writing-plans` | [`obra/superpowers`](https://github.com/obra/superpowers) |

## Manual Verification Checklist

Use this checklist before calling a release ready:

```bash
# Copilot CLI
copilot plugin install ./
copilot plugin list

# Manifest parity
diff -u plugin.json .claude-plugin/plugin.json
```

In VS Code:

- Enable `chat.plugins.enabled`
- Run `Chat: Install Plugin From Source`
- Confirm the plugin appears in the Agent Plugins view
- Confirm the shared agents and skills appear in chat customization UI
- Confirm the PostToolUse hook runs after file edits and reports touched-file ESLint status
