---
name: subagent-dispatch
description: >
  Protocol for dispatching subagents effectively. Use this skill EVERY TIME you are
  about to delegate work to a custom or built-in agent. Covers when to dispatch,
  which agent to pick, how to write self-contained prompts, and parallel execution.
  Trigger phrases: "delegate to agent", "dispatch subagent", "run agent", "use subagent",
  "context isolation", "parallel agents".
---

# Subagent Dispatch Protocol

This skill governs **when and how** to dispatch subagents in this project. Its purpose
is to help the main agent make effective delegation decisions and write high-quality,
self-contained prompts for each specialist.

---

## When to Dispatch (vs Do It Yourself)

Dispatch a subagent when **any** of these apply:

| Signal | Why dispatch? |
|--------|---------------|
| **Context isolation needed** | Command output, logs, or search results are verbose and would pollute the main conversation |
| **Specialist expertise** | The task maps cleanly to an existing agent's domain (see registry below) |
| **Parallelizable work** | Two or more independent tasks can run concurrently in separate agents |
| **Review/validation gate** | A second opinion or compliance check is needed before accepting work |

**Do it yourself** when the task is trivial, already in-context, or requires tight
back-and-forth with the user that a stateless subagent cannot provide.

---

## Agent Registry

Custom agents live at `agents/<agent-name>.agent.md`.

| Agent | Role | Key trait | Invocable |
|-------|------|-----------|-----------|
| **Bash Search Worker** | Shell-based repository search and filtering | Context isolation; read-only `execute` only | Subagent only |
| **Code Simplifier** | Simplify and refine code for clarity | Preserves functionality; applies project standards | User + subagent |
| **Compliance Reviewer** | Compare implementation against plan/spec | Deviation analysis; requirement verification | Subagent only |
| **Codebase Analyzer** | Analyze implementation details of existing code | Precise file:line references; no speculation | Subagent only |
| **Generalist** | General-purpose coding, research, debugging | Broad skill set; retrieval-led reasoning | User + subagent |
| **Green** (TDD) | Write minimal code to pass a failing test | Never modifies tests; minimal production code | Subagent only |
| **Orchestrator** | Delegate and coordinate multi-agent workflows | Never implements; dispatches and consolidates | User only |
| **Quality Reviewer** | In-depth code review and analysis | Security, patterns, maintainability | Subagent only |
| **Red** (TDD) | Write one failing test for one behaviour | Never touches production code | Subagent only |
| **Reviewer Group** | Orchestrate multi-perspective code review | Spawns multiple Quality Reviewers | User only |
| **UI Composer** | Build visually polished, performant UI components | Styling, animation, layout expertise | User + subagent |

> If an agent is not listed (newly added), read its `.agent.md` file and extract the
> `description` and `model` fields from the YAML frontmatter.

---

## Model Fallback Reference

**Always** use the model specified in the frontmatter. Use this table **only**
when the agent's preferred model is temporarily unavailable:

| Preferred model | Fallback |
|-----------------|----------|
| Gemini 3.1 Pro (Preview) | Claude Opus 4.6 |
| Gemini 3 Pro (Preview) | Claude Opus 4.6 |
| Claude Opus 4.6 | GPT-5.4 |
| Claude Sonnet 4.6 | GPT-5.4 |
| GPT-5.4 mini | Claude Haiku 4.5 |

> For built-in agent types (`explore`, `code-review`, etc.) that have no `.agent.md`,
> skip model resolution — use platform defaults.

---

## Core Dispatch Principles

1. **One agent per problem domain.** Each dispatch targets exactly one specialist.
2. **Subagents are stateless.** They have zero memory of the current conversation.
   The prompt must be entirely self-contained.
3. **Parallel when independent.** Dispatch agents concurrently when their tasks have
   no data dependency (e.g., Quality Reviewer + Compliance Reviewer on the same diff).
4. **Review before accepting.** Evaluate subagent output critically. Request revisions
   or re-dispatch when quality or relevance falls short.

---

## Parallel Dispatch

When two or more tasks are independent, dispatch them in the same turn:

- **Do**: Quality Reviewer + Compliance Reviewer on the same changeset.
- **Do**: Bash Search Worker for file discovery *while* Generalist researches docs.
- **Don't**: Green (TDD) before Red (TDD) — Green depends on Red's failing test.

> Rule of thumb: if task B does not need task A's output, they can run in parallel.

---

## Prompting Checklist

Every subagent prompt must answer **all four** of these:

- **Context**: What is the project? What stack, conventions, and files are relevant?
- **Task**: What exactly needs to be done? What are the constraints?
- **Direction**: Where should the agent look first? Which references or docs to consult?
- **Success criteria**: What does "done" look like? What is the expected output format?

Thin prompts produce thin results. If a subagent fails or produces something off-target,
the root cause is almost always an underspecified prompt — not the agent's capability.
