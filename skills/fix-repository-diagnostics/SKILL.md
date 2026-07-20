---
name: fix-repository-diagnostics
description: Close repository diagnostic findings from TypeScript, ESLint, and React Doctor. Use when asked to verify or fix project-wide tsc errors, ESLint violations, React Doctor findings, or a scoped batch from any of those tools.
---

# Fix Repository Diagnostics

Run a closed diagnostic loop: establish the baseline, verify each finding, fix its root cause, rerun the finding's source, and report the remaining state.

## 1. Establish Scope

1. Work from the repository root and read the applicable repository instructions.
2. Inspect the worktree before editing. Preserve user-owned changes and identify files already modified by others.
3. Use the requested tools, files, rules, or findings as the scope. When the request gives no narrower scope, run all three project-wide diagnostics:

   ```bash
   nub run lint
   nubx tsc --noEmit
   nubx react-doctor@latest
   ```

4. Run diagnostics separately so each exit status and output remains attributable to one tool.
5. Record findings in stable tool-output order with their tool, rule or error code, file, location, and message. Record a command failure as a blocker, not as a clean result.

Complete this phase only when every requested diagnostic has either produced a baseline or has an exact recorded blocker.

## 2. Verify and Build a 12-Issue Batch

Treat one distinct diagnostic record as one issue. Exact duplicate records from the same tool count once.

1. Cap the run at 12 selected issues.
2. Start with four slots for each type:
   - TypeScript: 4
   - ESLint: 4
   - React Doctor: 4
3. Within each type, consider findings in their original output order unless the request explicitly prioritizes particular findings.
4. For each candidate considered:
   - Open the referenced code and confirm the finding still applies to the current worktree.
   - Trace enough surrounding code, types, configuration, and dependency versions to identify the root cause.
   - Treat React Doctor findings as hypotheses until the referenced implementation and installed package versions confirm them.
   - Classify the finding as reproducible, stale, duplicate, false positive, already owned by another change, or blocked, and keep the supporting evidence.
5. Fill a slot only with a reproducible finding. Every other classification leaves the slot unused.
6. Keep findings that one root-cause change is expected to resolve in the same batch. Count every affected diagnostic record, and defer the group when selecting it would exceed 12 issues.
7. Redistribute unused slots as evenly as possible among types that have additional verified findings:
   - Give each eligible type the same number of extra slots when possible.
   - Keep the extra-slot counts among eligible types within one issue of each other when equal division leaves a remainder.
   - Assign remainder slots in this fixed order, skipping ineligible types: TypeScript, ESLint, React Doctor.
   - Repeat until 12 issues are selected or no eligible verified findings remain.
   - Examples when findings fit independently: `4/4/4`, `0/6/6` when TypeScript has none, `2/5/5` when TypeScript has only two, and `0/12/0` when only ESLint has findings.
8. Freeze the selected batch before editing. Defer all unselected findings to a later run.

Complete this phase only when the selected batch contains at most 12 reproducible issues, its per-type allocation is recorded, every selected root-cause group fits within the cap, and every unused slot is explained.

## 3. Fix the Root Cause

1. Make the smallest in-scope change that resolves the verified cause while preserving behavior.
2. Follow the repository's current React Native, Expo, React, TypeScript, and lint conventions.
3. Prefer a real type, control-flow, dependency, or component correction. Use a suppression, unsafe cast, rule change, generated-file edit, or dependency change only when evidence shows it is the correct fix and the task authorizes its scope.
4. Avoid unrelated refactors, formatting churn, and opportunistic cleanup.
5. After each coherent fix, inspect the diff and check that every changed line serves an accounted-for finding.

Complete this phase only when every selected issue is fixed or has an exact unresolved blocker and all edits stay within the selected root-cause groups.

## 4. Close the Loop

1. Rerun the exact project-wide command that produced each fixed finding.
2. For modified JavaScript or TypeScript files, run the repository's changed-file ESLint command with auto-fix, inspect any resulting edits, then rerun the original diagnostic:

   ```bash
   bunx eslint <changed files> --fix
   ```

3. Run the narrowest relevant tests when a fix changes runtime behavior.
4. Inspect the final diff for scope, correctness, accidental edits, and conflicts with pre-existing work.
5. Compare the final diagnostics with the baseline. A nonzero project-wide command may remain when deferred or out-of-scope debt exists; prove that the selected findings disappeared and that modified files gained no new findings.

Complete this phase only when fresh output accounts for every selected issue and every modified file.

## 5. Report

Use this summary:

- TypeScript: `<fixed>` fixed, `<remaining>` remaining
- ESLint: `<fixed>` fixed, `<remaining>` remaining
- React Doctor: `<fixed>` fixed, `<remaining>` remaining
- Verification: each final diagnostic command and exit status
- Blockers: exact blockers, or `none`

Count `fixed` from selected baseline issues that disappeared in fresh output. Count `remaining` from all distinct findings in the final full diagnostic output, including deferred and out-of-scope findings. Report `unknown` instead of zero when a diagnostic cannot complete. Omit root causes and per-finding narratives.

State that a tool passes only when its fresh full command exits successfully. Otherwise report the narrower verified result without describing the repository as clean.
