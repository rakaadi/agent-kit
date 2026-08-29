---
name: execute-plan
description: Execute or resume an attached or referenced implementation plan through repository inspection, implementation, verification, sequential spec-compliance and code-quality review, and human-authorized architectural review when warranted. Use for full or partial plan execution, including free-form instructions to select phases or task IDs, skip work, delegate a task independently, reserve checks for a human, or impose task-specific constraints.
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

## Program Design Gate

Before implementing a selected task that introduces or substantially reshapes modules, interfaces, types, file layout, dependencies, or control flow, use the `program-design` skill and obtain explicit approval of the proposed code shape. Group tasks behind one proposal when they share the same design. Small fixes, local implementation changes, and mechanical edits do not require this gate.

Approval of the implementation plan does not satisfy this gate unless the plan already contains an explicitly approved program design that still matches the current repository. If implementation evidence later forces a material deviation, return to `program-design` with the affected delta before continuing.

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
- explicit task-scoped authorization for Architectural Review, when granted.

Exclude prior reviewer prompts, findings, dispositions, and summaries. Each reviewer must derive its findings independently from the current plan, repository, diff, and verification evidence.

### 1. Spec Compliance Reviewer

Review the complete implementation against the complete plan contract. Validate findings against the repository and disposition findings that conflict with user overrides or fall outside scope. Fix substantiated Critical and Important issues within scope and rerun affected permitted checks; the implementation change starts a new review cycle. Advance to Code Quality Review only after a fresh Spec Compliance Review has no unresolved blocking findings.

Missing evidence required by the plan, repository instructions, or claimed completion criteria blocks this gate. Report optional, unavailable, or inapplicable evidence as a verification gap without inventing a finding.

### 2. Code Quality Reviewer

After Spec Compliance Review clears, start a fresh Code Quality Reviewer with an updated packet. Exclude Spec Compliance Reviewer findings and dispositions. Review for concrete implementation defects and violations of established repository standards. Fix substantiated Critical and Important issues within scope and rerun affected permitted checks; the implementation change starts a new review cycle at Spec Compliance Review. Apply a Suggestion only when the user or coordinating agent explicitly selects it.

### 3. Architectural Reviewer

Architectural Review is optional and always human-authorized. A recommendation may come from either reviewer or the coordinating agent when evidence indicates risk in system boundaries, dependency direction, state or lifecycle ownership, cross-feature coupling, migrations, authentication or session behavior, trust boundaries, native integration, substantial refactoring, security-sensitive flows, or unusually high blast radius.

A recommendation never grants authority to dispatch the reviewer. When the user already authorized Architectural Review if warranted, run it after Code Quality Review. Otherwise notify the user with the affected boundary, evidence, plausible risk, and reason for escalation, then wait for their decision. If the user declines, record that Architectural Review was not run. If the gate promises a complete implementation review, report it as `Awaiting architectural-review decision` until the user authorizes or declines; a standalone Code Quality Review may complete with the recommendation as an advisory.

Give the Architectural Reviewer a fresh packet that records the authorization. Fix substantiated Critical and Important issues within scope and rerun affected permitted checks. Architectural fixes restart the sequence at Spec Compliance Review; the task-scoped authorization remains valid for its remediation cycles.

Run Spec Compliance and Code Quality Review at every complete-plan gate unless a system, repository, or explicit user instruction prohibits one, or the reviewer is unavailable. Run Architectural Review only when explicitly requested or both warranted and authorized. Report every missing gate.

The initial Spec Compliance Review begins cycle 1. Any implementation change consumes the current cycle and restarts at Spec Compliance Review in the next cycle. Do not begin cycle 4; after cycle 3, report `Blocked` with the unresolved findings and evidence.

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
- spec-compliance, code-quality, and authorized architectural findings addressed;
- remaining human checks, blockers, or follow-up work.
