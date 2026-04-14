---
name: execute-phase-from-plan
description: Execute an approved implementation phase from the current plan.md.
argument-hint: "phase=<phase or task group> spec=<relative spec path> scope=all|task"
---

Execute the implementation described in `plan.md`.

## Inputs

- **Target:** `${input:phase:Phase number, name, or task group}`
- **Spec file:** `${input:spec:Relative path to the spec file}`
- **Scope:** `${input:scope:Execution scope — "all" (default) or "task"}`
  - `all` — execute every task in the phase sequentially, then verify.
  - `task` — execute only the next incomplete task, then stop.

## Phase 0 — Orient

Before writing any code, complete these steps in order:

1. **Read the plan.** Open `plan.md` and locate the target phase.
   Identify its Goal, Prerequisites, File Structure, Tasks, Verification
   checklist, and Out of Scope section.

2. **Check prerequisites.** Walk the Prerequisites table. For every row
   marked ✅, confirm the artifact still exists and hasn't regressed.
   For rows marked ⚠️ or ❌, stop and report the blocker — do not
   start implementation with unmet prerequisites.

3. **Reconcile with repo state.** Compare the File Structure table
   against the actual filesystem. Note any files that already exist
   (partial prior work) or that have diverged from expectations.

4. **Determine starting point.** If tasks are already marked ✅ in
   the plan (from a prior invocation), skip them. Begin at the first
   incomplete task.

5. **Ask only if blocked.** If a blocking ambiguity remains after
   reading the plan, the spec, and the code, ask one focused clarifying
   question. Do not ask about non-blocking details — resolve those
   by reading the spec.

## Phase 1 — Execute

Work through tasks in their numbered order. For each task:

### Per-task protocol

1. **Read the spec references.** Before starting the task, read the spec
   sections cited in its title (e.g., "Spec §12 Step 3.2, §9"). These
   contain the implementation detail the plan intentionally omits.

2. **Implement.** Write the code. Follow project conventions, the spec's
   guidance, and any constraints noted in the task summary.

3. **Delegate when appropriate.** If a task aligns with a specialist
   subagent's domain (e.g., `ui-composer` for component layout,
   `code-simplifier` for post-implementation cleanup), dispatch it.
   Use your judgment — not every task needs a subagent. When dispatching,
   always invoke the `subagent-dispatch` skill first to resolve the
   correct model and encoding.

4. **Respect scope boundaries.** Skip work listed in the plan's
   `## Out of Scope` section. Exception: if you discover a tightly
   coupled issue in a file you are already modifying and the fix is
   small, apply it and disclose what you did and why in the task
   completion note.

5. **Mark the task done.** After completing a task, update `plan.md`:
   change `### Task N:` to `### Task N: ✅` so progress is visible
   in the file. If running in `scope=task` mode, stop here.

### Error handling during execution

- **Build or lint failure:** Attempt to fix. If the fix is outside this
  phase's scope, revert your change, mark the task with ⚠️ instead of
  ✅, and note the issue. Do not let a broken build propagate to the
  next task.
- **Ambiguity in spec:** Re-read the referenced spec sections. If still
  unclear, make the most conservative choice, implement it, and flag the
  assumption in the completion report.
- **Prerequisite discovered missing mid-execution:** Stop, report the
  gap, and do not continue past the affected task.

## Phase 2 — Verify

After all tasks are complete (or the single task in `scope=task` mode):

1. **Run the Verification checklist.** Execute each check from the
   plan's `## Verification` section. Mark each item `[x]` or note
   what failed.

2. **Run project-level checks.** At minimum:
   - Lint: `bun run lint` (fix auto-fixable issues with `bun run lint:fix`)
   - Build: confirm the app builds without errors on the relevant
     platform(s) for this phase.

3. **Update plan.md.** Write verification results directly into the
   plan's Verification section.

## Phase 3 — Report

Produce a completion summary with three sections:

### Completed tasks
List each task by number and title. Note any deviations from the plan
(files touched that weren't in File Structure, out-of-scope fixes
applied, subagents dispatched).

### Verification results
For each Verification checklist item, state pass/fail and evidence
(e.g., "lint passed with 0 errors", "app builds on Android",
"provider renders in component tree — confirmed via dev tools").

### Follow-ups
Items that should move to the next phase or need human attention:
- Unresolved assumptions
- Out-of-scope issues discovered during execution
- Partial work that was intentionally deferred
- Spec gaps or contradictions found during implementation