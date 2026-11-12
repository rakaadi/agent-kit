---
name: subagent-dispatch
description: Delegate bounded work to subagents. Use when dispatching a subagent or when the user requests parallel agents, context isolation, specialist work, or an independent review.
---

# Subagent Dispatch

The main agent owns the task split and the final result. Treat each dispatch as a contract for a bounded outcome, with enough context and authority to act independently.

## Decide

Delegate a concrete, separable outcome when it saves time or improves quality through:

- Running independent work concurrently.
- Isolating verbose exploration, logs, or research from the main context.
- Applying an available agent's specialist capability.
- Obtaining an independent review or validation pass.

Weigh the benefit against the context transfer and integration effort. Keep work local when doing it directly is more effective.

## Select

Choose an available agent whose capabilities fit the outcome, respecting the user's requested model or role. Use a general-purpose agent when specialization adds little.

## Write the Contract

Define the delegated scope and the output you need before dispatch. Give the agent the relevant facts, instructions, and artifacts it will not inherit, distinguishing known facts from assumptions. For edits, identify the files or artifacts it owns and require it to preserve others' changes in a shared workspace.

Use this outcome-first format, keeping each field proportional to the task:

```text
Objective: <concrete outcome the agent owns>
Scope: <relevant files or systems; ownership and boundaries>
Context: <governing instructions, facts, artifacts, and starting points>
Authority: <permitted actions and decisions; when to ask for help>
Done when: <observable completion criteria and relevant verification>
Return: <findings, evidence, changed files, or blockers needed for integration>
```

Describe the result and its constraints; leave the method to the agent unless correctness requires a particular sequence. The contract is ready when the agent can determine what it owns, how to act, and what to return from the context it receives.

## Supervise and Integrate

Continue useful independent work while agents run. Redirect work that drifts from the contract and resolve blockers within the authorized scope; surface the exact missing input or authority when needed.

Review returned work against the contract. Inspect material diffs or cited evidence and use verification proportionate to the result's risk and existing evidence. Account for every dispatch before finishing: integrate the result, reject it with a reason, or report an unresolved blocker. End any remaining work that no longer serves the task.
