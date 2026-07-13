---
name: subagent-dispatch
description: Dispatch subagents for bounded independent work. Use whenever Codex is about to delegate or spawn a subagent, or when the user asks for parallel agents, context isolation, specialist work, or an independent review. Decide whether delegation helps, select an available agent, write an outcome-first contract, schedule work safely, and integrate every result.
---

# Subagent Dispatch

Treat each dispatch as a contract: give one agent one bounded outcome, enough context
to act independently, explicit authority, and a checkable definition of done.

## Decide

Delegate when the subtask is concrete and separable, and delegation provides at least
one clear benefit:

- Run independent work concurrently.
- Isolate verbose exploration, logs, or research from the main context.
- Apply specialist capability exposed by an available agent.
- Obtain an independent review or validation pass.

Keep the work in the main agent when it is small, already in context, coupled to a
pending decision, dependent on frequent user interaction, or likely to overlap the
same files or state. Delegation is complete only when its coordination cost is lower
than doing the work directly.

## Select

Select from the agents and tools actually available in the current session. Match the
narrowest capable agent to the outcome by reading its current description and
constraints. Use a general-purpose agent when no specialist materially improves the
result.

Give each writing agent exclusive ownership of its files or artifacts. Multiple
read-only agents may inspect the same material. Sequence any work that shares mutable
state or requires another agent's output.

## Write the Contract

Use an outcome-first prompt. Include:

- **Objective**: one concrete result the agent owns.
- **Scope**: relevant files, systems, and explicit boundaries.
- **Context**: repository root, governing instructions, known facts, and where to
  start. Include raw artifacts when exact evidence matters. Use verified task facts;
  surface materially missing context instead of inferring it from unrelated paths.
- **Authority**: allowed reads, edits, commands, side effects, and decisions that
  require escalation.
- **Success criteria**: observable conditions that prove the objective is complete,
  including required verification.
- **Return**: the concise findings, evidence, changed files, or blocker the main agent
  needs to integrate the result.

Describe the destination rather than prescribing every step. Specify a sequence only
when correctness depends on it. Dispatch only when an agent unfamiliar with the main
conversation can determine what to do, what it owns, and how to prove completion.

Use this compact shape:

```text
Objective: <one bounded outcome>
Scope: <owned files or systems; boundaries>
Context: <repo, instructions, facts, starting points>
Authority: <allowed actions and escalation boundary>
Done when: <checkable result and verification>
Return: <evidence and output needed by the main agent>
```

## Schedule

Run tasks concurrently only when each can finish without another's output and their
writes cannot overlap. Otherwise, dispatch in dependency order and pass the verified
result forward. Prefer the smallest useful set of agents; every additional branch
adds coordination and review work.

## Supervise and Integrate

Continue useful independent work while agents run. When an agent drifts, send a
targeted correction that restates the unmet contract. When it reports a blocker,
resolve safe in-scope dependencies or surface the exact missing input or authority.

Treat agent output as evidence, not as an accepted conclusion. Review it against the
contract, inspect material diffs or cited artifacts, and run the narrowest meaningful
verification before relying on it. Finish only after every dispatched agent is
stopped and every result is integrated, rejected with a reason, or reported as an
unresolved blocker.
