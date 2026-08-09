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

## 2. Verify and Build a File-Complete 15-Issue Batch

Treat one distinct diagnostic record as one issue. Exact duplicate records from the same tool count once.

1. Use 15 issues as the base selection cap. File closure may extend the final batch beyond 15.
2. Start with five slots for each type:
   - TypeScript: 5
   - ESLint: 5
   - React Doctor: 5
3. Within each type, consider findings in their original output order unless the request explicitly prioritizes particular findings.
4. For each candidate considered:
   - Open the referenced code and confirm the finding still applies to the current worktree.
   - Trace enough surrounding code, types, configuration, and dependency versions to identify the root cause.
   - Treat React Doctor findings as hypotheses until the referenced implementation and installed package versions confirm them.
   - Treat dependency findings as report-only unless the user explicitly authorizes the specific manifest or dependency change. Classify unapproved findings as approval-required, and check package-manager and peer-dependency relationships; absence from application imports is not evidence that a dependency is unused.
   - Classify the finding as reproducible, stale, duplicate, false positive, approval-required, already owned by another change, or blocked, and keep the supporting evidence.
5. Fill a slot only with a reproducible finding. Every other classification leaves the slot unused.
6. Make each selected file a closure group across the requested diagnostics:
   - When any finding selects a file, verify every TypeScript, ESLint, and React Doctor finding for that file that is in the run's scope.
   - Include every reproducible finding for that file in the same batch, even when the findings have different types or root causes.
   - File completeness takes precedence over the per-type slot targets. Update the recorded allocation after adding the file's cross-type findings.
   - Count closure findings toward the base cap until it is reached. Include every remaining finding in an already-selected file as an additional issue beyond the cap; never defer part of a selected file.
   - Stop selecting new files after the batch reaches or exceeds 15 issues.
7. Keep findings that one root-cause change is expected to resolve in the same batch. Count every affected diagnostic record, and defer an oversized group only before any of its files is selected; file closure takes precedence after selection.
8. Redistribute unused slots as evenly as possible among types that have additional verified findings:
   - Give each eligible type the same number of extra slots when possible.
   - Keep the extra-slot counts among eligible types within one issue of each other when equal division leaves a remainder.
   - Assign remainder slots in this fixed order, skipping ineligible types: TypeScript, ESLint, React Doctor.
   - Repeat until 15 issues are selected or no eligible verified findings remain.
   - Examples when findings fit independently: `5/5/5`, `0/8/7` when TypeScript has none, `2/7/6` when TypeScript has only two, and `0/15/0` when only ESLint has findings.
9. Freeze the selected batch before editing. Defer all unselected findings to a later run.

Complete this phase only when no more than 15 issues were selected before file closure, every selected file is complete across the requested diagnostic types, every issue beyond 15 is identified as an additional issue, every approval-required dependency finding is recorded outside the batch, the per-type allocation is recorded, and every unused base slot is explained.

## 3. Fix the Root Cause

1. Make the smallest in-scope change that resolves the verified cause while preserving behavior.
2. Follow the repository's current React Native, Expo, React, TypeScript, and lint conventions.
3. Prefer a real type, control-flow, or component correction. Use a suppression, unsafe cast, rule change, or generated-file edit only when evidence shows it is the correct fix and the task authorizes its scope.
4. Keep dependency findings report-only unless the user explicitly approves the specific change. Do not edit dependency manifests or lockfiles, or add, remove, install, uninstall, or update packages, without that approval.
5. Avoid unrelated refactors, formatting churn, and opportunistic cleanup.
6. After each coherent fix, inspect the diff and check that every changed line serves an accounted-for finding.

Complete this phase only when every selected issue is fixed or has an exact unresolved blocker, no selected file is left with another reproducible in-scope diagnostic, and all edits stay within the selected root-cause groups.

## 4. Close the Loop

1. Rerun the exact project-wide command that produced each fixed finding.
2. For modified JavaScript or TypeScript files, run the repository's changed-file ESLint command with auto-fix, inspect any resulting edits, then rerun the original diagnostic:

   ```bash
   bunx eslint <changed files> --fix
   ```

3. Run the narrowest relevant tests when a fix changes runtime behavior.
4. Inspect the final diff for scope, correctness, accidental edits, and conflicts with pre-existing work.
5. Compare the final diagnostics with the baseline. A nonzero project-wide command may remain when deferred or out-of-scope debt exists; prove that the selected findings disappeared and that modified files gained no new findings.

Complete this phase only when fresh output accounts for every selected issue and every modified file has no remaining finding from any requested diagnostic type.

## 5. Report

Use this summary:

- TypeScript: `<fixed>` fixed, `<remaining>` remaining
- ESLint: `<fixed>` fixed, `<remaining>` remaining
- React Doctor: `<fixed>` fixed, `<remaining>` remaining
- Verification: each final diagnostic command and exit status
- Blockers: exact blockers, or `none`
- Dependency findings awaiting approval: each finding and the evidence needed for a human decision, or `none`

### Additional Fixes

- Total: `<count>` issues fixed beyond the 15-issue base cap
- By file: `<path>: <count>`, or `none`

Count `fixed` from selected baseline issues that disappeared in fresh output, including additional fixes. Count an additional fix when a reproducible baseline issue beyond the first 15 was included to complete a selected file and disappeared in fresh output. Count `remaining` from all distinct findings in the final full diagnostic output, including deferred and out-of-scope findings. Report `unknown` instead of zero when a diagnostic cannot complete. Omit root causes and per-finding narratives.

State that a tool passes only when its fresh full command exits successfully. Otherwise report the narrower verified result without describing the repository as clean.
