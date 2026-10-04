---
name: fix-repository-diagnostics
description: Verify or fix diagnostic findings in JavaScript/TypeScript repositories using project tooling. Use for project-wide checks or a scoped repair batch.
---

# Fix Repository Diagnostics

Run a closed diagnostic loop: discover tooling, collect the baseline, verify findings and select the repair batch, fix root causes, and rerun diagnostics before reporting.

Follow explicit user instructions when they override this skill's defaults. For fix requests, carry the selected batch through verification and reporting without pausing for routine allocation or implementation choices. Continue independent authorized work when a finding is blocked or requires approval.

## 1. Discover Repository Tooling

1. Work from the repository root and read the applicable repository instructions.
2. Inspect the worktree before editing. Preserve user-owned changes and identify files already modified by others.
3. Inspect package scripts, their wrappers, workspace configuration, and diagnostic configuration files to identify the project's lint, typecheck, and other configured diagnostic commands. Use installed dependencies as supporting evidence; a package's presence alone does not establish that the repository uses it for diagnostics.
4. Prefer repository-defined commands and preserve their configuration and wrapper behavior. Use `bun run <script>` for package scripts and `bunx <tool>` for local executables by default, unless explicit repository instructions require another runner. Identify separate TypeScript projects and diagnostic commands hidden behind aggregates that stop after the first failure.
5. For React or React Native projects, include React Doctor automatically unless the user's narrower scope excludes it. Prefer a repository-defined script or installed version; otherwise use `bunx react-doctor@latest`. Record the resolved version when available.
6. Use the requested tools, files, rules, or findings to limit the diagnostic scope. When no narrower scope is given, select the applicable project-wide diagnostics discovered above. Identify baseline commands and any supported scoped check or fix commands before running them; inspect scripts to distinguish non-mutating checks from fix operations.

Complete this phase when every applicable diagnostic source has identified commands and configurations or an exact recorded discovery blocker.

## 2. Collect the Diagnostic Baseline

1. Run the selected non-mutating diagnostic commands before choosing the repair batch. Run independent checks separately so each exit status and output remains attributable to its command and one failure cannot hide another source's findings.
2. Record findings in stable command-output order with their diagnostic source, rule or error code, file, location, and message. Preserve individual command results when several commands belong to the same source.
3. Record a command failure as an exact blocker, not as a clean result. Continue with independently verified findings from available sources. Substituting tooling requires approval; unavailable sources remain unverified.

Complete this phase only when every selected diagnostic command has either produced a baseline or has an exact recorded blocker.

## 3. Verify and Build a File-Complete 15-Issue Batch

Treat one distinct diagnostic record as one issue. Exact duplicate records from the same tool count once.

1. Use 15 issues as the base selection cap. File closure may extend the final batch beyond 15.
2. Aim for an even distribution across the selected diagnostic sources, such as TypeScript, the repository's linter, React Doctor when applicable, and other configured sources. Combine separate TypeScript project checks into one source for allocation while retaining their individual command results. Redistribute unused capacity as evenly as practical among sources with more verified findings. Choose the allocation using judgment; file closure and root-cause grouping take precedence over balance.
3. Within each source, consider findings in their original output order unless the request explicitly prioritizes particular findings.
4. For each candidate considered:
   - Open the referenced code and confirm the finding still applies to the current worktree.
   - Trace enough surrounding code, types, configuration, and dependency versions to identify the root cause.
   - Treat React Doctor findings as hypotheses until the referenced implementation and installed package versions confirm them.
   - Dependency changes require explicit approval for the specific action, including manifest or lockfile edits and package installation, removal, or updates. The React Doctor fallback in section 1 may acquire an executable without changing project dependencies. Keep unapproved dependency findings report-only, classify them as approval-required, and exclude them from the repair batch. Check package-manager and peer-dependency relationships; absence from application imports is not evidence that a dependency is unused.
   - Classify the finding as reproducible, stale, duplicate, false positive, approval-required, already owned by another change, or blocked, and keep the supporting evidence.
