---
name: writing-plan
description: Use when you have a spec or requirements for a multi-step task, before touching code. Supports either Markdown plans or review-oriented HTML plan artifacts.
---

## Overview

Assume the engineer is skilled but unfamiliar with this codebase, toolset, and problem domain, and may need explicit guidance on test design patterns used here. Document everything they need to know: which files to touch for each task, code, testing, docs they might need to check, how to test it. Give them the whole plan as bite-sized tasks. DRY. YAGNI. TDD. Frequent commits.

**Announce at start:** "I'm using the writing-plan skill to create the implementation plan."

## Output Mode

Choose exactly one output format for each plan request.

1. If the user explicitly asks for HTML, an HTML artifact, or a file such as `plan-firebase-services.html`, produce HTML.
2. If the user explicitly asks for Markdown, a Markdown plan, or a file such as `plan-firebase-services.md`, produce Markdown.
3. If the request is ambiguous, ask one focused clarifying question before producing any output.
4. If the user is unavailable for a decision, default to Markdown.
5. Do not produce both formats unless the user explicitly asks for both.

## Semantic-First Authoring

Plan content comes first, format comes second. Before writing any Markdown or HTML, output a brief unlabeled internal outline covering: Feature name, Goal, Architecture, Out of scope. Then proceed to render in the chosen format with the following semantic structure:

- Feature name
- Goal
- Architecture
- Tech stack
- File structure
- Dependency-aware tasks
- Verification
- Progress tracking
- Out of scope

The same plan must remain recognizable in either format. HTML may improve the presentation, but it must not drop implementation-critical detail.

## Markdown Mode

- Write the plan to `plan-${implementation-task}.md`, using a kebab-case slug derived from the implementation task name. Example: `plan-firebase-services.md`.
- Use the Markdown contract defined in this file.
- Treat the Markdown file as the execution handoff artifact for downstream plan-execution prompts.

## HTML Mode

- Write the plan to `plan-${implementation-task}.html`, using the same kebab-case task slug as the Markdown variant. Example: `plan-firebase-services.html`.
- Keep the file self-contained with embedded CSS and only minimal JavaScript.
- Preserve the full plan content. HTML may add navigation, summaries, diagrams, and layout, but it must not replace detailed task instructions with a summary.
- Follow the companion guide in [HTML Plan Artifact Guidance](./html-plan-artifact-guidance.md).
- Use [Plan Artifact Skeleton](./example/plan-artifact-skeleton.html) as the default structural scaffold for section order, panel hierarchy, and task-card anatomy.
- Use [Plan Artifact Panel Reference](./example/plan-artifact-panel-reference.html) as the panel-intent map so each section keeps the same main job while the content changes per plan.
- Default to extending those example files instead of inventing a new HTML information architecture unless the user explicitly asks for a different presentation shape.

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

Every plan must expose the following top-level content, whether as Markdown headings or HTML sections/cards:

- Feature title
- Goal
- Architecture
- Tech stack

**Markdown plans MUST start with this header:**

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

For HTML plans, render the same task fields visibly inside task cards, tables, or sections. Do not hide dependency or acceptance information behind presentation-only affordances.

## Progress Tracking

Every plan must include a `Progress Tracking` section between `Verification` and `Out of Scope` in both Markdown and HTML. This section is the execution handoff state, not a narrative changelog.

- `Current status`: `Not started` | `In progress` | `Blocked` | `Completed`
- `Started on`: `YYYY-MM-DD` or `Not started`
- `Completed on`: `YYYY-MM-DD` or `Not completed`
- `Last executed tasks`: task IDs only, newest first, or `None`
- `Current blocker or next focus`: one short line naming the blocker or the next runnable task
- `Unplanned necessary work`: include only when execution required work outside the original task list

Fresh plans should initialize this section with placeholders that make the starting state explicit:

- `Current status`: `Not started`
- `Started on`: `Not started`
- `Completed on`: `Not completed`
- `Last executed tasks`: `None`
- `Current blocker or next focus`: the first runnable task, or `Waiting to start` when execution has not begun

## Remember

- Exact file paths always
- Stable task IDs and explicit dependencies
- Concrete, file-anchored instructions in plan (not "add validation")
- Exact commands with expected output
- Reference relevant skills with @ syntax
- DRY, YAGNI, TDD, frequent commits

## Plan Review Loop

After writing the complete plan:

1. Dispatch a single plan-document-reviewer subagent (see [Plan Document Reviewer Prompt](./plan-document-reviewer-prompt.md)) with precisely crafted review context — never your session history. This keeps the reviewer focused on the plan, not your thought process.
   - Provide: path to the plan document (`plan-${implementation-task}.md` or `plan-${implementation-task}.html`), path to the spec document
2. If ❌ Issues Found: fix the issues, re-dispatch reviewer for the whole plan
3. If ✅ Approved: proceed to execution handoff

**Review loop guidance:**

- Same agent that wrote the plan fixes it (preserves context)
- If the review loop exceeds 3 iterations, stop, and output a numbered list of unresolved reviewer objections with your rebuttal for each, then ask the human to decide.
- Reviewers are advisory — explain disagreements if you believe feedback is incorrect
