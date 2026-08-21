---
name: writing-plan
description: Use when you have a spec or requirements for a multi-step task, before touching code. Supports either Markdown plans or review-oriented HTML plan artifacts.
---

## Overview

Write an execution-ready handoff for a skilled engineer unfamiliar with the repository. Ground every task in exact files, existing patterns, dependencies, verification commands, and observable acceptance criteria.

## Output Mode

Honor an explicitly requested format or filename. Otherwise, default to Markdown. Produce both formats only when explicitly requested.

- For Markdown, write `plan-${implementation-task}.md` using a kebab-case task slug.
- For HTML, write `plan-${implementation-task}.html` using the same slug. Before writing, read [HTML Plan Artifact Guidance](./html-plan-artifact-guidance.md), [Plan Artifact Skeleton](./example/plan-artifact-skeleton.html), and [Plan Artifact Panel Reference](./example/plan-artifact-panel-reference.html), then use their contract and scaffold.

## Required Plan Contract

Expose these sections in order:

1. Feature name
2. Goal
3. Architecture
4. Tech stack
5. File structure
6. Dependency-aware tasks
7. Verification
8. Progress tracking
9. Out of scope

Preserve the same implementation detail in Markdown and HTML.

Markdown plans must start with:

```markdown
# [Feature Name] Implementation Plan

**Goal:** [One sentence describing what this builds]

**Architecture:** [Two or three sentences describing the approach]

**Tech Stack:** [Key technologies and libraries]

---
```

## Scope And File Structure

When requirements contain independently deliverable and testable subsystems, propose one plan per subsystem. Otherwise, keep them in one dependency-aware plan.

Before defining tasks, list every file to create or modify and its responsibility. Follow the repository's existing organization, introducing a split only when the planned change requires a distinct boundary. Use this inventory to define task ownership and dependencies.

## Task Structure

Each task must produce one reviewable outcome with exact files, dependencies, verification, and acceptance criteria. Let independently deliverable outcomes form parallel tasks; keep work sharing the same boundary in one coherent slice.

Require `@program-design` for a task that introduces or substantially reshapes modules, interfaces, types, file layout, dependencies, or control flow. Omit it for small fixes, local implementation changes, and mechanical edits.

Use this Markdown task contract:

````markdown
#### Task `task-id`

**Title**: [Action-oriented task title].

**Description**: [One short sentence explaining what this task accomplishes and why it exists.]

- Create or modify `exact/path/to/file.ts` for [specific responsibility].
- Reuse `exact/path/to/reference.ts` for [existing pattern, type, or behavior].
- Preserve [named constraint, public API, or runtime behavior].
- Run `exact verification command`; expect [observable result].

**Required skills**: `@skill-name` when the task depends on one; otherwise omit this field.

**Depends on**: `upstream-task-id` or Nothing.

**Produces**: `exact/path/to/file.ts`; updated `exact/path/to/other-file.ts`.

**Acceptance**: [Observable outcome that proves the task is done.]
````

For HTML plans, render the same task fields visibly inside task cards, tables, or sections.

## Progress Tracking

Place `Progress Tracking` between `Verification` and `Out of Scope`, in the plan file:

```markdown
## Progress Tracking

- **Current status:** Not started
- **Started on:** Not started
- **Completed on:** Not completed
- **Last executed tasks:** None
- **Current blocker or next focus:** [First runnable task ID or Waiting to start]
```

Use `Not started`, `In progress`, `Blocked`, or `Completed` for `Current status`. Record executed task IDs newest first. Add `Unplanned necessary work` only when execution requires work outside the original task list.

## Plan Review Loop

After writing the plan, dispatch one reviewer using [Plan Document Reviewer Prompt](./plan-document-reviewer-prompt.md) with the plan and spec paths. Resolve substantiated issues, then review the complete plan again. Approval completes the execution handoff.

After three unsuccessful review cycles, present each unresolved objection with its disposition or rebuttal and ask the user to decide.
