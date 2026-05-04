---
name: writing-plan
description: Use when you have a spec or requirements for a multi-step task, before touching code
---

## Overview

Write comprehensive implementation plans assuming the engineer has zero context for our codebase and questionable taste. Document everything they need to know: which files to touch for each task, code, testing, docs they might need to check, how to test it. Give them the whole plan as bite-sized tasks. DRY. YAGNI. TDD. Frequent commits.

Assume they are a skilled developer, but know almost nothing about our toolset or problem domain. Assume they don't know good test design very well.

**Announce at start:** "I'm using the writing-plan skill to create the implementation plan."

## Scope Check

If the spec covers multiple independent subsystems, it should have been broken into sub-project specs during brainstorming. If it wasn't, suggest breaking this into separate plans — one per subsystem. Each plan should produce working, testable software on its own.

## File Structure

Before defining tasks, map out which files will be created or modified and what each one is responsible for. This is where decomposition decisions get locked in.

- Design units with clear boundaries and well-defined interfaces. Each file should have one clear responsibility.
- You reason best about code you can hold in context at once, and your edits are more reliable when files are focused. Prefer smaller, focused files over large ones that do too much.
- Files that change together should live together. Split by responsibility, not by technical layer.
- In existing codebases, follow established patterns. If the codebase uses large files, don't unilaterally restructure - but if a file you're modifying has grown unwieldy, including a split in the plan is reasonable.

This structure informs the task decomposition. Each task should produce self-contained changes that make sense independently.

## Bite-Sized Task Granularity

**Each task should be one coherent, reviewable slice:**
- Small enough that an execution agent can complete it without broad repo-wide reasoning.
- Large enough to produce a meaningful artifact, boundary, or verification point.
- Prefer tasks that touch different files or domains so independent work can run in parallel.
- Make dependencies explicit with stable task IDs and `**Depends on**`.
- If a task is truly one action, say that plainly instead of padding the description.

## Plan Document Header

**Every plan MUST start with this header:**

```markdown
# [Feature Name] Implementation Plan

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach]

**Tech Stack:** [Key technologies/libraries]

---
```

## Task Structure

Use a stable task ID plus explicit dependency metadata so agents can see what may run in parallel and humans can see what must wait. Write `Description` as a short opening sentence followed by actionable bullet points. If the task only has one thing to do, a single short paragraph is fine.

````markdown
#### Task `task-id`

**Title**: [Action-oriented task title].

**Description**: [One short sentence that explains what this task accomplishes and why it exists.]

- Create or modify `exact/path/to/file.ts` for [specific responsibility].
- Reuse `exact/path/to/reference.ts` as the reference surface for existing patterns or types.
- Preserve [named constraint, public API, or runtime behavior] while making the change.
- Run `exact verification or lint command` if the task needs a concrete tooling step.

**Depends on**: `upstream-task-id` or Nothing.

**Produces**: `exact/path/to/file.ts`; updated `exact/path/to/other-file.ts`

**Acceptance**: [Observable outcome that proves the task is done.]

---

#### Task `shared-api-factory`

**Title**: Build the shared authenticated API factory.

**Description**: Move the duplicated authenticated request lifecycle behind one shared factory so both API slices use the same boundary.

- Create `src/redux/createAuthenticatedApi.ts`.
- Define `AuthenticatedApiConfig` with only the configuration current callers need.
- Centralize request normalization, URL resolution, auth header injection, 401 refresh and retry, and reset-on-refresh-failure.
- Preserve existing concurrency and retry behavior instead of introducing a new refresh mechanism.
- Run `bunx eslint src/redux/createAuthenticatedApi.ts src/redux/authSessionHelpers.ts --fix`.

**Depends on**: `auth-session-helpers`

**Produces**: `src/redux/createAuthenticatedApi.ts`

**Acceptance**: `createAuthenticatedApi` is the only place that knows how authenticated requests are executed, retried, and reset after refresh failure.
````

## Remember
- Exact file paths always
- Stable task IDs and explicit dependencies
- Concrete, file-anchored instructions in plan (not "add validation")
- Exact commands with expected output
- Reference relevant skills with @ syntax
- DRY, YAGNI, TDD, frequent commits

## Plan Review Loop

After writing the complete plan:

1. Dispatch a single plan-document-reviewer subagent (see plan-document-reviewer-prompt.md) with precisely crafted review context — never your session history. This keeps the reviewer focused on the plan, not your thought process.
   - Provide: path to the plan document, path to spec document
2. If ❌ Issues Found: fix the issues, re-dispatch reviewer for the whole plan
3. If ✅ Approved: proceed to execution handoff

**Review loop guidance:**
- Same agent that wrote the plan fixes it (preserves context)
- If loop exceeds 3 iterations, surface to human for guidance
- Reviewers are advisory — explain disagreements if you believe feedback is incorrect
