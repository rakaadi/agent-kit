---
name: execute-plan
description: Execute an attached or referenced implementation plan in a codebase from repository exploration through implementation, verification, and sequential compliance then quality review. Use when the user asks Codex to implement, carry out, resume, or execute a plan, including runs with free-form scope changes such as executing only selected phases, skipping tasks, changing verification ownership, or adding task-specific constraints.
---

# Execute Plan

Execute the plan as the implementation contract, adapted to current repository evidence and the user's instructions for this run.

Announce at start: "I'm using the execute-plan skill to implement the plan."

## Instruction Priority

Apply instructions in this order:

1. System, platform, and safety constraints.
2. Active repository instructions such as `AGENTS.md`.
3. The user's current prompt, including any additional execution instructions.
4. Locked decisions, scope, tasks, acceptance criteria, and verification in the plan.
5. Reasonable implementation choices inferred from the repository.

Treat the entire user prompt as a free-form override layer. Do not require a fixed input format. Extract any limits or changes to scope, sequencing, tasks, verification, review focus, or human responsibilities before starting.

Examples of valid run-specific instructions include:

- execute only a named phase or set of task IDs;
- skip or defer specified tasks;
- implement tests but leave their execution to a human;
- avoid a command, dependency, file, platform, or environment;
- stop at a named acceptance or review boundary.

Follow explicit overrides and report their consequences. Do not silently execute excluded work merely because it appears in the plan. If an override makes a downstream task impossible or invalidates an acceptance criterion, explain the conflict and complete every unaffected task that remains feasible.

Run both reviewer stages whenever code or tests change, even for partial-plan execution. Additional instructions may narrow reviewer scope or focus, but do not implicitly remove the review gates. Skip a reviewer only when a higher-priority instruction explicitly prohibits that reviewer or the reviewer is unavailable; report the omission as an incomplete gate.

## Workflow

### 1. Establish the execution contract

- Read the complete plan and all active repository instructions before editing.
- Identify the requested task or phase subset, explicit exclusions, dependencies, acceptance criteria, verification ownership, and stopping condition.
- Distinguish the canonical semantic plan from presentation-only artifacts. For an HTML plan, focus on its task content rather than styling markup.
- Inspect current repository state and relevant files. Verify plan assumptions against code instead of assuming the plan is current.
- Preserve user changes already present in the worktree.

Ask for clarification only when a material decision cannot be recovered from the plan or repository and a reasonable assumption risks the wrong or destructive result. Otherwise, state the assumption and continue.

### 2. Plan the run

- Build a concise execution checklist from the in-scope tasks and their dependencies.
- Mark excluded tasks explicitly as skipped or deferred; do not mark them completed.
- Use the plan's ordering unless repository evidence requires a change.
- Dispatch subagents only when context isolation, specialist expertise, parallel read-only exploration, or an independent review materially helps. Follow the `subagent-dispatch` skill whenever dispatching.
- Do not let subagents edit overlapping files concurrently.

### 3. Implement

- Execute in-scope tasks through completion, not merely analysis or recommendations.
- Make minimal, repository-consistent changes and preserve public behavior outside the requested scope.
- Follow exact plan decisions when they remain valid.
- Make the smallest justified adaptation when the repository has diverged from the plan. Record the reason and affected task IDs.
- Keep tests aligned with observable behavior and the plan's acceptance criteria.
- Do not expand scope for incidental cleanup or optional reviewer suggestions.

### 4. Verify the implementation

- Run the plan's applicable verification steps and relevant repository checks after implementation.
- Add focused checks when necessary to prove an in-scope acceptance criterion.
- If the user reserves a check for a human, create or update the required test or verification artifact but do not run the reserved command.
- Never claim an unrun check passed. Report it as `Not run` with the reason and exact command the human can execute.
- If a check cannot run because of environment or permission limits, attempt reasonable alternatives and preserve the evidence.

### 5. Run the compliance review

Dispatch the Compliance Reviewer only after implementation and the permitted initial verification are complete.

Give the reviewer a self-contained prompt containing:

- the plan path and the exact in-scope task or phase subset;
- all user overrides, exclusions, and human-owned verification;
- changed files or diff scope;
- verification commands and results;
- justified plan deviations.

Validate each finding against the plan and repository. Fix every substantiated Critical and Important compliance issue that falls within the run's scope. Re-run affected permitted checks. If a finding conflicts with an explicit user override, preserve the override and document why the finding was not applied.

Do not proceed to quality review until compliance findings have been addressed or explicitly dispositioned.

### 6. Run the quality review

Dispatch the Quality Reviewer after compliance fixes and re-verification so it reviews the updated implementation, not the pre-compliance state.

Give the reviewer a self-contained prompt containing:

- the same plan scope and user overrides;
- the current diff after compliance fixes;
- current verification evidence;
- compliance findings and their dispositions when relevant to understanding the final code.

Validate the findings. Fix every substantiated Critical and Important quality issue within scope, then rerun affected permitted checks. Treat Suggestions as optional unless they are necessary for acceptance, correctness, security, or maintainability under established repository standards.

If quality fixes materially affect plan compliance, return to a focused Compliance Reviewer pass on the affected requirements, address its findings, and then run a focused Quality Reviewer pass on the resulting code. Preserve compliance-before-quality ordering on every repeated review cycle.

### 7. Finish

Update the plan's progress tracking only when the plan is a maintained execution artifact and the user has not prohibited plan edits. Reflect partial execution accurately: a selected phase may be completed while the overall plan remains in progress.

Report:

- completed task IDs or phases;
- skipped or deferred work and the instruction that excluded it;
- changed files and resulting behavior;
- verification commands with `Passed`, `Failed`, or `Not run` status;
- plan deviations and rationale;
- compliance findings and fixes;
- quality findings and fixes;
- remaining blockers, human-owned checks, or follow-up work.

Keep the final response concise, but include enough evidence to distinguish completed work from unverified or intentionally excluded work.

## Review Loop Limits

- Reviewers are advisory; verify findings rather than applying them mechanically.
- Prefer fixing findings directly over producing another plan.
- Limit the complete compliance-to-quality review cycle to three passes. If significant objections remain after the third cycle, stop the loop and report each unresolved issue with its evidence and disposition.
- Never use the Quality Reviewer before the Compliance Reviewer for this workflow.
