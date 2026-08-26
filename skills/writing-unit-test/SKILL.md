---
name: writing-unit-test
description: "Guide for writing a unit test. Use when writing a unit test for functions or components, and when fixing a bug in existing code."
---

# Writing Unit Tests

## Required foundation

This skill is a focused companion to the globally installed `tdd` skill from [`mattpocock/skills`](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd).

Before using this skill:

1. Install the global `tdd` skill if it is not already available.
2. Read the `tdd` skill's reference docs: `tests.md` and `mocking.md`.
3. Use this skill as the narrower layer for writing or refining the test itself rather than running a full red-green-refactor workflow.

See [README.md](README.md) for install instructions and the rationale for keeping this skill separate.

## Philosophy

**Core principle**: Tests should verify behavior through public interfaces, not implementation details. Code can change entirely; tests shouldn't.

**Good tests** are integration-style: they exercise real code paths through public APIs. They describe _what_ the system does, not _how_ it does it. A good test reads like a specification - "user can checkout with valid cart" tells you exactly what capability exists. These tests survive refactors because they don't care about internal structure.

**Bad tests** are coupled to implementation. They mock internal collaborators, test private methods, or verify through external means (like querying a database directly instead of using the interface). The warning sign: your test breaks when you refactor, but behavior hasn't changed. If you rename an internal function and tests fail, those tests were testing implementation, not behavior.

Use the global `tdd` skill's examples and reference docs as the canonical source for interface design, mocking, and broader TDD guidance.

## Rules

- One test at a time
- Don't anticipate future tests
- Keep tests focused on observable behavior
- When fixing a bug, write a test for the expected behavior before any code changes
- Follow the global `tdd` skill's guidance for mocking and interface design

### Before writing any code

- [ ] Confirm with user which behaviors to test (prioritize)
- [ ] List the behaviors to test (not implementation steps)
- [ ] Get user approval on the plan

Ask: "What should the public interface look like? Which behaviors are most important to test?"

**You can't test everything.** Confirm with the user exactly which behaviors matter most. Focus testing effort on critical paths and complex logic, not every possible edge case.