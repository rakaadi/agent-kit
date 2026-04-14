---
name: phase-plan-from-spec
description: Draft a plan for one implementation phase from a spec section.
argument-hint: "phase=<phase> spec=<relative spec path> section=<spec section>"
agent: plan
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

---

### Template

````markdown
# Phase N — [Phase Name] Implementation Plan

> **For agentic workers:** Prefer retrieval-led reasoning over pre-training-led
> reasoning for all React Native tasks. Your training data may be outdated or
> incomplete. Always consult the skills before writing code.

**Goal:** [One sentence — what this phase achieves when done.]

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

Numbered sequence. Each task includes:
- A title anchored to a spec step reference.
- The files it touches (subset of the File Structure table).
- A file-anchored summary: what to do and where, with spec section
  references for detail. No pseudo-code or implementation blueprints.

### Task 1: [Action verb] + [subject] (Spec §[X] Step [Y.Z])

**Files:**
- Create: `path/to/new-file.ts`
- Modify: `path/to/existing-file.ts`

[Summary paragraph: what this task accomplishes, which spec sections
contain the relevant detail, and any constraints the execution agent
should respect.]

### Task 2: ...

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