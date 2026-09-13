---
name: review-code-complexity
description: Assess flagged code architecturally and recommend justified retention or structural improvement, with approval before changes.
disable-model-invocation: true
---

# Review Code Complexity

Use cyclomatic and cognitive complexity findings as cues for architectural assessment. Completion means an evidence-backed disposition for every reviewed symbol, not a lower score or a warning-free command.

Follow the user's tool choices when provided; otherwise use the standard tools available in the environment. Read and apply the `codebase-design` skill for assessment and the `program-design` skill when proposing substantial changes. Resolve these skills through the environment's available skills; report an unavailable required skill as a prerequisite gap instead of claiming to have applied it.

## 1. Establish the Review Batch

1. Read the repository instructions and inspect the current worktree. Preserve existing changes and distinguish them from work authorized by this review.
2. Discover the configured cyclomatic and cognitive complexity diagnostics, their scope, thresholds, exclusions, suppression conventions, and command behavior. Use the repository's existing configuration rather than introducing thresholds or installing tooling.
3. Honor explicitly requested files, findings, or package scope. With no narrower request, obtain repository-wide findings, sort flagged files by repository-relative path, and select the first file awaiting review. Review every flagged symbol in that file; there is no per-symbol cap.
4. Treat multiple metric findings for the same symbol as one assessment while retaining each diagnostic record. Identify anonymous callbacks and nested functions by their enclosing symbol and location.
5. For explicitly named files, also inspect existing complexity suppressions and their underlying code. A clean diagnostic run does not replace that assessment. Bare invocation targets currently emitted findings rather than reopening existing suppressions.
6. Maintain the reviewed-file dispositions and remaining queue in the conversation. On a subsequent bare invocation, refresh the findings and advance past files already reviewed against unchanged code and configuration. Reassess affected dispositions when their supporting evidence changes. A new conversation has no assumed review history.

If metrics are not configured, report the missing prerequisite and stop automatic selection. An explicitly named file can still receive a qualitative architectural assessment; label measured complexity as unavailable. Installing or configuring metrics requires a separate request. If configured diagnostics fail to run, record the exact failure and incomplete coverage; use available source evidence for an explicitly scoped review without claiming a measured baseline.

Complete this phase when the selected files, diagnostic coverage, existing-change ownership, and remaining queue are recorded, or the exact selection blocker is established. If a complete run yields no findings, report that result without claiming the repository has no architectural problems.

## 2. Assess the Code

Work file-by-file. Inspect each selected symbol's implementation, interface, callers, and existing tests. Reach into other files only to resolve a concrete concern about a caller contract, shared invariant, dependency, ownership, or related implementation; state why that inspection is needed. Supporting inspection does not automatically add those files to the review or edit scope.

Use a subagent workflow for exploration and assessment:

1. Use the user's selected subagents when specified; otherwise choose from the available subagents. If delegation is unavailable, perform the assessment directly and disclose that limitation.
2. Assign bounded, read-only investigations within the selected batch. Give each subagent the relevant repository context, symbols and diagnostic records, assessment criteria, and expected evidence. Request its own assessment rather than confirmation of a predetermined recommendation.
3. Run independent investigations in parallel when possible. For a single-file batch, delegate a focused symbol or related concern while the lead agent examines other relevant evidence. Parallel work preserves the file-complete batch and does not expand the queue's scope.
4. Have subagents return source references, invariants, justified and accidental complexity, recommended dispositions, and evidence gaps. The lead agent reconciles their findings with the repository evidence and owns the final assessment and proposal.

Apply `codebase-design` to determine:

- Which domain states, policies, ordering constraints, and failure paths explain the branching?
- Does the module hide consequential behavior behind a small interface, or expose state and obligations its callers must manage?
- Do responsibilities and invariants stay local, or are they mixed, duplicated, or drifting across implementations?
- Would a proposed extraction create a meaningful module and improve the interface, locality, or testing through the caller's seam?
- Would retaining the code preserve a cohesive decision process, or merely preserve accidental complexity?

