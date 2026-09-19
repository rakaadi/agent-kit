# Finding Lifecycle

Use this protocol whenever a reviewer reports a finding or a review resumes with unresolved finding state. Complete it for the reviewer's entire blocking set before mutating the implementation.

## Record the Finding

Track each finding with:

- identifier and cycle introduced;
- family, affected invariant, and system boundary;
- concrete path or counterexample;
- consequence and potential severity;
- validation state, evidence, and validation recipe;
- remediation and targeted-revalidation status.

Severity describes the consequence if the defect is real:

- `Critical`: severe correctness, security, data, crash, or release risk.
- `Important`: a material requirement, reliability, maintainability, test, performance, security, or established-standard problem.
- `Suggestion`: an optional improvement with demonstrated value.

Validation state describes the evidence independently:

- `Confirmed`: direct evidence establishes the defect.
- `Strongly Supported`: a concrete failure path or other substantial evidence supports the claim, but decisive proof remains unavailable or a material uncertainty remains.
- `Unverified`: no meaningful validation attempt has occurred, or the available evidence does not yet establish a concrete failure path.
- `Rejected`: evidence falsifies the claim.
- `Ambiguous`: available evidence supports incompatible conclusions and further repository-side validation may resolve them.
- `Requires External Decision`: the missing oracle, environment, authority, or product decision is outside the available review context.

Change severity only when validation changes the understood consequence, and record the reason. Rejection or uncertainty changes validation state rather than automatically reducing severity.

## Validate Before Mutation

Reconstruct each blocking semantic finding from the current plan, repository, implementation, and verification evidence. Establish the violated invariant and attempt the strongest practical evidence:

1. runtime reproduction;
2. integration test;
3. deterministic regression or unit test;
4. documented external runtime or API behavior;
5. concrete control-flow proof;
6. reviewer judgment alone.

A directly demonstrated mechanical failure may enter as `Confirmed` without a separate validation pass. For a semantic finding, the coordinating agent may confirm it through direct executable evidence or an unambiguous control-flow proof. Dispatch a fresh validator when confirmation depends on judgment, evidence is disputed, impact is Critical, or independent context materially reduces bias.

Only `Confirmed` Critical or Important findings authorize production remediation. `Strongly Supported` authorizes further investigation. An `Ambiguous` blocking finding continues validation until it is confirmed, rejected, or requires an external decision. A physical-device or external-runtime claim that cannot be credibly resolved becomes `Requires External Decision`; preserve its potential severity and specify the exact human-owned experiment, expected observations, and decision needed.

Suggestions remain non-blocking. Validate one only after the user or coordinating agent selects it and the resulting mutation would be non-trivial.

Complete validation when every blocking finding is `Confirmed`, `Rejected`, `Ambiguous` with a concrete next validation step, or `Requires External Decision` with an exact external ask.

## Normalize Families

Accept the reviewer's proposed family label, then normalize it by the shared invariant and affected boundary rather than wording or raw finding count. Keep the family ledger in the coordinator's context and out of fresh review packets.

A closed finding does not make its family healthy. Fresh review may expose a different failure of the same invariant.

## Remediate the Confirmed Set

After classifying the reviewer's complete blocking set, apply Confirmed, independent, in-scope fixes as one bounded batch. Repair the violated invariant rather than mechanically applying a reviewer-suggested patch. Keep scope to the smallest change consistent with the invariant.

When a confirmed fix is independent from an unresolved external decision, it may proceed before the gate blocks. Defer overlapping work or any fix that could prejudice the unresolved decision. A change to approved behavior, ownership, module boundaries, state or concurrency model, security assumptions, or other substantial structure requires the applicable approval or `program-design` gate before editing.

## Targeted Revalidation

For every remediation, show both:

1. the regression, reproduction, or proof for the known invariant now passes; and
2. relevant existing verification remains green.

The remediator owns this targeted revalidation by default. Use a fresh verifier for disputed, Critical, security-sensitive, or otherwise high-risk closure. Mark a finding closed only when both evidence classes support closure.

If validation rejects all blocking findings and no implementation mutation occurred, record the rejection evidence and allow the current review stage to clear without an automatic rerun. Any implementation mutation instead returns control to a fresh blind Spec Compliance Review under the next cycle.
