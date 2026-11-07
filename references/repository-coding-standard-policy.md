# Repository Coding Standards — Authoring Policy

## Purpose

This policy governs how coding agents create, revise, and remove repository-specific coding standards.

Apply it across programming languages, frameworks, repositories, and coding-agent harnesses.

Coding standards preserve engineering intent that agents cannot reliably discover from source code, configuration, tooling, or established programming knowledge.

**Default to discovery over documentation. Preserve intent, not implementation summaries.**

The objective is the smallest reliable body of rules that prevents meaningful engineering mistakes.

## 1. Admission Criteria

Admit a standard when it communicates at least one of the following:

- **Invariant:** A correctness, security, operational, or architectural constraint that must remain true.
- **Decision:** An intentional engineering choice between plausible alternatives, especially when its rationale is not apparent in code.
- **Gotcha:** A non-obvious failure mode, incompatibility, or workaround that remains relevant.
- **Convention:** A repository-specific requirement where multiple valid approaches exist but consistency matters.
- **Boundary:** A responsibility, ownership, or abstraction boundary that implementations must respect.

An existing pattern is evidence of current behavior, not necessarily intended behavior.

Before admitting a rule, establish:

1. What decision or behavior should this rule influence?
2. What information does it provide beyond discoverable code, tooling, or existing documentation?
3. What failure, ambiguity, or meaningful engineering cost could result from omitting it?

Reject redundant rules and generic advice that do not change the agent's decisions.

Critical invariants may be documented proactively without waiting for a failure.

## 2. Content Selection

### Prefer

- Constraints with an explanation of their failure mechanism.
- Architectural decisions whose rationale is not visible in implementation.
- Lessons from verified defects, regressions, or compatibility problems.
- Intentional exceptions to common engineering practices.
- Ownership boundaries between components, modules, or systems.
- Canonical approaches when legacy and current patterns coexist.
- Testing requirements that preserve observable application contracts.
- Repository-specific assumptions that a reasonable implementation could otherwise violate.

### Exclude

- Tutorials or summaries of ordinary framework behavior.
- Catalogs of components, hooks, services, utilities, or modules.
- Restatements of scripts, configuration, dependency versions, or public APIs.
- General advice already understood by capable coding agents.
- Mechanical conventions already enforced by reliable tooling.
- Unverified assumptions inferred solely from repeated code patterns.
- Temporary implementation details without lasting consequences.
- Instructions duplicated in another authoritative reference.

Descriptive information may remain when it resolves genuine ambiguity or makes expensive discovery substantially easier.

Prefer a concise pointer to the authoritative source over copying its contents.

## 3. Rule Construction

Write each standard as an actionable engineering decision.

Use these elements when they add necessary information:

- **Rule:** State the desired behavior or constraint.
- **Rationale:** Explain why it exists, especially when the reason is non-obvious.
- **Scope:** Identify applicable modules, operations, or exceptions.
- **Reference:** Point to supporting code, tests, issues, or architectural decisions.

Co-locate a rule with its rationale, exceptions, and relevant examples.

Prefer affirmative instructions describing the correct behavior. Use explicit prohibitions for hard guardrails, paired with the required alternative when possible.

Avoid rigid templates for individual rules. A precise sentence is sufficient when it communicates the complete requirement.

Include code examples only when they distinguish acceptable behavior from a plausible incorrect implementation.

### Example

Less useful:

> Use the project's custom error handler for API errors.

More useful:

> Authentication failures are owned by the session layer. Feature-level handlers must preserve the original failure and leave credential invalidation to that layer.
>
> Concurrent session transitions can otherwise produce inconsistent authentication state.
>
> Reference: the authoritative session error-handling implementation.

The second rule establishes ownership, explains a failure mechanism, and directs the agent toward the relevant implementation.

Examples in this policy are illustrative, not universal coding requirements.

## 4. Evidence and Authority

Distinguish verified requirements from inferred conventions.

Existing implementation, repeated patterns, and agent preference do not independently establish engineering intent.

Prefer evidence from:

- Explicit maintainer decisions and approved requirements.
- Reproducible defects, regressions, and incident findings.
- Architectural decisions and established system contracts.
- Tests demonstrating intended behavior.
- Relevant implementation and configuration.
- Maintainer clarification when intent remains ambiguous.

Evaluate the quality of evidence according to the risk of the proposed rule.

### Evidence Tiers

**Tier 1 — Critical constraints**