Evaluate the metrics separately. An unflagged metric is not a measured zero. Neither a large score nor the label “state machine” settles the architectural judgment. Support retention with concrete invariants and evidence that decomposition would fragment them; support change with a specific structural problem and an improvement independent of the score. Resolve disagreements through that evidence rather than treating subagent agreement as proof.

Give each symbol an evidence-backed disposition:

- **Retain:** the complexity is justified by a cohesive responsibility.
- **Change:** a concrete structural or behavioral problem warrants intervention.
- **Mixed:** improve an identified part while retaining justified complexity elsewhere.
- **Unresolved:** missing or conflicting evidence prevents a defensible judgment; identify what would resolve it.

Record stale, duplicate, or misattributed diagnostics separately. Distinguish an architectural recommendation from an independently discovered correctness defect, including its concrete consequence. Scope broader concerns as follow-up recommendations rather than expanding implementation silently.

Inspect existing tests for the relevant observable contracts. Run focused tests when their results would resolve a concrete uncertainty, and explain what that evidence establishes. Passing tests support behavioral claims, not architectural quality.

Complete this phase only when every selected flagged symbol, every suppression included by explicit file scope, and every diagnostic record is accounted for with evidence or an exact unresolved gap.

## 3. Recommend and Report

For substantial changes, apply `program-design` and present its required code-shape views, including affected files and test seams. Explain which invariants and caller obligations the proposal preserves or deliberately changes. For a local correction or suppression-only recommendation, show the precise proposed change without manufacturing a structural redesign.

Treat retaining code and suppressing a warning as separate decisions. Where repository policy permits suppression, propose the narrowest rule-specific comment supported by the assessment. Explain the domain invariant or cohesive protocol being preserved. A mixed recommendation should reassess residual complexity after the substantive change before applying any proposed exception. Keep global thresholds and unrelated rules outside the proposal.

Return the review in the conversation unless the user requests a saved artifact:

- **Scope and coverage:** selected files, diagnostics/configuration examined, and any qualitative-only assessment.
- **Per-symbol table:** file and symbol, each reported metric, assessment, and recommendation. Distinguish not flagged, suppressed, and unavailable values.
- **Reasoning:** concrete evidence for both retention and actionable problems, including relevant cross-file concerns.
- **Proposal:** substantial code shape or precise local changes, plus proposed suppression comments where warranted.
- **Verification and gaps:** commands actually run, exit statuses, what their evidence supports, and unresolved questions.
- **Queue:** reviewed dispositions and the next files awaiting review; label incomplete discovery explicitly.

A warning can make a diagnostic command fail while the underlying complexity is justified. Report the actual command result separately from the review judgment. Mutation testing and general architecture audits are separate work, not automatic extensions of this review.

Complete the review when the report accounts for the entire selected batch. Ask for approval of concrete proposed edits before changing code, tests, or suppressions. If no edits are recommended, finish with the assessment and queue.

## 4. Implement Approved Changes

After explicit approval, implement the accepted changes without asking for the same approval again. Partial approval authorizes only the accepted subset. Approval applies to the reviewed proposal, not the remaining queue. Present a material design or scope change for approval before implementing it.

1. Recheck the affected worktree against the review evidence and preserve others' changes.
2. Implement the approved correction or refactor while preserving the agreed contracts. Add or adjust tests where needed to establish changed behavior or protect affected invariants through the caller's interface.
3. Reassess remaining complexity in changed symbols. Apply only approved, still-justified suppressions; report newly needed exceptions for approval.
4. Rerun the diagnostics that produced the affected findings, and run the narrowest relevant behavioral and repository-required checks. Inspect the final diff for scope and accidental edits.
5. Report implemented changes, retained complexity, suppressions, exact verification results, remaining gaps, and the next review files. Distinguish findings removed by structural change from findings hidden by approved suppression; neither alone proves an architectural improvement.

Complete implementation when fresh evidence accounts for every approved change and any unresolved limitation is explicit. Leave unapproved recommendations and queued files untouched. Further review begins with the user's next invocation; commits and publication require their own authorization.
