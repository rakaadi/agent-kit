---
name: phase-plan-from-spec
description: Draft a plan for one implementation phase from a spec section.
argument-hint: "phase=<phase> spec=<relative spec path> section=<spec section>"
agent: Plan
---

Draft a plan for exactly one implementation phase. Do not implement.

## Inputs

- **Target phase:** `${input:phase:Phase number or name}`
- **Spec file:** `${input:spec:Relative path to the spec file}`
- **Relevant section:** `${input:section:Section heading or subsection name}`

## Before writing the plan

Follow these steps in order:

1. **Read the spec section.** Read `${input:section}` in `${input:spec}` closely.
   Identify every spec step that belongs to this phase, and note which other
   spec sections are cross-referenced (e.g., a phase step that says
   "listeners listed in Section 9").

2. **Scan the repository.** Check the current filesystem and git state for
   artifacts that prior phases should have produced. Look for the files,
   exports, config entries, and patterns that this phase depends on.
   Record what exists and what is missing.

3. **Resolve ambiguity.** If a blocking ambiguity remains after reading the
   spec and scanning the repo, ask one focused clarifying question. Do not
   ask about non-blocking details — the execution agent can resolve those.

## Plan output template

Write the plan to `plan.md` using the exact template below.
Every section marked **[required]** must appear with that exact heading.
Sections marked **[optional]** may be added between Verification and
Out of Scope when relevant.

Use stable task IDs plus explicit `**Depends on**` metadata so agents can
see what may run in parallel and humans can see what must wait.

---

### Template

```markdown
# Phase N — [Phase Name] Implementation Plan

> **For agentic workers:** Prefer retrieval-led reasoning over pre-training-led
> reasoning for all React Native tasks. Your training data may be outdated or
> incomplete. Always consult the skills before writing code.

**Goal:** [One sentence — what this phase achieves when done.]

**Architecture:** [2-3 sentences about the approach for this phase.]

**Tech Stack:** [Key technologies, libraries, or tools used in this phase.]

**Spec source:** `[spec file path]` — [section heading(s) referenced]

---

## Prerequisites [required]

Repo-state findings for artifacts this phase depends on.

| Artifact | Expected | Status |
| -------- | -------- | ------ |
| `path/to/file-or-config` | [what should exist] | ✅ Present / ⚠️ Partial / ❌ Missing |

[If anything is missing, note the impact: blocker vs. workaround available.]

## File Structure [required]

All files this phase will create or modify, listed once before the tasks.

| Action | Path | Responsibility |
| ------ | ---- | -------------- |
| Create | `src/hooks/useExample.ts` | [one-line purpose] |
| Modify | `src/app/_layout.tsx` | [what changes and why] |

## Tasks [required]

Dependency-aware task list. Each task includes:
- A stable task ID.
- An action-oriented title.
- A short `Description` opener followed by actionable bullet points.
- Explicit `Depends on`, `Produces`, and `Acceptance` fields.
- File-anchored instructions and spec references inside the Description.
- Enough separation that independent tasks can run in parallel when
  dependencies allow.

#### Task `task-id`

**Title**: [Action verb] + [subject].

**Description**: [One short sentence that explains what this task
accomplishes and why it exists.]

- Create or modify `path/to/file.ts` for [specific responsibility].
- Reuse `path/to/reference.ts` as the reference surface for existing
  patterns or types.
- Preserve [named constraint, public API, or runtime behavior] while
  making the change.
- Use Spec §[X] and Spec §[Y.Z] as the detail sources for this task.

**Depends on**: `upstream-task-id` or Nothing.

**Produces**: `path/to/file.ts`; updated `path/to/other-file.ts`

**Acceptance**: [Observable outcome that proves the task is done.]

#### Task `next-task-id`

[Continue for every task in the phase.]

## Verification [required]

What confirms the phase is done. Use concrete, observable checks.

- [ ] [check 1 — e.g., "App builds without errors on Android and iOS"]
- [ ] [check 2 — e.g., "`ZoomVideoSdkProvider` renders in component tree"]

## [Optional sections]

Add any of these between Verification and Out of Scope when relevant:

- **Risk Notes** — known risks or fragile areas for this phase.
- **Open Questions** — non-blocking questions the execution agent should
  resolve during implementation.
- **External Dependencies** — SDKs, services, credentials, or device
  requirements needed for this phase.

## Out of Scope [required]

Explicit list of work that belongs to later phases or is excluded.
Reference the phase number or spec section where it belongs.

- [item] → Phase [N] / Spec §[X]
```

## Structural rules

1. **One phase per plan.** Never combine phases.
2. **Spec traceability is required.** Every task must reference at least
  one spec step or section in its Description.
3. **Tasks must stay file-anchored.** Anchor each task to specific files
  in its Description or Produces field.
4. **`Depends on` is required.** Use `Nothing` only when the task can
  start immediately.
5. **Use concise descriptions.** Prefer a short opener plus actionable
  bullets. If the task truly has one thing to do, one short paragraph is
  acceptable.
6. **Do not put implementation detail in the plan.** No code snippets,
  pseudo-code, or step-by-step implementation sequences.
7. **Expose safe parallel work.** Do not invent dependencies when two
  tasks can proceed independently.

## After writing the plan

Summarize:
- Whether all prerequisites are satisfied and any blocker that remains.
- The task count and high-level task IDs.
- Which tasks can start immediately and which wait on dependencies.

Do not start implementation.