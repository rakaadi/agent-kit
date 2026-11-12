# Code Testing Manifesto

**Version 1.0 — November 2026**

## Preamble

**Testing exists to establish confidence in software correctness, not merely to produce passing tests.**

A working implementation is not necessarily a correct implementation. Likewise, a passing test suite does not necessarily prove that software fulfills its intended requirements.

As coding agents assume greater responsibility for implementation, verification becomes increasingly important. An agent can misunderstand a requirement, produce an implementation that appears correct, and generate tests that reinforce the same misunderstanding.

The responsibility of engineering remains unchanged: to determine what software should accomplish and establish sufficient evidence that it does so correctly.

This manifesto defines the principles governing how we design, prioritize, execute, and evaluate software tests, regardless of programming language, framework, or development workflow.

Its purpose is not to maximize test counts or enforce a particular testing methodology. Its purpose is to make verification meaningful, reliable, and proportionate to the risks involved.

---

## I. Test the Contract, Not the Implementation

A test should establish **what the software must do, not how it accomplishes that behavior.**

Tests should verify observable outcomes through meaningful interfaces and boundaries.

An internal refactor that preserves the established contract should not unnecessarily require rewriting the tests.

Prefer assertions about returned results, state transitions, observable effects, and externally visible behavior over assertions about internal execution steps.

Implementation details may be tested when they represent an explicit technical requirement, such as performance, concurrency guarantees, resource limits, or security properties.

**The implementation may change. The contract is what the tests protect.**

## II. Establish an Independent Source of Truth

Every meaningful test must have a justified expectation.

Expected behavior should originate from requirements, domain rules, specifications, established contracts, known-correct examples, or other independently justified expectations.

A test must not simply reproduce the implementation's algorithm or assumptions and treat matching results as proof of correctness.

When expected behavior is ambiguous, the ambiguity should be resolved before a test establishes it as an accepted contract.

For agent-generated code, particular attention must be given to tests that originate from the same interpretation of a requirement as the implementation. Such tests may reproduce the same misunderstanding without detecting it.

Independent expectations do not necessarily require an independent author or agent. They require an identifiable source of truth that can be evaluated separately from the implementation.

**A test that confirms an incorrect assumption provides false confidence, regardless of whether it passes.**

## III. Prefer Real Behavior Over Simulated Implementation

Tests should execute real behavior whenever doing so is practical, deterministic, and appropriate to the testing boundary.

Mocking and other test doubles are tools for controlling dependencies, not the default means of constructing tests.

They are justified when they enable meaningful verification, including:

- Isolating external systems or unavailable services.
- Controlling nondeterministic behavior, time, or failure conditions.
- Avoiding expensive, destructive, or impractical operations.
- Verifying interactions that are themselves contractual requirements.

Prefer testing observable effects over verifying incidental collaborator calls.

Do not mock internal collaborators solely to make the implementation easier to test. Excessive mocking can couple tests to implementation structure and allow behavior that would fail with real dependencies to appear correct.

Where practical, complement isolated tests with integration tests that exercise actual dependency relationships.

**A test should not pass merely because every meaningful point of failure has been replaced with a simulation.**

## IV. Choose the Right Verification Boundary

No single testing level is universally superior.

Unit tests are appropriate for focused, deterministic behavior. Integration tests establish that components and systems work together. End-to-end tests verify behavior across representative user or system workflows.

The appropriate boundary depends on the contract being verified, the consequences of failure, and the reliability and cost of the evidence produced.

Prefer the smallest meaningful boundary that can adequately prove the intended behavior, but do not isolate a system so aggressively that the test loses its relevance.

Not every function requires a unit test. Not every feature requires an end-to-end test. Some changes may be adequately verified through existing tests, static analysis, or other appropriate checks.

Testing levels should complement one another instead of mechanically duplicating the same assertions.

**Choose testing boundaries according to behavior and risk, not merely the structure of the source code.**

## V. Verify UI Behavior and Visual Correctness Separately

UI correctness consists of multiple concerns, including functionality, accessibility, visual presentation, and usability.

Component-level tests can provide meaningful evidence for user interactions, state transitions, validation, and accessibility contracts.

However, functional assertions alone cannot establish visual correctness.

Structural snapshot testing should not substitute for meaningful behavioral assertions or visual verification. A snapshot can detect a representation change without establishing whether that change is correct or visually acceptable.

Important user-facing workflows should be verified through representative integration or end-to-end testing, complemented by visual inspection or visual regression testing where appropriate.

Visual tests themselves require reviewable baselines and cannot independently establish good design or usability.

**A functionally correct interface can still be visually broken or unusable.**

## VI. Prioritize Meaningful Confidence Over Coverage

The quantity of tests is not a measure of software correctness.

Line coverage, branch coverage, mutation scores, and similar metrics are diagnostic instruments. They can expose weaknesses in verification, but they cannot independently establish test quality.

Testing effort should prioritize:

- Critical business rules and domain invariants.
- Failure scenarios and boundary conditions.
- Security, data integrity, and other high-impact risks.
- Important integration boundaries.
- Complex or historically fragile behavior.
- Regressions caused by previously identified defects.

A test should justify its existence through the meaningful behavior or risk it protects.

Avoid tests that duplicate stronger evidence, assert trivial implementation details, or merely increase coverage without improving confidence.

When a test provides little additional confidence relative to its execution and maintenance cost, reconsider its value.

**Coverage reveals where code was exercised. It does not prove that the right behavior was verified.**

## VII. Challenge the Tests Themselves

Tests are software and can contain defects, incorrect assumptions, weak assertions, and unnecessary complexity.

A passing test establishes only that the implementation satisfies the expectations encoded in that test under the conditions exercised.