Includes security boundaries, data integrity, authentication, irreversible operations, and other high-consequence behavior.

Require authoritative evidence, reproducible findings, or explicit human confirmation.

Document the relevant failure mechanism and scope. Escalate unresolved uncertainty before making the rule authoritative.

**Tier 2 — Architectural and behavioral constraints**

Includes module ownership, error contracts, state-management boundaries, testing philosophy, and compatibility requirements.

Require a traceable engineering decision or supporting evidence sufficient to distinguish intended behavior from incidental implementation.

Escalate conflicting or ambiguous intent.

**Tier 3 — Local conventions and clarifications**

Includes low-risk naming conventions, preferred patterns, and clarifications of already established standards.

Accept consistent repository evidence when the change does not introduce a new architectural obligation or materially restrict alternatives.

Do not invent rationale where none is established.

The tiers govern evidence requirements, not document placement. A high-risk requirement may be better enforced through executable checks while its rationale remains in coding standards.

## 5. Agent Autonomy and Approval

Use risk-based autonomy when maintaining standards.

### Agents May Apply Independently

- Correct inaccurate references when the authoritative source is clear.
- Remove exact duplicates and demonstrably obsolete descriptions.
- Improve wording without changing a rule's scope or meaning.
- Consolidate equivalent instructions without losing constraints.
- Add low-risk clarifications supported by existing approved decisions.
- Replace duplicated implementation descriptions with authoritative pointers.

These changes must preserve engineering intent and be included in the final change summary.

### Human Approval Required

- Introducing or changing security, privacy, or data-integrity constraints.
- Establishing new architectural boundaries or significant engineering conventions.
- Changing the accepted behavior of public interfaces.
- Reversing or weakening an established invariant.
- Removing a rule whose necessity remains uncertain.
- Resolving conflicting architectural decisions.
- Introducing requirements with significant migration or maintenance costs.

For changes requiring approval, prepare a proposal that states the intended rule, evidence, affected scope, and consequences.

Leave existing authoritative requirements unchanged until approval is obtained.

**Agent autonomy applies to maintaining established intent, not inventing engineering policy.**

## 6. Enforcement and Information Placement

Place each requirement where it can be maintained and enforced most reliably.

| Information | Preferred source |
| --- | --- |
| Existing implementation behavior | Source code |
| Commands and configuration | Project environment and configuration |
| Deterministic requirements | Types, linting, tests, and CI |
| Engineering judgments and invariants | Coding standards |
| Significant architectural decisions | Architecture Decision Records (ADRs) |
| Ordered development procedures | Agent skills or workflow instructions |
| Repository navigation | `AGENTS.md`, `CLAUDE.md`, or equivalent entry points |

A requirement may have both an executable check and a documented rationale. Keep the check authoritative for enforcement and avoid duplicating its configuration.

Maintain one authoritative source for each meaning.

### Context Pointers

Load coding standards when a task requires their constraints or engineering judgments.

A context pointer must communicate:

1. What the referenced material provides.
2. Which distinct task conditions require loading it.

For example:

> When implementing or reviewing changes to authentication, API errors, or session state, read the applicable repository coding standards before making design decisions.

Keep pointers short and specific enough to trigger reliable retrieval.

Use progressive disclosure: keep broadly applicable instructions accessible, and place specialized rules behind references reached only by relevant tasks.

Split documents when distinct scopes or workflows justify separate loading. Avoid splitting merely to reduce the apparent length of a file.

A critical rule must be available before an agent makes decisions that could violate it.

## 7. Human Engineering Responsibilities

Human engineers retain authority over ambiguous or consequential engineering intent.

When reviewing proposed standards, consider:

### Intent

- Does this preserve an intentional requirement or merely existing behavior?
- Is the underlying decision still applicable?
- Does the rule express an actual engineering need?

### Trade-offs

- What reasonable alternatives does the rule restrict?
- Could it obstruct beneficial refactoring?
- Is its scope broader than the failure it addresses?

### Evidence

- Is the rationale supported by actual behavior, approved decisions, or reliable findings?
- Does the proposed rule address the demonstrated problem?
- Are there exceptions the agent has overlooked?

### Maintenance

- Can the requirement be enforced mechanically?
- Does it duplicate another source?
- What future change would make the rule obsolete?
- Is its long-term maintenance cost justified?

Human approval should evaluate the engineering decision, not merely the wording.

