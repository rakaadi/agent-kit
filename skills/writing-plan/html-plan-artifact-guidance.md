# HTML Plan Artifact Guidance

Use this guide when a plan request should produce `plan-${implementation-task}.html` instead of `plan-${implementation-task}.md`. Example: `plan-firebase-services.html` instead of `plan-firebase-services.md`.

## Why HTML

HTML is for visual clarity, denser information layout, easier sharing, and keeping humans engaged with the plan. It is not an excuse to replace concrete implementation detail with a polished summary.

Use HTML when the plan benefits from one or more of these:

- Dense task lists that are easier to scan as cards, tables, or a roadmap.
- Locked decisions, file inventories, or module shapes that read better as structured panels.
- Visual explanations such as dependency flow, phased rollout, or system boundaries.
- A shareable artifact that should open cleanly in a browser without a Markdown renderer.

## Canonical Example Files

Use these files as the structural contract before inventing a new HTML layout:

- `./example/plan-artifact-skeleton.html` for the full-page scaffold, stable panel order, repeated class structure, and task-card anatomy.
- `./example/plan-artifact-panel-reference.html` for the extracted purpose of each panel and the content that should remain visible inside it.

Default to extending the skeleton instead of redesigning the artifact from scratch. The examples are intentionally closer to the current Firebase artifact shape so agents can keep output consistent across plans.

Example architectures, APIs, phases, and migration sequences are illustrative. Derive the technical approach from the request and repository evidence. Apply the decision, readiness, and verification rules in `SKILL.md`: distinguish confirmed constraints from proposals and pending design, and record a decision as locked only with an explicit requirement, established constraint, or approval.

## Output Rules

- Write a single `plan-${implementation-task}.html` file using a kebab-case task slug and the output-directory rules in `SKILL.md` (OS temporary directory unless the human requests another directory). Example: `plan-firebase-services.html`. HTML may be the sole plan artifact. When converting an existing plan, retain its slug and reference that source; create both formats only when explicitly requested. Resolve source links from the output location, using absolute paths when needed.
- Load Tailwind from the CDN (`<script src="https://cdn.tailwindcss.com"></script>`) for styling. Use `<style type="text/tailwindcss">` with `@apply` to define reusable component patterns. Keep any remaining custom CSS minimal and embedded.
- Use JavaScript for Mermaid rendering and lightweight readability features such as section collapse, table-of-contents highlighting, or phase filtering.
- Tailwind and Mermaid CDN runtimes are the default remote assets; keep other assets embedded and avoid build steps. A single HTML file still depends on network access or cache for these runtimes.
- Render Execution Flow with Mermaid task dependencies. Keep the graph source in the HTML and visible sequencing notes nearby so failed CDN loading or disabled JavaScript does not remove dependency meaning.
- If the diagram becomes dense enough that static rendering hurts readability, a CDN-hosted Panzoom runtime is acceptable for drag, wheel-zoom, pinch-zoom, and reset interactions on Mermaid-rendered SVGs.
- Keep the document readable with JavaScript disabled.
- Make the layout responsive enough for desktop and mobile review.
- Lean the page chrome toward a darker surrounding background when it improves contrast, while keeping the content panels lighter for visual distinction.
- Prefer a utilitarian technical-document look over a presentation or marketing-page aesthetic.
- Reuse the section order, panel hierarchy, and task-card structure from `./example/plan-artifact-skeleton.html` unless the source plan truly needs an extra panel.

## Semantic Contract

The HTML artifact must preserve the same implementation-ready content as the Markdown contract.

Required visible content:

1. Feature title
2. Goal
3. Architecture
4. File structure or file inventory
5. Execution flow
6. Dependency-aware tasks
7. Verification Matrix
8. Progress tracking
9. Out of scope

If the source plan includes them, also preserve:

- Locked decisions
- Current-state hotspots
- Planned public surface
- Important boundaries
- Risks or open questions

When in doubt, keep the section arrangement aligned with `./example/plan-artifact-skeleton.html` and treat `./example/plan-artifact-panel-reference.html` as the explanation of what each panel is for.

## Extension Rules

- Keep the header summary, table of contents, execution flow, task sections, verification, and out-of-scope sections as first-class reading surfaces.
- Render `Progress Tracking` as its own visible section between `Verification Matrix` and `Out of Scope`.
- Use the same field labels as the Markdown contract: `Current status`, `Started on`, `Completed on`, `Last executed tasks`, `Current blocker or next focus`, and `Unplanned necessary work` when present.
- Merge dependency flow and sequencing into one `Execution Flow` section when they describe the same rollout story.
- Label Mermaid nodes with task IDs and keep runtime behavior diagrams in Architecture or the relevant design context.
- Every task block should show Task ID, Title, Description, Produces, and Acceptance.
- Follow `SKILL.md` for one-to-three-sentence descriptions and selective annotated diffs. Render illustrative diffs in readable `<pre>` blocks, with constraints and other actionable instructions alongside them. Keep ordinary bullets or checklists when clearer.
- Keep verification commands, expected results, and required manual checks exclusively in the plan-level `Verification Matrix`, keyed by task ID or integration scope; omit per-task Verification fields and run-command bullets.
- Dependency information should appear exactly once. Prefer a top-of-card dependency chip or label instead of repeating the same `Depends on` value again inside the lower metadata grid.
- When a task has a Human Review Focus, place a `Human Review Focus` pill after the dependency pill and show its full focus in a content box beside `Produces` and `Acceptance`. Use a responsive three-column row, give the focus slightly more room, and stack the boxes on narrow screens. Omit the pill and box when no focus applies.
- Keep each Human Review Focus advisory and precise: name the narrowest stable implementation surface, the judgment the human should apply, and why agent or automated validation is insufficient. Show at most three focus items.
- Keep unresolved material decisions in prerequisites and explicitly required human checks in verification, separate from advisory focus content.
- Optional affordances such as collapsible sections, phase filters, or diagram pan and zoom are acceptable only when they improve readability without hiding required content.

## Content Preservation Rules

- Do not compress a plan into an executive summary only.
- Do not remove low-level task instructions just because a visual summary exists.
- Do not replace exact file paths or commands with prose descriptions.
- Do not make critical information available only through hover states or JavaScript interactions.
- If you summarize a section visually, keep the detailed version visible nearby.
