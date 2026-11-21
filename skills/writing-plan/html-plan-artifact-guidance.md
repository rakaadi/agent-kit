# HTML Plan Artifact Guidance

Use the [Plan Artifact Skeleton](./example/plan-artifact-skeleton.html) as the standalone HTML scaffold. Consult the [Panel Reference](./example/plan-artifact-panel-reference.html) for field placement and a worked session handoff. Replace the illustrative feature, paths, dependencies, and checks with the approved work and repository evidence.

## Artifact and layout

- Write one HTML file using the skill’s [output rules](./SKILL.md#output-mode). When converting a separate source plan, retain its slug and link to it. Resolve links from the output location, using absolute paths when needed. Preserve decisions, risks, open questions, detailed instructions, and existing execution evidence.
- Use the skeleton’s embedded CSS and charcoal, parchment, ivory, and ink-blue palette. Keep the plan usable offline with JavaScript disabled. Use semantic headings, table headers, native disclosures, and stable fragment links. Highlight referenced rows with `:target` and retain field labels when rows stack on narrow screens.
- Follow the [HTML section order](./SKILL.md#required-plan-contract). Use Execution Metadata for the source requirement, baseline, and shared execution agreements. Link it to Progress Tracking. Add navigation anchors for substantive sections.
- Map affected paths to their responsibilities and owning tasks in File Structure. Mark existing, proposed, and conditional changes. Give shared constraints, design decisions, or risks their own section when several tasks depend on them.

## Progress Tracking

Keep one current checkpoint near the opening. Use the skill’s [progress fields and initial values](./SKILL.md#progress-tracking). Link executed task IDs to their ledger rows. At a partial stop, identify what changed, what was verified, and the first remaining action. If tasks can proceed in parallel, identify active assignments and available work.

Append dated execution records when there is evidence to retain. Identify the task, revision or environment, actual result, and remaining gaps. Link directly from the handoff or task. For a collapsible record, put its fragment ID on the content inside the disclosure so following the link reveals the evidence.

## Execution Flow

Derive the Mermaid graph from the ledger’s direct dependencies and label nodes with task IDs. Explain which work can proceed in parallel and which file ownership or prerequisite forces serial execution. Embed a rendered SVG, keep the Mermaid source in a native disclosure, and regenerate the rendering when dependencies change. Put runtime behavior diagrams in Architecture or the relevant design context.

## Task Ledger

Use one row per [reviewable task](./SKILL.md#task-structure), with the task ID as its HTML `id`. Keep task fields and instruction bullets on separate source lines for targeted reads and edits.

| Column | Content |
| --- | --- |
| Task / dependency | Show the ID, action-oriented title, and links to direct prerequisites. Use “Nothing” for a root task. Include a phase label when it explains sequencing. |
| Change and instructions | Keep the outcome and essential context visible. Place steps, reuse constraints, failure behavior, and any labeled illustrative diff inside native `<details>` with an `Instructions` summary. Show required skills beside the disclosure when applicable. Keep readiness blockers visible in the dependency or handoff text. |
| Produces | Name the changed files, evidence, or design artifact the task delivers. |
| Acceptance and review | State the observable completion condition and link to the applicable verification rows. For tasks meeting the [Human Review Focus criteria](./SKILL.md#human-review-focus), add a visible `Advisory Review` paragraph naming the surface, judgment, and limit of automated validation. |

## Verification Matrix

Give each check a stable row ID. Link its task scope back to the ledger and reuse one row for checks shared by multiple tasks. Record the command or required manual steps, any working directory or environment prerequisites, and the expected result. Keep final integration checks identifiable by scope. Record actual results in the handoff or dated execution record.
