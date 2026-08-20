---
name: program-design
description: Design the code shape before implementation for substantial features or refactors that introduce or reshape modules, interfaces, types, file layout, or control flow. Use before writing code when meaningful structural choices remain; skip small fixes and mechanical edits.
---

# Program Design

Turn an agreed task or implementation plan into a reviewable code shape before writing implementation code. Align the human and agent on the interfaces and flow that would otherwise be decided implicitly during code review.

## Establish The Design Boundary

Use this skill after the goal and relevant system architecture are settled. Read the complete request or plan, repository instructions, and the surrounding code that establishes current conventions.

Apply the design gate when the work introduces or substantially reshapes modules, interfaces, types, file layout, dependencies, or control flow. Small fixes, local implementation changes, and mechanical edits can proceed without it.

If repository evidence shows that the agreed architecture cannot support a clean implementation, stop and explain the smallest upstream decision that must change. Do not silently redesign the architecture or force the work into an unsuitable shape.

## Evaluate Internally

Before presenting the proposal, evaluate whether it:

- follows explicit repository instructions and established surrounding patterns;
- gives each module a clear responsibility and keeps caller-facing interfaces small;
- places seams where behavior actually varies and keeps dependency direction legible;
- makes important invariants, error modes, and ownership clear at the interface;
- supports testing through the same interfaces callers use;
- avoids shallow pass-through modules, god classes or functions, speculative abstractions, and unnecessary defensive paths.

Explore credible alternatives internally. Present one recommended design unless a genuine tradeoff requires a human decision.

This evaluation is a filter, not a review report. Expose only the rationale needed to understand the proposed shape or resolve a material conflict.

## Present The Code Shape

Keep the proposal at interface-level pseudocode. Omit function bodies, detailed algorithms, and line-by-line implementation steps.

Present the applicable views:

1. **Design constraints:** Briefly state the repository evidence, responsibilities, invariants, or error behavior that materially shaped the proposal.
2. **File-tree diff:** Always show affected files using diff markers and a short responsibility for every new or modified file.
3. **Key types and interfaces:** Always show the important language-appropriate types and function or class signatures. Include only fields and methods needed to judge the contract.
4. **Call-stack trees:** Show these for orchestration or control-flow changes. Prefer lightweight text trees and diff markers when the change from the current flow matters.
5. **Test seams:** Include test-file placement in the file tree and identify the interface or seam each test exercises. Leave detailed test cases to implementation unless they affect the design.

Present the proposal in the conversation by default. Update a plan or another persistent artifact only when the user requests it or the active artifact already designates a program-design section.

## Hold The Approval Gate

Ask the user to approve the proposed code shape before implementation. Questions, silence, or partial agreement keep the gate open. If the user requests changes, revise the affected views and ask again.

After explicit approval, continue the original implementation task without another confirmation. If later repository evidence forces a material deviation, pause implementation, present only the affected design delta and its evidence, and obtain approval before continuing.
