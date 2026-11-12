---
name: writing-unit-test
description: "Write behavior-focused unit tests. Use when writing or refining tests for functions or components, or adding regression coverage for a bug fix."
---

# Writing Unit Tests

Protect the intended contract through observable behavior. A test should detect a meaningful regression and survive internal refactors that preserve the contract.

For a full test-driven development workflow, use the complementary `tdd` skill. This skill focuses on writing tests; `tdd` supplies the red-green-refactor workflow.

## Establish the contract

Use behavior already agreed in the conversation, issue, or specification as the test scope. Resolve routine test-design choices independently; ask only when material ambiguity or conflicting requirements prevent a justified expectation or would change the agreed scope.

Before writing a test, identify:

- The behavior or risk it protects, prioritizing critical rules, regressions, and consequential failure or boundary cases.
- The source of the expected result: a requirement, domain rule, established contract, or known-correct example justified independently of the implementation.
- The smallest meaningful boundary that can verify the behavior.

Proceed when those are clear. Add tests where they provide meaningful confidence beyond existing tests or static checks.

## Write the test

- Name the test for the behavior it protects. Assert returned results, state transitions, or observable effects through a meaningful interface.
- Exercise real code where practical. Use test doubles to control external dependencies, time, nondeterminism, or costly or destructive operations.
- Assert internal details or collaborator calls when they are explicit technical or interaction requirements.
- Derive expectations from the identified source; copying the implementation's algorithm into a test can repeat the same mistake.
- When adding regression coverage for a bug fix, establish that the test detects the original defect before changing the implementation, where reproducible.

Use integration coverage when correctness depends on real dependency relationships. For UI components, behavioral assertions and structural snapshots leave visual correctness unverified; use visual inspection or visual regression testing where needed.

## Verify and finish

Run affected tests and required project checks. Check whether assertions would detect a meaningful deviation from the contract. Investigate failures; correct expected results only when independent evidence justifies the change.

Once relevant checks pass, broaden or repeat verification only for new changes, failures, unresolved risks, or project requirements. Consequential behavior may need integration, end-to-end, or independent verification beyond unit tests.

Report the behavior verified, checks executed and outcomes, and material gaps. Match reporting detail to the change's risk.
