---
name: execute-plan
description: Execute or resume an attached or referenced implementation plan through repository inspection, implementation, verification, and sequential compliance then quality review. Use for full or partial plan execution, including free-form instructions to select phases or task IDs, skip work, delegate a task independently, reserve checks for a human, or impose task-specific constraints.
---

# Execute Plan

Implement the plan against the current repository, using the user's prompt to define this run's scope.

## Execution Contract

Use the entire user prompt as the runtime override layer. It may select the full plan, phases, or task IDs; skip or defer work; assign tasks to subagents; reserve checks for a human; change sequencing; add task-specific constraints; or set a stopping point. Apply these overrides before execution and report their effects.

Read the complete prompt, repository instructions, and plan before editing. Treat every plan section as input, including file structure, dependencies, required skills, acceptance criteria, verification, progress state, out-of-scope boundaries, global decisions, and checkpoints. For HTML plans, read the visible semantic content and preserve presentation code when updating the artifact.

If the plan and repository differ, make the smallest evidence-based adaptation and record the affected task IDs. Ask only when a material choice cannot be inferred safely.

## Run Manifest

Before implementation, build a run manifest containing:

- the target repository and run baseline;
- every plan task's scope state, dependencies, acceptance criteria, and verification requirements;
- existing or previously completed work;
- task ownership by the main agent, a subagent, or a human.

Use these task states:

- `Selected`: included in this run.
- `Completed`: acceptance criteria are satisfied with permitted verification evidence.
- `Skipped`: the user explicitly excluded the task.
- `Deferred`: the task remains planned but is outside this partial run or stopping point.
- `Blocked`: a selected task cannot proceed because of an unmet dependency, missing input, unavailable required capability, or authority boundary.

Preflight completes when every plan task is selected, skipped, deferred, already completed, or blocked.

## Implement And Verify

Execute selected tasks in dependency order while preserving plan boundaries and intermediate working-state requirements.

- Assign disjoint file ownership to concurrent tasks.
- Load skills and references required by a task before starting it.
- Treat plan commit boundaries as checkpoints. Create commits only when the user or plan explicitly requires them.
- Run task-level verification at its boundary and applicable final verification afterward.

Apply task ownership from the user prompt before ownership stated in the plan. For delegated work, follow the `subagent-dispatch` skill, provide self-contained task context, and assign non-overlapping file ownership. The main agent integrates the result and verifies its acceptance criteria. If explicitly required delegation is unavailable, mark the task blocked or request direction instead of silently executing it in the main context.

For a human-owned check, prepare the test or verification artifact and report `Not run`, the ownership reason, and the exact command or manual steps. Keep its result unverified until human evidence exists. When the environment blocks a check, run the next applicable non-destructive check and report the remaining validation gap.

## Sequential Review Gate

Run this gate only after every task in the complete plan is `Completed`. Completing every task selected for a partial run does not satisfy this gate. For a partial run, update plan progress and report the review gate as `Not run` because the plan remains incomplete.

At the final gate, dispatch a fresh subagent for each review and follow the `subagent-dispatch` skill. Give each reviewer only a self-contained packet describing the current implementation:

- the complete plan path and final user overrides;
- the full-plan baseline and current diff or commit range covering every task;
- human-owned checks and their current evidence;
- verification evidence and justified deviations.

Exclude prior reviewer prompts, findings, dispositions, and summaries. Each reviewer must derive its findings independently from the current plan, repository, diff, and verification evidence.

### 1. Compliance Reviewer

Review the complete implementation against the complete plan contract. Validate findings against the repository, fix substantiated Critical and Important issues within scope, and rerun affected permitted checks. Disposition findings that conflict with user overrides or fall outside scope. Complete this gate when every finding is fixed or dispositioned.

### 2. Quality Reviewer

After compliance fixes, start a fresh Quality Reviewer with an updated review packet. Exclude Compliance Reviewer findings and dispositions. Review for violations of established repository standards and substantiated code smells. Treat a code smell as a signal to investigate, not a defect by itself; report it only when the underlying design problem and concrete impact are evident. Fix substantiated Critical and Important issues within scope, then rerun affected permitted checks. Apply Suggestions only when required for acceptance, correctness, security, or established repository standards.

When quality fixes affect compliance, start a fresh focused Compliance Reviewer followed by a fresh focused Quality Reviewer. Stop after three complete review cycles and report unresolved findings with evidence.

At the final gate, run both reviewers unless a system, repository, or explicit user instruction prohibits one, or the reviewer is unavailable; report any missing gate.

## Complete The Run

Recheck every selected task's acceptance criteria against the implementation and fresh verification evidence.

Update progress only when the plan is a maintained, writable execution artifact:

- `Current status`: `Completed` only when every plan task is completed; `Blocked` when selected work cannot proceed; otherwise `In progress`.
- `Started on`: set when the first task begins.
- `Completed on`: set only with overall `Completed`.
- `Last executed tasks`: record executed task IDs newest first.
- `Current blocker or next focus`: record the blocker or next dependency-ready task.
- `Unplanned necessary work`: record required work outside the original task list.

Preserve archival plans unchanged and represent partial completion without marking the overall plan completed.

Report concisely:

- completed, skipped, deferred, or blocked task IDs;
- changed files and behavior;
- verification with `Passed`, `Failed`, or `Not run` status;
- plan deviations;
- compliance and quality findings addressed;
- remaining human checks, blockers, or follow-up work.
