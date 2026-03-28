# Code Review Expected Outputs

## Overview

Provide a structured and comprehensive report that human partners and other agents can quickly understand and act on.

Keep the overall report structure the same:

- `# Current Implementation Overview`
- `# Issues Found and Suggestions`
- `# Summary`
- `# Implementation Plan`

## Review Report

After performing a code review and finalizing it, the report should include:

- A clear categorization of issues found: Critical (must fix), Important (should fix), or Suggestions (nice to have).
- Specific examples and actionable recommendations for each finding.
- The smallest relevant code snippet for each finding, plus file path and line references when available.
- A summary of the overall code quality, highlighting strengths and areas for improvement.
- An implementation plan broken into manageable tasks that are ready for handoff to the implementation agent.

## Quality Reviewer Output

When the **Quality Reviewer** agent responds in chat:

- Use the shared report structure described in this document.
- Focus on findings that materially improve correctness, maintainability, security, performance, or architectural fit.
- Prefer concise evidence over large code dumps.
- If no material issues are found, keep the same structure and state that clearly in the review.

## Reviewer Group File Output

When the **Reviewer Group** agent produces the final review file:

- Save it as `docs/review-report/code-review-report-<file name>.md`.
- Use the same shared report structure described in this document.
- Consolidate overlapping feedback from peer reviewers into a single, stronger finding.
- Keep disagreements or uncertainty inside the explanation for a finding instead of duplicating issues.
- Only include version or build metadata when it is confidently available from the repository or user context.

Add YAML front matter with the following structure:

```md
---
name: Code Review Report - <file name>
review-date: <DD-MM-YYYY>
reviewed-file: <file path>
project-version: <optional version or build info>
---
```

## Finding Guidance

- Start each issue title with the severity, for example: `## Issue 1 (Important): <brief description>`.
- Quote only the smallest relevant snippet needed to explain the issue.
- Explain why the issue matters in this project, not only in general.
- Make recommendations actionable and testable.
- When suggesting code, prefer a focused example over a full-file rewrite unless a broad rewrite is necessary.

## Severity Rubric

Classify findings into the following categories based on their impact on the project:

- **Critical (must fix)**  
  Use this when the issue creates a clear correctness, security, stability, or major architecture risk that should be resolved before the change is accepted.

- **Important (should fix)**  
  Use this when the issue meaningfully affects maintainability, clarity, performance, testability, or long-term project fit, but is not severe enough to block all progress.

- **Suggestions (nice to have)**  
  Use this for lower-risk improvements, polish, or refactors that would improve the code but are not necessary for correctness or safe delivery.

For every finding:

- Provide a specific example from the code.
- Give an actionable recommendation.
- Explain whether a plan deviation is problematic or beneficial when relevant.
- Include a code example when it meaningfully clarifies the recommendation.

## No Findings Case

If no material issues are found:

- Keep the same report structure.
- In `# Issues Found and Suggestions`, write `No material issues found.`
- In `# Implementation Plan`, write `No implementation changes required.` unless follow-up verification is still useful.

## Example Report Structure

```md
# Current Implementation Overview
A brief overview of the code reviewed, its purpose, and context within the project.

Summarize the current implementation, its quality, and its adherence to project standards. Highlight both strengths and weaknesses that lead to your findings.

# Issues Found and Suggestions
## Issue 1 (Important): <Brief Description of the Issue>
**Location:** `<file path>:<line or line range>`

<Smallest relevant code snippet of the issue>

### Suggestion
<Focused code snippet of the suggested change>

### Explanation
Provide a detailed explanation of why this change is suggested, its benefits, and any potential impacts on the project.

## Issue 2 (Suggestion): <Brief Description of the Issue>
continue this section for each issue found

# Summary
Summarize the overall code quality, highlighting strengths and areas for improvement.

# Implementation Plan
Provide a step-by-step implementation plan for the suggested changes, broken down into manageable tasks.

```
