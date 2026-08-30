# Agent Kit

Agent Kit packages reusable skills for coding agents. Its root manifest and portable components follow the [Agent Plugins standard](https://github.com/agentplugins/agent-plugins-spec).

## Repository Layout

```text
.
├── plugin.json    # Agent Plugins manifest
├── skills/        # Portable Agent Skills
├── agents/        # Client-specific custom agents
├── instructions/  # Reusable repository-instruction templates
└── deprecated/    # Retired skills and custom agents kept for reference
```

Agent Plugins clients discover each immediate `skills/` child that contains a `SKILL.md`. The `agents/` and `instructions/` directories are authoring resources rather than portable Agent Plugins components.

## Why This Plugin Exists

I built this plugin to customize my own coding agents, to better suit my everyday development workflow.

I prefer to delegate a review task to a subagents, hence I create a custom agents for it, rather than using a general purpose custom agents.

As for the skills, the idea for some of them come from my own experience when I need to type the same instructions for the same task multiple times. Thus, I turned them into skills for consistency and the sake of convenient.
