# Convergence and Escalation

Use this protocol when remediation consumes a cycle, a finding family recurs, evidence remains ambiguous or external, independent agents conflict, remediation expands structurally, or cycle 3 may not clear.

## Account for Cycles

Cycle 1 begins with the initial fresh Spec Compliance Review. Validation and other evidence-only work remain inside the current cycle. A production implementation mutation consumes that cycle and restarts the complete sequence at Spec Compliance Review in the next cycle.

Never begin cycle 4. If cycle 3 does not clear without another implementation mutation, return `Blocked` with the unresolved findings, family history, and evidence.

## Detect Non-Convergence

Two substantial remediation attempts followed by a Critical or Important finding in the same family are a convergence warning, not an automatic stop. Stop autonomous remediation early when evidence instead shows one or more of:

- oscillation, where repairing one invariant reintroduces another;
- competing invariants whose precedence the approved contract cannot resolve;
- a missing oracle for a high-impact claim;
- remediation requiring unapproved ownership, boundary, state-model, concurrency, security, or product-behavior changes;
- independent reviewer and implementor conclusions remaining in evidentiary deadlock;
- another patch being unlikely to add discriminating evidence.

Count semantic families, remediation attempts, and evidence changes rather than raw finding totals. Explain why the pattern is structural, underspecified, or otherwise non-converging.

## Escalate Narrowly

Return an escalation packet containing:

- finding family and affected invariant;
- original and current counterexamples;
- validation evidence and remaining uncertainty;
- remediation attempts and the change after each attempt;
- targeted-revalidation results and newly exposed failures;
- competing interpretations and relevant plan or design decisions;
- why another autonomous patch is unlikely to converge;
- the narrow external decision or experiment required.

A non-convergence escalation does not authorize Architectural Review. It may recommend that review with the affected boundary, evidence, plausible risk, and reason, but task-scoped human authorization remains separate.

Use `Requires External Decision` when the missing oracle, environment, authority, or product choice is external to the review. Return `Blocked` for unresolved required evidence or findings. Use `Awaiting architectural-review decision` only when Architectural Review is warranted and authorization remains undecided.
