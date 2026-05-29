# Plan Document Reviewer Prompt Template

Use this template when dispatching a plan document reviewer subagent.

**Purpose:** Verify the plan artifact is complete, matches the spec, and has proper task decomposition.

**Dispatch after:** The complete plan is written.

```md
Task tool (general-purpose):
  description: "Review plan document"
  prompt: |
    You are a plan document reviewer. Verify this plan artifact is complete and ready for implementation.

    **Plan to review:** [PLAN_FILE_PATH]
    **Spec for reference:** [SPEC_FILE_PATH]

    The plan may be written as Markdown or as a self-contained HTML artifact.
    Review the semantic plan content first. If the file is HTML, treat layout,
    cards, tables, and sections as alternate presentation of the same plan
    contract rather than as a separate deliverable.

    ## What to Check

    | Category | What to Look For |
    |----------|------------------|
    | Completeness | TODOs, placeholders, incomplete tasks, missing steps |
    | Spec Alignment | Plan covers spec requirements, no major scope creep |
    | Task Decomposition | Tasks have clear boundaries, steps are actionable |
    | Buildability | Could an engineer follow this plan without getting stuck? |
    | Format Fidelity | If HTML, all implementation-critical sections remain visible and no key detail is hidden behind presentation or omitted during summarization |

    ## Required Plan Contract

    Approve only if the artifact exposes clear equivalents of the following:

    - Feature title
    - Goal
    - Architecture
    - Tech stack
    - File structure or file inventory
    - Dependency-aware tasks
    - Verification
    - Out of scope

    ## Calibration

    **Only flag issues that would cause real problems during implementation.**
    An implementer building the wrong thing or getting stuck is an issue.
    Minor wording, stylistic preferences, and "nice to have" suggestions are not.

    If the file is HTML, do not block approval over visual taste, color choices,
    or layout preferences unless the presentation obscures or removes required
    implementation detail.

    Approve unless there are serious gaps — missing requirements from the spec,
    contradictory steps, placeholder content, tasks so vague they can't be acted on,
    or an HTML presentation that summarizes away required task metadata.

    ## Output Format

    ## Plan Review

    **Status:** Approved | Issues Found

    **Issues (if any):**
    - [Task X, Step Y]: [specific issue] - [why it matters for implementation]

    **Recommendations (advisory, do not block approval):**
    - [suggestions for improvement]
```

**Reviewer returns:** Status, Issues (if any), Recommendations
