# HTML Plan Artifact Guidance

For HTML output, use this guide with [SKILL.md](./SKILL.md). HTML supports dense task lists, structured decisions and file inventories, visual explanations, and browser sharing. Preserve the full execution detail in that layout.

## Scaffold

Before writing, read both examples:

- [Plan Artifact Skeleton](./example/plan-artifact-skeleton.html): full-page scaffold, panel order, reusable classes, and task-card anatomy.
- [Plan Artifact Panel Reference](./example/plan-artifact-panel-reference.html): each panel's purpose and visible content.

Extend the skeleton by default. Add a panel only for content that needs its own section. Example architectures, APIs, phases, and migration sequences are illustrative; derive the technical approach from requirements and repository evidence. Apply [scope and decision rules](./SKILL.md#scope-and-file-structure) and [readiness criteria](./SKILL.md#readiness) from the skill.

## Artifact and Runtime

- Write one `plan-${implementation-task}.html` file with a kebab-case slug, following the skill's [output rules](./SKILL.md#output-mode). For conversions, retain the source slug and link to the source plan. Resolve source links from the output location, using absolute paths when needed. Produce both formats only when explicitly requested.
- Load Tailwind from `<script src="https://cdn.tailwindcss.com"></script>`. Define reusable components with `@apply` in `<style type="text/tailwindcss">`; keep other CSS minimal and embedded.
- Use JavaScript for Mermaid and lightweight readability features such as section collapse, table-of-contents highlighting, or phase filtering.
- Use Tailwind and Mermaid CDN runtimes as the default remote assets; embed other assets and keep the artifact free of build steps. These runtimes require network access or cache even in a single-file artifact.
- For dense Mermaid SVGs, a CDN-hosted Panzoom runtime may provide drag, wheel-zoom, pinch-zoom, and reset controls.
- Keep required content readable with JavaScript disabled. Optional controls should improve readability while preserving access to that content.
- Support desktop and mobile review with a utilitarian technical-document layout.
- Apply the [Kami color palette](https://github.com/tw93/Kami/blob/main/skills/kami/CHEATSHEET.md#color) while retaining light cards on a dark background: charcoal chrome (`#141413`, `#30302e`), parchment panels (`#f5f4ed`), ivory cards (`#faf9f5`), warm ink (`#141413`, `#3d3d3a`, `#504e49`), and warm borders (`#d8d5c8`, `#e5e3d8`). Use ink-blue (`#1b365d`) as the single accent, sparingly, with solid badge tints (`#e4ecf5`); use warm neutral fills for other badges and inline code (`#f0eee6`, `#e8e6dc`). Carry these colors into Mermaid and code blocks, with light text on dark code surfaces. Preserve the scaffold's typography, spacing, and structure.

## Panels and Content

Follow the skill's [required section order](./SKILL.md#required-plan-contract), using the skeleton's panel hierarchy. Keep the header summary, table of contents, execution flow, tasks, verification, progress, and scope boundaries visible as primary reading surfaces.

When converting a source plan, also preserve any locked decisions, current-state hotspots, planned public surface, important boundaries, risks, and open questions. Extend the matching panel; add a section only for distinct content.

Keep exact paths, commands, low-level task instructions, and detailed counterparts of visual summaries visible nearby. Required detail must remain accessible without hover or JavaScript interactions.

### Execution Flow

Render task dependencies with Mermaid and task IDs, retaining graph source in the HTML and readable sequencing notes nearby. Those notes must preserve dependency meaning when CDN loading or JavaScript is unavailable. Combine dependency flow and sequencing in one section when they describe the same rollout. Keep runtime behavior diagrams in Architecture or the relevant design context.

### Task Cards

Render the skill's [task contract](./SKILL.md#task-template) as visible fields in cards, tables, or sections:

- Show Task ID, Title, Description, dependency, Produces, Acceptance, and any required skills.
- Show dependency metadata once within each card, preferably as a top-of-card chip or label.
- Render illustrative annotated diffs in readable `<pre>` blocks with actionable constraints alongside them; use bullets or checklists when clearer.
- Keep commands, expected results, and required manual checks in the plan-level [Verification Matrix](./SKILL.md#verification-matrix).

Apply the skill's [Human Review Focus rules](./SKILL.md#human-review-focus). For a qualifying task, place a `Human Review Focus` pill after its dependency pill and show the focus in a content box beside `Produces` and `Acceptance`. Use a responsive three-column row, give the focus slightly more room, and stack boxes on narrow screens. Omit both pill and box when no focus applies.

### Progress Tracking

Render [Progress Tracking](./SKILL.md#progress-tracking) as its own visible section between `Verification Matrix` and `Out of Scope`. Use the skill's field labels and initial values, including `Unplanned necessary work` only when applicable.
