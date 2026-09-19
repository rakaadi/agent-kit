# Agent Kit

Agent Kit packages reusable instructions and supporting artifacts that guide coding agents through software-engineering work.

## Language

**Human Review Focus**:
An advisory pointer to a narrow part of an agent implementation where human judgment is especially valuable. It does not affect task acceptance, verification, review gates, or completion.
_Avoid_: Human review gate, human-owned check, required human review

**Explainer**:
An evidence-grounded agent role that describes the codebase as it currently exists without evaluating it or recommending changes.
_Avoid_: Documentarian, critic, consultant

**Complexity Signal**:
A complexity diagnostic that cues assessment without itself establishing a defect or remediation obligation.
_Avoid_: Complexity defect, must-fix warning

**Review Finding**:
A reviewer-proposed defect or improvement with an affected invariant, concrete consequence, potential severity, and validation recipe. It remains a hypothesis until its validation state establishes otherwise.
_Avoid_: Fix instruction, accepted defect

**Actionable Finding**:
A Confirmed Critical or Important Review Finding that is within the authorized scope, or a selected Suggestion with sufficient evidence for its proposed change.
_Avoid_: Unverified finding, raw diagnostic, complexity score

**Validation State**:
The evidence status of a Review Finding, tracked independently from its potential severity: Confirmed, Strongly Supported, Unverified, Rejected, Ambiguous, or Requires External Decision.
_Avoid_: Severity, reviewer confidence score

**Finding Family**:
Related Review Findings concerning the same invariant and affected system boundary across review cycles.
_Avoid_: Shared wording, raw finding count

**Verification Result**:
The observed outcome of a check, evaluated against the applicable verification requirements separately from the review's judgment of code quality.
_Avoid_: Review verdict, architectural assessment
