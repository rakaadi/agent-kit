---
name: delegation-assessment
description: Assess whether recorded implementation work is bounded and verifiable enough to delegate.
---

# Delegation Assessment

Advise whether recorded remaining implementation work is assignment-ready for another implementation session. Remain read-only: the human engineer decides the assignment and the destination session's capability. Do not dispatch work, create a handoff, or modify the plan or repository.

## Establish The Remainder

Assess only at a stable execution checkpoint. The originating execution must first record task states, progress, deviations, blockers, and unplanned necessary work in the plan. When the work inventory is still changing or materially incomplete, report that assessment is premature and identify the missing record.

Use the plan path or plan content supplied by the user. Otherwise locate the plan only when the request and repository identify it unambiguously; ask the user to choose when multiple plans remain plausible. Support Markdown and HTML plans without conversion. Read the complete plan, including locked decisions, external inputs, file inventory, dependencies, task details, verification, progress, and out-of-scope boundaries.

Treat the plan as the durable work record. Consult available execution handoffs, run manifests, review findings, deviations, and focused repository evidence only where they could change the assignment recommendation. Resolve repository-establishable facts through inspection. When sources conflict, resolve the discrepancy from available evidence or identify the exact conflict requiring human confirmation; never silently prefer the newest-looking artifact.

Account exactly once for every incomplete, deferred, or blocked task and every substantiated unplanned-work or remediation item. Completed work may supply dependency or boundary evidence but is not an assessment candidate unless current evidence reopens it.

Assess tasks individually by default. Group tasks only when they share an invariant or implementation boundary and cannot be meaningfully assigned or verified separately. Name the grouped task IDs and the reason for grouping. Dependency, phase membership, proximity, or similar filenames alone do not justify a group.

Complete this stage when the recorded remainder is stable and every candidate is accounted for once, or when the exact scope blocker is identified.

## Assess Assignment Readiness

Evaluate each task or justified group on four dimensions:

1. **Solution-space boundedness:** Are interfaces, ownership, expected and forbidden behavior, and applicable repository patterns already fixed, or must the implementor still make consequential design decisions?
2. **Correctness evidence:** Can focused tests, static analysis, deterministic acceptance criteria, integration checks, or established patterns expose a plausible wrong implementation? Passing ordinary checks is weak evidence when important semantic failures can remain invisible.
3. **Consequence of subtle failure:** What is the impact and reversibility of a defect? Raise the evidence bar for authentication, authorization, security, persistence, migrations, concurrency, shared state, routing, external protocols, and widely consumed APIs; consequence alone does not settle the recommendation.
4. **External or human-only context:** Does correctness depend on product intent, an external contract, policy, compliance, operations, or undocumented organizational knowledge that repository evidence cannot establish?

Treat a Human Review Focus as evidence about a human-owned judgment, not an automatic verdict. Determine whether that judgment is required before assignment, during implementation, or only during later review. Only a pre-assignment judgment blocks assignment readiness.

Unresolved structural design favors coordinator retention. A task's `@program-design` label does not permanently settle the result: after a human-approved design freezes the relevant boundaries, assess its implementation normally.

When a destination session is proposed, assess only objective execution conditions: access to the repository and artifacts, required tools, available context, permitted scope, and ability to run required verification.

Inspect implementation code only as needed to establish these facts. This assessment is not an implementation review and does not replace `review-implementation`.

## Recommend Assignment

Apply the first recommendation whose condition is met:

- **Human confirmation required before assignment:** a missing human-owned fact or unresolved source conflict could materially change the assignment. Name what must be confirmed. Reassess after it is supplied.
- **Retain with coordinator:** known evidence shows unresolved design, cross-task context, architectural ownership, an inadequately bounded solution space, or correctness evidence too weak for the consequence. This retains work in the originating coordinating session; it makes no claim about comparative model capability.
- **Delegable with constraints:** the task is assignment-ready only if a small set of concrete conditions is preserved. State assignment-ready constraints such as a frozen interface, prohibited scope expansion, permitted file surface, required verification, prerequisite, or escalation trigger.
- **Delegable:** the task is bounded, follows established decisions or patterns, has proportionate correctness evidence, and has no material unresolved context or assignment constraint.

Assess a downstream task on its own implementation characteristics while reporting present assignability. Use **Delegable with constraints** when a concrete prerequisite must complete first. Use **Human confirmation required before assignment** when unresolved human context in a prerequisite can change the downstream task. Dependency alone does not require grouping.

Do not use numerical scores. High-impact work changes the evidence demanded; it does not mechanically select a recommendation.

## Report Concisely

Use a routine result only when every candidate is **Delegable**, follows established patterns, has strong verification, contains no unresolved design or external context, and needs no material constraint. Cover the entire assessed remainder in one concise paragraph.

Otherwise:

1. State the assessed remainder and any limitation in one sentence.
2. Give one compact entry per task or justified group with:
   - exact task ID or IDs and canonical recommendation;
   - the primary reason, grounded in the decisive plan or repository evidence;
   - constraints or required human context only when applicable.
3. Ask the human to accept, adjust, override, or supply context.

Do not reproduce the plan, print a dimension-by-dimension matrix when the dimensions are unremarkable, or expand into implementation review. Stop after the recommendation. A later handoff should carry only accepted assignment scope, frozen decisions, necessary constraints, permitted implementation surface, required verification, and escalation boundaries.

`execute-plan` owns execution, dependency ordering, verification, task state, and recording unplanned necessary work. Handoff creation and dispatch require separate authorization. `review-implementation` evaluates the resulting implementation only when its complete-plan gate is satisfied; delegation does not reduce that review requirement.
