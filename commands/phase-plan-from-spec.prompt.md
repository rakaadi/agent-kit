---
name: phase-plan-from-spec
description: Draft a plan for one implementation phase from a spec section.
argument-hint: "phase=<phase> spec=<relative spec path> section=<spec section>"
agent: plan
---

Draft a plan only for the next implementation phase.

Inputs:
- Target phase: `${input:phase:Phase number or name}`
- Source of truth: `${input:spec:Relative path to the spec file}`
- Relevant section: `${input:section:Section heading or subsection name}`

Before writing the plan:
- Read the relevant section in `${input:spec}` closely.
- Check the current repository state for the files, tests, and helpers this phase depends on.
- Confirm whether prerequisite phases or tasks are already complete.
- Ask a clarifying question only if a real blocking ambiguity remains.

Then create or update `plan.md` for this phase only.

The plan should include:
- the goal of this phase
- the in-scope work
- prerequisite checks and dependencies
- concrete tasks with exact files or areas to inspect or change
- verification steps
- explicit out-of-scope notes for anything that belongs to a later phase

Do not implement yet.

After the plan is written, summarize:
- whether prerequisites are satisfied
- the main tasks in the plan
- any blocker or assumption that still matters
