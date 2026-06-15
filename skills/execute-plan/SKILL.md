---
name: execute-plan
description: Execute or resume an attached or referenced implementation plan through repository inspection, implementation, verification, and sequential compliance then quality review. Use for full or partial plan execution, including free-form instructions to select phases or task IDs, skip work, delegate a task independently, reserve checks for a human, or impose task-specific constraints.
---

# Execute Plan

Implement the plan against the current repository, using the user's prompt to define this run's scope.

Announce at start: "I'm using the execute-plan skill to implement the plan."

## Execution Contract

Read the full user prompt, repository instructions, and complete plan before editing. The prompt may freely override plan scope, sequencing, verification ownership, or stopping point; no fixed input format is required. Follow those overrides and report their effects.

Treat the whole plan as semantic input, including preambles, locked decisions, non-goals, file inventories, source references, task metadata, commit or checkpoint guidance, verification, and progress state. For HTML plans, ignore presentation code except where needed to preserve the artifact when updating it.

Before implementation:

- determine the target repository when the plan lives elsewhere;
- inspect relevant code and git state, recording a baseline for this run;
- reconcile the plan with work already completed or changes already present;
- identify in-scope tasks, dependencies, exclusions, acceptance criteria, required skills, task-specific delegation, and human-owned checks;
- mark excluded tasks as skipped or deferred and infeasible tasks as blocked; never mark either completed.

If the plan and repository differ, make the smallest evidence-based adaptation and record the affected task IDs. Ask only when a material choice cannot be inferred safely.

## Implement and Verify

Build a concise dependency-aware checklist, then execute every feasible in-scope task. Preserve plan-defined task boundaries and intermediate working-state requirements. Honor explicit task isolation such as "another agent or session" by dispatching an independent subagent when available; follow the `subagent-dispatch` skill for every dispatch.

- Use minimal, repository-consistent changes and preserve out-of-scope behavior.
- Do not allow concurrent edits to overlapping files.
- Consult skills or references explicitly required by the plan before that work.
- Treat commit boundaries as implementation checkpoints. Create commits only when the user or plan explicitly requires actual commits.
- Run task-level checks at the boundary where the plan requires them; run the applicable final verification afterward.
- Add focused checks only when needed to prove an in-scope acceptance criterion.

When a check is reserved for a human, prepare the test or verification artifact but do not run it. Report it as `Not run`, with the reason and exact command or manual steps. Never infer success from an unrun check. If environment limits block verification, try reasonable alternatives and retain the evidence.

## Sequential Review Gate

Run both reviewers after implementation and permitted verification whenever code or tests changed, including partial-plan runs.

### 1. Compliance Reviewer

Provide a self-contained review prompt with:

- plan path and in-scope task IDs or phases;
- user overrides, exclusions, and human-owned checks;
- run baseline and current diff or commit range;
- verification evidence and justified deviations.

Validate the findings against the repository. Fix substantiated Critical and Important issues within scope and rerun affected permitted checks. Explicitly disposition findings that conflict with user overrides or are outside scope. Do not start quality review until compliance findings are resolved or dispositioned.

### 2. Quality Reviewer

Review the updated code after compliance fixes. Provide the same execution contract, current diff, latest verification evidence, and relevant compliance dispositions. Fix substantiated Critical and Important issues within scope, then rerun affected permitted checks. Apply Suggestions only when needed for acceptance, correctness, security, or established repository standards.

If quality fixes materially affect compliance, repeat a focused compliance pass followed by a focused quality pass. Preserve this order on every cycle. Stop after three complete cycles and report any unresolved findings with evidence.

Skip a reviewer only when a system, repository, or explicit user instruction prohibits it, or when the reviewer is unavailable; report the missing gate.

## Complete the Run

Recheck every in-scope acceptance criterion against code and fresh verification evidence. Update plan progress only when it is a maintained, writable execution artifact and accurately represent partial completion; do not rewrite archival source material or mark the overall plan complete when only a subset ran.

Report concisely:

- completed, skipped, deferred, or blocked task IDs;
- changed files and behavior;
- verification with `Passed`, `Failed`, or `Not run` status;
- plan deviations;
- compliance and quality findings addressed;
- remaining human checks, blockers, or follow-up work.