Test quality should be evaluated by asking whether the test would detect a meaningful deviation from the intended behavior.

Use appropriate techniques such as boundary analysis, negative testing, property-based testing, mutation testing, and regression testing to challenge the strength of existing assertions.

Mutation testing is particularly useful for identifying tests that fail to distinguish correct behavior from altered implementations.

However, surviving mutations should be investigated rather than automatically treated as failures requiring additional tests. Some mutations may be behaviorally equivalent or irrelevant to the contract being protected.

Tests should also remain deterministic, understandable, and maintainable. Flaky tests and opaque assertions reduce the reliability of the verification process.

**Testing quality must itself be subject to scrutiny.**

## VIII. Make Verification an Explicit Responsibility in Agentic Engineering

Coding agents may independently design, implement, execute, and improve tests within established requirements and risk boundaries.

Routine testing decisions should not require continuous human approval.

However, autonomy does not grant authority to redefine requirements or weaken verification standards.

Agents must distinguish between:

- Intended behavior established by requirements.
- Assumptions introduced during implementation.
- Behavior actually verified through execution.
- Behavior that remains unverified.

Agents should resolve routine technical decisions independently while escalating material ambiguity, conflicting requirements, and consequential changes to established contracts.

They must not disable tests, weaken assertions, silently update expected outputs, or modify acceptance criteria solely to obtain a passing result.

When verification fails, the failure must be investigated rather than concealed. Tests should not be changed merely to accommodate implementation behavior unless the expected behavior itself has been independently established as incorrect.

When implementation and tests are generated by the same agent, additional attention should be given to whether the tests independently reflect the intended requirements.

**The agent may produce the implementation and verification evidence. The engineer remains accountable for determining whether the evidence establishes correctness.**

## IX. Scale Verification to the Risk

Verification should be proportional to the potential consequences of an incorrect implementation.

Not every change requires the same depth of testing or review.

Changes should be evaluated according to factors such as behavioral complexity, affected scope, reversibility, uncertainty, and potential impact on users, systems, security, or data integrity.

A practical verification model distinguishes three risk levels.

### Low Risk — Focused Verification

Changes with limited impact, clear expectations, and easily reversible outcomes.

Verification should focus on affected behavior, relevant existing tests, and appropriate static checks.

New tests are not automatically required when existing evidence is sufficient.

### Moderate Risk — Behavioral and Integration Verification

Changes involving meaningful application behavior, multiple components, or nontrivial failure conditions.

Verification should include explicit behavioral scenarios, relevant negative and boundary cases, and integration checks where dependencies influence correctness.

Agent-generated expectations should be examined for consistency with the intended requirements.

### High Risk — Comprehensive, Independently Reviewed Verification

Changes affecting critical workflows, security boundaries, data integrity, irreversible operations, or other consequential behavior.

Verification should establish independently reviewable expectations, exercise representative integration or end-to-end paths, and cover significant failure and recovery conditions.

Relevant automated checks should be supplemented by human review or other independent verification where warranted.

These levels are guidelines for selecting evidence, not rigid quotas or fixed testing pyramids. Project-specific policies may establish stricter requirements.

**The greater the consequence of failure, the stronger the evidence required before accepting the implementation.**

## X. Make Verification Evidence Transparent

Verification should produce evidence that can be understood and evaluated, not merely a declaration that the work is complete.

For material changes, the verification record should communicate:

- What behavior was intended and what was tested.
- Which relevant checks were executed and their outcomes.
- What assumptions or limitations affected verification.
- Which meaningful risks or scenarios remain unverified.

The depth of reporting should match the risk and complexity of the change. Trivial changes do not require elaborate verification reports.

A passing result must not be claimed for checks that were not executed. An inability to execute a test must not be represented as successful verification.

Verification evidence should be reproducible where practical and sufficient for another engineer to understand the basis of confidence.

**Completion claims must reflect what has actually been verified, not what is merely expected to work.**

## XI. Treat Testing as an Engineering Investment

Testing has costs: implementation effort, execution time, infrastructure, complexity, and ongoing maintenance.

These costs must be justified by the confidence gained.

Prefer tests that detect consequential regressions, survive legitimate refactoring, and provide actionable feedback when they fail.

Verification should be integrated into the development process without becoming a ritual that rewards test quantity over meaningful outcomes.

A smaller, well-designed test suite can provide more confidence than a larger suite dominated by redundant assertions or implementation-specific mocks.

Tests should be maintained as part of the software they protect. Obsolete, unreliable, or low-value tests should be revised or removed when justified.

**The objective is not maximum testing, but sufficient trustworthy verification at a sustainable cost.**

## XII. Evolve the Practice Through Evidence

Testing methodologies, development tools, and coding-agent capabilities will continue to evolve.

This manifesto establishes guiding principles rather than prescribing permanent frameworks, tools, or implementation techniques.

New practices should be evaluated according to their demonstrated ability to improve correctness, verification confidence, reliability, maintainability, or efficiency.

Existing practices should be revised when evidence shows that they produce insufficient confidence, excessive maintenance costs, or unnecessary constraints.

Project guidelines, agent skills, and verification infrastructure should evolve independently while remaining consistent with these principles.

**Testing practices may change. The responsibility to establish software correctness does not.**

---

## Final Principle

**We do not write tests merely to prove that code works. We write tests to challenge whether it works as intended.**

A passing test suite is evidence, not a verdict.

A successful implementation is one that fulfills the intended contract, survives meaningful verification, and provides sufficient confidence for the risks involved.

In agentic engineering, implementation becomes increasingly automated. The engineer's responsibility is to ensure that what gets built is what was meant to be built—and that the evidence supporting its correctness can be trusted.