## 8. Maintenance and Pruning

Treat coding standards as maintained decisions, not an append-only record.

Reevaluate rules when:

- Relevant architecture or implementation changes.
- Dependencies, platforms, or underlying assumptions change.
- Defects reveal an incomplete or incorrect rule.
- An executable check replaces prose-based enforcement.
- Agent behavior suggests a rule is ineffective or ambiguous.
- A rule repeatedly adds context without improving decisions.

Assign each reviewed rule one disposition:

- **Keep:** Necessary, supported, and applicable.
- **Revise:** Valid intent with outdated or unclear expression.
- **Relocate:** Better maintained in another authoritative source.
- **Remove:** Obsolete, redundant, unsupported, or behaviorally ineffective.
- **Escalate:** Requires an engineering decision or stronger evidence.

Preserve historical rationale in an ADR or other suitable record when its history remains valuable but its instruction no longer applies.

### No-op Test

Ask whether removing the instruction would materially change the agent's behavior or engineering outcome.

Evaluate uncertain cases against representative tasks where practical. Do not assume a rule is valuable simply because it sounds reasonable.

A no-op candidate should be removed or strengthened, depending on whether its intended constraint is still necessary.

Do not remove critical safeguards solely because a small number of agent runs happened to comply without them.

## 9. Agent Authoring Workflow

Follow this process when creating or revising repository standards.

### Step 1 — Discover

Inspect the applicable standards, code, tests, configuration, architectural records, and workflow instructions.

Identify the authoritative sources relevant to the requested scope.

**Complete when:** Relevant existing requirements and potential conflicts have been identified, or any discovery limitations are recorded.

### Step 2 — Classify

Classify candidate information as invariants, decisions, gotchas, conventions, boundaries, or discoverable implementation facts.

Separate verified intent from inference.

**Complete when:** Every candidate has a classification and a reason to retain, relocate, remove, or investigate it.

### Step 3 — Validate

Assess each candidate's evidence and consequence using the risk tiers.

Investigate contradictory implementations and obsolete assumptions.

**Complete when:** Every candidate has sufficient supporting evidence for its tier, or its uncertainty is explicitly identified.

### Step 4 — Route

Choose the appropriate destination: standards, executable checks, ADRs, workflow instructions, navigation references, or removal.

Preserve authoritative sources and avoid duplicated meanings.

**Complete when:** Every candidate has a destination and no avoidable source-of-truth conflict remains.

### Step 5 — Write

Write actionable rules with the minimum necessary rationale, scope, and references.

Group related constraints together. Keep exceptions beside the rules they qualify.

Use context pointers for material relevant only to specific tasks.

**Complete when:** Each rule communicates a decision an agent can apply without relying on unstated assumptions.

### Step 6 — Prune

Evaluate each added or retained instruction for redundancy, staleness, unnecessary exposition, and no-op behavior.

Remove unsupported or obsolete content according to the approval requirements.

**Complete when:** Every retained instruction has a defensible purpose and unnecessary duplication has been eliminated.

### Step 7 — Reconcile

Compare the proposed document with existing standards and authoritative sources.

Apply independently authorized changes. Present consequential or uncertain changes for human approval.

**Complete when:** All candidates have recorded dispositions, applied changes preserve approved intent, and outstanding decisions are explicitly identified.

## 10. Final Verification

Before declaring the authoring task complete, verify:

- Every retained rule satisfies an admission criterion.
- Every rule has evidence appropriate to its risk.
- Engineering intent is not inferred solely from implementation frequency.
- No rule unnecessarily duplicates discoverable facts or executable checks.
- Rules, rationale, exceptions, and references are coherently grouped.
- Relevant context pointers specify when the material must be loaded.
- Critical constraints are available before decisions that could violate them.
- Every proposed addition, revision, relocation, or removal has been reconciled.
- Changes requiring human approval remain proposals until approved.
- The resulting document is concise enough for its intended scope without omitting necessary constraints.

Report the changes applied, rules removed or relocated, evidence limitations, and decisions requiring human approval.

Do not claim completion of unresolved approval-dependent changes.

## Governing Principle

**Code is the source of truth for what exists. Coding standards preserve what must remain true and why.**

When implementation and documented intent disagree, investigate the discrepancy rather than silently treating either as authoritative.

The value of a coding standard is measured by the engineering decisions it improves, the mistakes it prevents, and the maintenance cost it justifies—not its length or coverage.
