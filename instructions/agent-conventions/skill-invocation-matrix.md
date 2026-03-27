# Skill Invocation Matrix

Use this matrix as the shared reference for required skill invocation rules across the project instructions and custom agents.

The current source sections are:

- `instructions/AGENTS.md`
- `agents/generalist.agent.md`
- `agents/ui-composer.agent.md`

The table below recaps the union of those matrices. When a file only needs a subset, keep the shared rules here as the source of truth and restate only the agent-specific exceptions near the local usage note.

## Shared Matrix

**You MUST invoke these skills before proceeding with the task:**

| Task Type | Required Skill(s) | Trigger Phrases | Notes |
| --- | --- | --- | --- |
| Any RN component work | `react-native-best-practices` | Always (foundation skill) | Read the relevant reference with the task. |
| Building UI components | `react-native-best-practices` + `building-native-ui` | "create component", "UI", "screen", "native elements" | Consult the relevant references for building the UI. |
| Fixing bugs/errors | `code-debugging` | "fix", "error", "crash", "not working", "debug" | |
| Improving existing code | `code-refactoring` | "refactor", "clean up", "improve", "optimize structure" | |
| React patterns/hooks | `vercel-react-best-practices` | "hooks", "context", "React patterns" | |
| Adding documentation | `art-of-comment` | "document", "add comments", final step of any task | |
| EAS build configuration | `expo-deployment` | "EAS build", "expo build", "configure build", "testflight" | Present in `instructions/AGENTS.md` and `agents/generalist.agent.md`. |
| Dispatching custom agents | `subagent-dispatch` | "dispatch", "launch agent", "use ui-composer/generalist/compliance-reviewer/code-reviewer", "subagents" | Always invoke before `task` tool calls that target custom agents. Present in `instructions/AGENTS.md`. |

## Notes on Scope

- `instructions/AGENTS.md` contains the most complete version of the matrix.
- `agents/generalist.agent.md` mirrors the core rows and includes the EAS build row, but omits the extra notes column details used in `instructions/AGENTS.md`.
- `agents/ui-composer.agent.md` uses the core React Native and UI rows, but does not currently include the EAS build or custom-agent dispatch rows.

<!--
Suggested wiring for follow-up edits:

1. Replace duplicated matrix tables in `instructions/AGENTS.md`, `agents/generalist.agent.md`, and `agents/ui-composer.agent.md` with a short local heading plus a link to this file:

   See [Skill Invocation Matrix](../docs/agent-conventions/skill-invocation-matrix.md).

2. If an agent needs extra rows or stricter local rules, keep the shared link first, then add a short "Agent-specific additions" subsection directly below it.

3. Keep this file as the source of truth for shared rows so future updates happen in one place.
-->
