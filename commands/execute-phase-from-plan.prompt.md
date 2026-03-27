---
name: execute-phase-from-plan
description: Execute an approved implementation phase from the current plan.md.
argument-hint: "phase=<phase or task group> spec=<relative spec path>"
agent: agent
---

Continue the implementation by executing `${input:phase:Phase number, name, or task group}` from the current `plan.md`.

Before coding:
- Read `plan.md` first and treat it as the primary task list.
- Identify the tasks, dependencies, and verification steps for this phase.
- Reconcile the plan with the current repository state.
- Use `${input:spec:Relative path to the spec file}` only as a secondary reference for validation or missing detail.
- Ask a clarifying question only if a blocking ambiguity remains after reading the plan and the code.

Then implement the phase end to end:
- follow the plan task by task
- keep the scope limited to this phase unless a tightly coupled fix is required
- use the usual TDD or subagent workflow where appropriate
- update plan or task status as you complete work
- verify the finished work with the relevant tests and with a final check against `${input:spec:Relative path to the spec file}`

At the end, report:
- what was completed from the plan
- the verification results
- any remaining follow-up that should move to the next phase
