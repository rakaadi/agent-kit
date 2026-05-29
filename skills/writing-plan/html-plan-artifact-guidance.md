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

## Output Rules

- Write a single self-contained `plan-${implementation-task}.html` file, using the same kebab-case task slug as the source Markdown plan. Example: `plan-firebase-services.html`.
- Load Tailwind from the CDN (`<script src="https://cdn.tailwindcss.com"></script>`) for styling. Use `<style type="text/tailwindcss">` with `@apply` to define reusable component patterns. Keep any remaining custom CSS minimal and embedded.
- Use JavaScript only for lightweight readability features such as section collapse, table-of-contents highlighting, or phase filtering.
- Tailwind CDN is the only permitted remote asset by default. Avoid all other remote scripts, remote stylesheets, or build steps.
- If the user explicitly asks for a higher-fidelity diagram renderer, a CDN-hosted Mermaid runtime is acceptable for the execution-flow section as long as nearby text notes or a fallback still preserve the sequencing meaning.
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
4. Tech stack
5. File structure or file inventory
6. Dependency-aware tasks
7. Verification
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
- Render `Progress Tracking` as its own visible section between `Verification` and `Out of Scope`.
- Use the same field labels as the Markdown contract: `Current status`, `Started on`, `Completed on`, `Last executed tasks`, `Current blocker or next focus`, and `Unplanned necessary work` when present.
- Merge dependency flow and sequencing into one `Execution Flow` section when they describe the same rollout story.
- A Mermaid diagram is a good fit when it materially improves readability over an improvised ASCII diagram, but keep nearby text so the sequencing meaning survives without the graphic.
- Every task block should show Task ID, Title, Description, Produces, and Acceptance.
- Dependency information should appear exactly once. Prefer a top-of-card dependency chip or label instead of repeating the same `Depends on` value again inside the lower metadata grid.
- Optional affordances such as collapsible sections, phase filters, or diagram pan and zoom are acceptable only when they improve readability without hiding required content.

## Content Preservation Rules

- Do not compress a plan into an executive summary only.
- Do not remove low-level task instructions just because a visual summary exists.
- Do not replace exact file paths or commands with prose descriptions.
- Do not make critical information available only through hover states or JavaScript interactions.
- If you summarize a section visually, keep the detailed version visible nearby.
