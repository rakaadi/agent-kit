# Project Convention

<!--
Keep repository-specific constraints, non-obvious conventions, and useful
entry points here. Omit sections that do not apply to the project.
Use configuration files for detailed settings and reference documents for
area-specific guidance. Remove authoring comments and unused placeholders
from the finished AGENTS.md.
-->

## Project Overview

<!--
Briefly describe the project's purpose, users, and supported platforms.
Include domain context that affects implementation decisions.
-->

## Stack And Runtime

<!--
Summarize the main framework and runtime. Record important compatibility
constraints and exceptions. Point to manifests and configuration for exact
dependency versions, compiler settings, and build configuration.
-->

## Dependency And Compatibility Policy

Use APIs and patterns compatible with the project's dependency versions and
supported platforms. Check official documentation when introducing unfamiliar
APIs or when compatibility is uncertain. Keep dependency upgrades and pattern
migrations within the requested scope.

<!--
Add project-specific compatibility requirements or dependency restrictions.
-->

## Package Manager

<!--
Name the required package manager, the source of its version requirement,
and lockfile expectations. Document enforcement only where it exists.
-->

## Commands

<!--
List validated commands for common work: setup, development, linting,
typechecking, tests, and builds. Include non-obvious prerequisites and
important side effects.

Use the smallest valid check that covers the affected behavior. A targeted
command must retain the configuration needed to produce meaningful results;
use a project-wide check when the tooling requires it.
-->

## Code Style

<!--
Point to formatting and lint configuration. Record conventions those tools
do not enforce, such as naming, file placement, generated-file handling,
and project-specific styling requirements.
-->

## Architecture And Code Patterns

<!--
State the short ownership boundaries and invariants that guide changes.
Examples: which module owns session state, where endpoints belong, and
whether an existing pattern is required, transitional, or opt-in.

Keep detailed patterns and examples in the Reference Documents below.
-->

## Navigation And Runtime Architecture

<!--
Optional. Record important routing, bootstrap, lifecycle, or platform
boundaries. Keep detailed route maps and debugging guidance in references.
-->

## Testing And Verification

<!--
State project-specific validation requirements and when they apply.
Identify checks required for high-risk behavior, device or service
prerequisites, and any human verification that automated checks cannot
replace. Keep detailed testing conventions in the relevant reference.
-->

## Agent Skills

<!--
Include only skills that this project specifically requires for the stated
work. Use precise task conditions and names available in the target agent
environment. Add or remove rows as needed; omit this section if unnecessary.
-->

| When applicable | Skill |
| --- | --- |
| <Specific task or condition> | `<available-skill-name>` |

## Reference Documents

Consult the relevant reference before changing behavior governed by it.
Read the sections needed for the task and inspect the affected implementation.
If documented constraints conflict with current code, surface the discrepancy
before changing the contract.

<!--
Keep one entry per document, with a clear condition for consulting it.
Update paths and triggers to match the repository and document contents.
Remove entries that do not apply.
-->
