---
name: writing-plan
description: Write an execution-ready implementation plan from a spec or requirements, in Markdown or review-oriented HTML.
disable-model-invocation: true
---

Write an execution-ready handoff before implementation begins. Ground tasks in repository evidence, dependencies, verification, and observable acceptance criteria. Preserve user requirements, overrides, and approved decisions; leave routine coding choices to the implementer.

> **Writing guidance:** Follow the `writing-for-agents` skill when available to structure and phrase the plan.

## Output Mode

Honor an explicitly requested format or filename. Otherwise, default to Markdown. Produce both formats only when explicitly requested.

Default to the OS temporary directory, resolved through the host environment (for example, `tempfile.gettempdir()` or `os.tmpdir()`). Use a human-requested directory when supplied, including one in an output path. A filename alone retains the default directory. Report the resolved artifact path in the handoff.

- For Markdown, write `plan-${implementation-task}.md` using a kebab-case task slug.
- For HTML, write `plan-${implementation-task}.html` using the same slug. Before writing, read [HTML Plan Artifact Guidance](./html-plan-artifact-guidance.md), [Plan Artifact Skeleton](./example/plan-artifact-skeleton.html), and [Plan Artifact Panel Reference](./example/plan-artifact-panel-reference.html), then use their contract and scaffold.

## Required Plan Contract

Expose these sections in order:

1. Feature name
2. Goal
3. Architecture
4. File structure
5. Execution flow
6. Dependency-aware tasks
7. Verification Matrix
8. Progress tracking
9. Out of scope

Preserve the same implementation detail in either format.

Record new dependencies, version constraints, and consequential technology choices in Architecture or the relevant task; omit a standalone Tech Stack section.

Markdown plans must start with:

```markdown
# [Feature Name] Implementation Plan

**Goal:** [One sentence describing what this builds]

**Architecture:** [Two or three sentences describing the approach]

---
```

## Scope And File Structure

Choose plan boundaries from the requested handoff scope, shared acceptance criteria, and integration dependencies. Split independently deliverable and testable subsystems when useful; otherwise, keep one dependency-aware plan.

Inventory known affected files and their responsibilities. Verify existing paths, label proposed files, and follow repository organization; introduce a split only for a distinct required boundary. Use the inventory to define task ownership and dependencies.

Distinguish confirmed constraints, proposals, and unresolved decisions. Lock a decision only with an explicit requirement, established constraint, or approval. For boundaries awaiting design, name the boundary and its prerequisite; reserve final paths for established choices.

## Task Structure

Give each task one reviewable outcome, affected files or boundaries, dependencies, acceptance criteria, and verification coverage in the plan-level matrix. Use established exact paths. Mark tasks parallel only when dependencies and file ownership permit it; keep work on a shared boundary in one coherent slice.

Describe the outcome, purpose, and essential context in one to three concise sentences. Put actionable constraints and acceptance in their fields or instruction bullets, and verification in the matrix.

Use annotated diffs when they clarify affected files, interface shapes, or before/after behavior. Label them illustrative and keep comments concise. State constraints, failure behavior, reuse instructions, and unresolved decisions alongside them. Use bullets or checklists when clearer, especially for investigation or design. Preserve execution detail. Leave interfaces and decisions assigned to later design work open; identify their prerequisites and dependent work.

Require `@program-design` for tasks that introduce or substantially reshape modules, interfaces, types, file layout, dependencies, or control flow. Omit it for small fixes, local implementation changes, and mechanical edits.

### Readiness

A plan is ready when an implementer can proceed without inventing material requirements or making unapproved architectural decisions. An investigation or design task is actionable when its question, expected evidence or approved output, and dependent work are clear. Settle choices affecting scope, dependencies, or acceptance before declaring dependent implementation ready; until then, record them as prerequisites.

### Human Review Focus

Assess every task for judgment that automated checks and agent reviews cannot establish. Add an advisory Human Review Focus only when correctness materially depends on product, domain, architectural, security, privacy, or UX judgment. Category membership alone, including routine styling, does not qualify.

For each focus, name the narrowest stable file, symbol, screen, workflow, policy, or boundary; state the judgment to apply and why agent or automated validation is insufficient. Limit each task to three items; split an overloaded task or prioritize its highest-risk areas.

Keep the focus advisory: it creates no dependency, acceptance criterion, verification result, task state, review gate, or completion gate. Record unresolved material decisions as prerequisites and explicitly required human checks in verification.

### Task Template

Use this Markdown task contract:

````markdown
#### Task `task-id`

**Title**: [Action-oriented task title].

**Description**: [One to three concise sentences explaining the outcome, purpose, and essential context.]

**Changes** (illustrative shape, not an executable patch; use bullets instead when clearer):

```diff
+ exact/path/to/file.ts
+ // [Responsibility of the proposed new file.]
```

- Reuse `exact/path/to/reference.ts` for [existing pattern, type, or behavior].
- Preserve [named constraint, public API, or runtime behavior].

**Required skills**: `@skill-name` when the task depends on one; otherwise omit this field.

**Depends on**: `upstream-task-id` or Nothing.

> **Human Review Focus**
>
> - Review [narrow implementation surface]; confirm [judgment that requires a human] because [limit of agent or automated validation].

**Produces**: `exact/path/to/file.ts`; updated `exact/path/to/other-file.ts`.

**Acceptance**: [Observable outcome that proves the task is done.]
````

Adapt the instruction bullets and `Produces` to the task: investigation or design work should name its evidence or design artifact and affected boundary rather than invent final implementation paths. Omit the Human Review Focus blockquote when no focus applies.

For HTML, render these fields visibly using the task-card presentation in [HTML Plan Artifact Guidance](./html-plan-artifact-guidance.md#task-cards).

## Execution Flow

Show task dependencies in Mermaid with task IDs as labels, backed by nearby sequencing text and task dependency fields. Put runtime behavior diagrams in Architecture or the relevant design context. Use a fenced `mermaid` block in Markdown and the renderer and fallback guidance for HTML.

## Verification Matrix

Keep verification commands, expected results, and required manual checks exclusively in one plan-level `Verification Matrix`, keyed by task ID or integration scope. Task cards may name test files and behavior coverage as implementation work; reserve Verification fields and run commands for the matrix.

Use the smallest meaningful checks for each outcome while preserving mandatory repository checks. Ground commands in repository tooling, specify expected results and any manual steps, and distinguish task checks from final integration checks. Add tests or repeat broad checks only when changes, failures, or unresolved concerns justify them.

| Task or integration scope | What to verify | Command or manual steps and expected result |
| --- | --- | --- |
| `task-id` | [Observable behavior or constraint] | `[exact command]`; expect [result]. |

## Progress Tracking

Place `Progress Tracking` between `Verification Matrix` and `Out of Scope`, in the plan file:

```markdown
## Progress Tracking

- **Current status:** Not started
- **Started on:** Not started
- **Completed on:** Not completed
- **Last executed tasks:** None
- **Current blocker or next focus:** [First runnable task ID or Waiting to start]
```

Use `Not started`, `In progress`, `Blocked`, or `Completed` for `Current status`. Record executed task IDs newest first. Add `Unplanned necessary work` only when execution requires work outside the original task list.