5. Count only reproducible findings toward the batch. Continue selecting until the batch reaches 15 issues or no eligible findings remain.
6. Make each selected file a closure group across the requested diagnostics:
   - When any finding selects a file, verify every finding for that file from the selected diagnostic sources that is in the run's scope.
   - Include every reproducible finding for that file in the same batch, even when the findings have different sources or root causes.
   - Count closure findings toward the base cap until it is reached. Include every remaining finding in an already-selected file as an additional issue beyond the cap; never defer part of a selected file.
   - Stop selecting new files after the batch reaches or exceeds 15 issues.
7. Keep findings that one root-cause change is expected to resolve in the same batch. Count every affected diagnostic record, and defer an oversized group only before any of its files is selected; file closure takes precedence after selection.
8. Freeze the selected batch before editing. Record the per-source counts, additional issues beyond 15, and the reason for any batch below 15. Defer all unselected findings to a later run.

Complete this phase when the batch includes every verified, reproducible, authorized in-scope finding in each selected file, only file closure extends it beyond 15, and excluded findings have recorded classifications and evidence. Record any closure gaps caused by unavailable sources; affected files remain unverified while independent work proceeds.

## 4. Fix the Root Cause

1. Make the smallest in-scope change that resolves the verified cause while preserving behavior.
2. Follow the repository's current React Native, Expo, React, TypeScript, and lint conventions.
3. Prefer a real type, control-flow, or component correction. Use a suppression, unsafe cast, rule change, or generated-file edit only when evidence shows it is the correct fix and the task authorizes its scope.
4. Keep edits confined to the selected root causes, preserving unrelated code and formatting.
5. After each coherent fix, inspect the diff and check that every changed line serves an accounted-for finding.

Complete this phase when every selected issue is fixed or has an exact unresolved blocker and all edits stay within the selected root-cause groups. A selected file with unresolved findings remains incomplete; report that state explicitly.

## 5. Close the Loop

1. For modified JavaScript or TypeScript files, use the discovered scoped fix command when available and applicable. Preserve repository wrappers and supported file arguments, and inspect any resulting edits. If no suitable fix command exists, make the correction directly and use the discovered check command.
2. After the final edits, rerun the exact baseline commands for the selected diagnostics to verify the selected findings and file closure. Use project-wide commands when the run's scope is project-wide.
3. Run the narrowest relevant tests when a fix changes runtime behavior. Repeat or broaden checks only when subsequent edits, failures, or unresolved concerns justify them.
4. Inspect the final diff for scope, correctness, accidental edits, and conflicts with pre-existing work.
5. Compare the final diagnostics with the baseline. A nonzero project-wide command may remain when deferred or out-of-scope debt exists; prove that the selected findings disappeared and that modified files gained no new findings.

Complete this phase when fresh output accounts for every selected issue and confirms file closure, or exact blockers explain what remains unresolved or unverified. Claim a modified file is complete only when every selected source has verified it and it has no remaining in-scope findings.

## 6. Report

Use this summary:

- `<diagnostic source>`: `<fixed>` fixed, `<remaining>` remaining (one entry per selected source)
- Verification: each final diagnostic command and exit status
- Blockers: exact blockers, or `none`
- Dependency findings awaiting approval: each finding and the evidence needed for a human decision, or `none`

### Additional Fixes

- Total: `<count>` issues fixed beyond the 15-issue base cap
- By file: `<path>: <count>`, or `none`

Count `fixed` from selected baseline issues that disappeared in fresh output, including additional fixes. Count an additional fix when a reproducible baseline issue beyond the first 15 was included to complete a selected file and disappeared in fresh output. Count `remaining` from all distinct findings in the final full diagnostic output, including deferred and out-of-scope findings. Report `unknown` instead of zero when a diagnostic cannot complete. Omit root causes and per-finding narratives.

State that a tool passes only when its fresh full command exits successfully. Otherwise report the narrower verified result without describing the repository as clean.
