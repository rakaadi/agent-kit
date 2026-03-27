---
name: subagent-dispatch
description: >
  Mandatory protocol for dispatching any custom agent in this project via the task tool.
  Use this skill EVERY TIME you are about to call the task tool with a custom agent_type
  (ui-composer, generalist, compliance-reviewer, code-reviewer, or any agent defined in
  .github/agents/). This skill ensures the agent's intended model (declared in its YAML
  frontmatter) is respected rather than overridden by a default. Also encodes prompting
  best practices for subagent context and quality. ALWAYS invoke before any task tool call
  that targets a custom agent — even if the agent name seems obvious.
---

# Subagent Dispatch Protocol

This skill governs how to correctly dispatch custom agents in this project. Its primary
purpose is to ensure each agent runs with its **intended model** — declared in the agent's
own YAML frontmatter — rather than a platform default.

## Why This Matters

Each agent in `.github/agents/` declares a `model` in its YAML frontmatter. That choice
is deliberate: different agents are optimized for different models based on their role
(e.g., the UI Composer on Gemini for creative work, the Compliance Reviewer on GPT-5.4
for analytical rigor). Calling the `task` tool without passing `model` ignores that
intent entirely.

---

## Model Resolution Protocol

Follow these steps **before every custom agent dispatch**:

### Step 1 — Identify the agent file

Custom agents live at `.github/agents/<agent-name>.agent.md`.
The `agent_type` value maps directly to the filename (e.g., `ui-composer` → `ui-composer.agent.md`).

### Step 2 — Look up the model

Use the **Agent Registry** below for the four known agents. If the agent isn't listed
(a new one was added), read its `.agent.md` file and extract the `model` field from the
YAML frontmatter at the top.

### Step 3 — Map to the task tool's model ID

| Agent frontmatter `model` value             | `task` tool `model` parameter |
|---------------------------------------------|-------------------------------|
| `Gemini 3.1 Pro (Preview) (copilot)`        | `gemini-3.1-pro-preview`      |
| `Gemini 3 Pro (Preview) (copilot)`          | `gemini-3-pro-preview`        |
| `Gemini 3 Flash (Preview) (copilot)`        | `gemini-3-flash-preview`      |
| `Claude Opus 4.6 (copilot)`                 | `claude-opus-4.6`             |
| `Claude Sonnet 4.6 (copilot)`               | `claude-sonnet-4.6`           |
| `Claude Haiku 4.5 (copilot)`                | `claude-haiku-4.5`            |
| `GPT-5.4 (copilot)`                         | `gpt-5.4`                     |
| `GPT-5.4 mini`                              | `gpt-5.4-mini`                |
| `GPT-5.3-Codex (copilot)`                   | `gpt-5.3-codex`               |

> **Pattern**: strip ` (copilot)`, lowercase, replace spaces with hyphens.

### Step 4 — Pass `model` to the task tool

Always include the resolved model ID as the `model` parameter:

```
task({
  agent_type: "ui-composer",
  model: "gemini-3.1-pro-preview",   // resolved from frontmatter
  description: "Build patient card component",
  prompt: "..."
})
```

---

## Agent Registry

Quick-reference for all current project agents. **Prefer this table over re-reading files.**
Update it whenever a new agent is added to `.github/agents/`.

| `agent_type`           | Agent file                                    | `model` parameter      |
|------------------------|-----------------------------------------------|------------------------|
| `ui-composer`          | `.github/agents/ui-composer.agent.md`         | `gemini-3.1-pro-preview`|
| `generalist`           | `.github/agents/generalist.agent.md`          | `gpt-5.3-codex`    |
| `compliance-reviewer`  | `.github/agents/compliance-reviewer.agent.md` | `gpt-5.4`              |
| `code-reviewer`        | `.github/agents/code-reviewer.agent.md`       | `claude-opus-4.6`      |

> Built-in agent types (`explore`, `task`, `general-purpose`, `code-review`) have no
> `.agent.md` file. Skip model resolution for these — use platform defaults or override
> manually based on task complexity.

---

## Core Dispatch Principles

1. **One agent per problem domain.** Dispatch independent agents concurrently — don't
   serialize work that can run in parallel.
2. **Subagents are stateless.** They have zero memory of the current conversation.
   The prompt must be entirely self-contained with all the context needed.
3. **Review before accepting.** Evaluate subagent output critically and request revisions
   when quality or relevance falls short.

## Prompting Checklist

A subagent prompt should answer all of these before you send it:

- **Context**: What is the project? What stack/conventions are relevant? Which files matter?
- **Task**: What exactly needs to be done? What are the constraints and requirements?
- **Direction**: Where should the agent look first? What references or docs should it consult?
- **Success criteria**: What does "done" look like? What's the expected output format?

Thin prompts produce thin results. If a subagent fails or produces something off-target,
the root cause is almost always an underspecified prompt — not the agent's capability.
