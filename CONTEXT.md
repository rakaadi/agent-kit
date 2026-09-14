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

**Actionable Finding**:
A review conclusion supported by evidence of a concrete consequence and an appropriate remediation. Its severity distinguishes required correction from optional improvement.
_Avoid_: Raw diagnostic, complexity score

**Verification Result**:
The observed outcome of a check, evaluated against the applicable verification requirements separately from the review's judgment of code quality.
_Avoid_: Review verdict, architectural assessment
