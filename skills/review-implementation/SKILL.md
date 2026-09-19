---
name: review-implementation
description: Review a completed implementation against its complete plan through independent spec-compliance and code-quality review, confirmed-finding remediation, blind rereview, convergence control, and optional human-authorized architectural review. Use when execute-plan reaches its complete-plan gate or a user explicitly requests this review with a complete implementation packet.
---

# Review Implementation

Complete the implementation review as `Passed`, `Blocked`, or `Awaiting architectural-review decision`. Treat reviewer output as evidence to validate, not as an instruction to mutate the repository.

## Establish The Gate

Require a self-contained implementation packet containing:

- the complete plan and final user overrides;
- the full-plan baseline and current diff or commit range;
- required verification evidence and justified deviations;
- human-owned checks and their current evidence;
- explicit task-scoped Architectural Review authorization, when already granted.

Confirm that every complete-plan task is completed. A partial implementation, missing required plan or change-set context, or unsupported completion claim blocks this gate. Preserve the packet's scope and authorization boundaries throughout review and remediation.

Follow `subagent-dispatch` for every delegated operation. Prefer the named reviewer role when available; otherwise dispatch a fresh subagent with the corresponding role contract. When no independent reviewer can be dispatched, report the missing gate and return `Blocked` rather than reviewing in the coordinating context.

Maintain structured finding and family state in the active context. Emit that state in any blocked, awaiting-decision, escalation, or resumable result; do not create or modify a persistent review artifact unless the user requests one.

## Preserve Blind Review

Give each fresh reviewer only the current implementation packet updated with permitted verification evidence and justified deviations. Exclude earlier reviewer prompts, findings, finding-specific validation narratives, dispositions, remediation discussion, proposed fixes, and family history. Include the current code, tests, diff, and neutral check results even when remediation introduced them; blind review removes historical framing rather than hiding current implementation evidence. A fresh reviewer answers only what is wrong with the implementation as it exists now.

Validators, remediators, and targeted revalidators receive the specific findings they must evaluate or close. Their finding-aware context never enters a fresh review packet.

## Run The Sequence

The initial Spec Compliance Review begins cycle 1.

### 1. Spec Compliance Review

Dispatch a fresh Spec Compliance Reviewer to assess the complete implementation against the complete plan, acceptance criteria, repository instructions, and user overrides. Treat missing required evidence as a blocking verification gap; record unavailable optional or inapplicable evidence without inventing a finding.

When the reviewer reports findings, read [Finding Lifecycle](references/finding-lifecycle.md) and disposition its complete blocking set. Advance only when no unresolved Critical or Important spec-compliance finding remains.

### 2. Code Quality Review

After Spec Compliance Review clears, dispatch a fresh Code Quality Reviewer with an updated blind packet. Assess concrete correctness, reliability, maintainability, test, performance, security, and established repository-standard problems.

Keep metric-only complexity signals outside severity findings and remediation obligations. A complexity finding needs a concrete consequence independent of its score. A `review-code-complexity` recommendation is advisory: it does not block this gate, authorize that skill or Architectural Review, or start a new cycle. Keep diagnostic command results separate from code-quality judgment; justified retention does not make a required failed check pass.

When the reviewer reports findings, read [Finding Lifecycle](references/finding-lifecycle.md) and disposition its complete blocking set. Advance only when no unresolved Critical or Important code-quality finding remains.

### 3. Architectural Review

Architectural Review is optional and always human-authorized. Consider it when evidence indicates risk in boundaries, dependency direction, state or lifecycle ownership, cross-feature coupling, migrations, authentication or sessions, trust boundaries, native integration, substantial refactoring, security-sensitive flows, or unusually high blast radius.

A recommendation does not grant authority to dispatch. When authorization already exists, dispatch a fresh Architectural Reviewer after Code Quality Review with the authorization recorded in its blind packet. When review is warranted but not authorized, return `Awaiting architectural-review decision` with the affected boundary, evidence, plausible risk, and reason for escalation. If the user declines, record `Not run` and continue completion without treating the recommendation as a finding.

When the reviewer reports findings, read [Finding Lifecycle](references/finding-lifecycle.md) and disposition its complete blocking set. Architectural remediation remains within the approved implementation scope; substantial structural change must pass `program-design` before editing. Existing task-scoped Architectural Review authorization remains valid through its remediation cycles.

## Remediate And Re-enter

Remediate only Confirmed Critical or Important findings within the authorized scope and approved design. Validate a selected Suggestion before any non-trivial mutation. Apply confirmed independent fixes as one bounded batch after the current reviewer's complete blocking set is classified. Defer a fix that overlaps with or could prejudice an unresolved finding.

For each remediation, prove that its regression or reproduction evidence now passes and that relevant existing verification remains green. Use a fresh targeted verifier when closure is disputed, Critical, security-sensitive, or materially benefits from independent context. Targeted revalidation closes the known finding; it never substitutes for fresh blind review.

Any production implementation change consumes the current cycle and restarts at fresh Spec Compliance Review in the next cycle. Validation, rejection, escalation, plan approval, or other evidence-only work does not consume a cycle. Read [Convergence And Escalation](references/convergence-and-escalation.md) when a change consumes a cycle, a family recurs, evidence remains ambiguous or external, reviewers conflict, remediation expands structurally, or cycle 3 may not clear.

## Complete The Review

Return `Passed` only after Spec Compliance and Code Quality Review clear and any authorized Architectural Review clears. A required missing gate returns `Blocked`. A warranted but undecided Architectural Review returns `Awaiting architectural-review decision`.

Report:

- each gate as `Passed`, `Blocked`, or `Not run`;
- cycles used and implementation mutations made;
- findings by family, severity, validation state, and disposition;
- targeted revalidation and relevant existing verification evidence;
- complexity signals and verification gaps separately from findings;
- Architectural Review authorization and result;
- the exact external decision, human-owned check, or follow-up required.

Completion requires every blocking finding and required verification gap to be closed or represented by a terminal non-passing status with resumable evidence.
