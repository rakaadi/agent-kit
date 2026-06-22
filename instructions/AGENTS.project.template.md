# Project Convention

<!--
Reasoning:
Use this section as the repository-specific operating contract. Keep it compact
and route deeper details to reference files instead of duplicating long project
conventions in AGENTS.md.
-->

## Project Overview

<!--
What the project is, who it serves, supported platforms, and the main runtime.
Example: healthcare mobile app, Expo SDK version, Android/iOS targets.
-->

## Stack And Runtime

<!--
List the framework and library choices an agent must account for: language,
app framework, navigation, state/data layer, UI libraries, styling, build and
deployment platform, compiler flags, and runtime constraints.
-->

## Dependency And Compatibility Policy

<!--
Version-sensitive rules. State whether agents must check package versions,
official docs, React Native compatibility, platform support, deprecations,
or migration notes before suggesting APIs or patterns.
-->

## Package Manager

<!--
The only allowed package manager, required version, lockfile expectations,
and forbidden alternatives.
-->

## Commands

<!--
Project commands agents should use. Prefer targeted commands over broad ones.

Examples:
- install dependencies
- add dependency
- run dev server
- lint changed files
- typecheck
- run targeted tests
- run E2E flows
-->

## Code Style

<!--
Formatting, linting, file organization, import rules, naming conventions,
style-system requirements, and generated-code rules.
-->

## Architecture And Code Patterns

<!--
Short routing summary only. Link to deeper docs for domain-specific patterns:
data fetching and cache ownership, session/auth ownership, error handling,
form state, schema validation, component/screen architecture, and styling.
-->

Read before changing code patterns:

- [Code Patterns & Architecture](instructions/agent-conventions/code-patterns.md)

## Navigation And Runtime Architecture

<!--
Use this section when navigation, route groups, auth redirects, boot flow,
splash behavior, or navigator dependencies are involved.
-->

Read before changing navigation or auth routing:

- [Navigation Architecture & Debugging](instructions/agent-conventions/navigation-architecture.md)

## Testing And Verification

<!--
State the default test strategy and where tests live. Link to deeper testing
rules and list the most important targeted checks for high-risk areas.
-->

Read before adding or changing tests:

- [Testing Conventions](instructions/agent-conventions/testing.md)

## Agent Skills

<!--
Use a task-to-skill matrix. Keep global agent behavior out of this section;
only list project-relevant skill triggers.
-->

| Task Type | Required Skill(s) | When To Use | Notes |
| --- | --- | --- | --- |
| Project code patterns | `<skill>` | Data, auth, forms, errors, styling | Also read Code Patterns & Architecture |
| Navigation/auth routing | `<skill>` | Route groups, splash, role routing, navigator errors | Also read Navigation Architecture & Debugging |
| Tests | `<skill>` | Unit, integration, UI automation | Also read Testing Conventions |
| Native UI work | `<skill>` | Screens, components, React Native UI behavior | Check React Native compatibility first |
| Debugging | `<skill>` | Crash, error, broken flow | Gather runtime evidence where possible |

## Reference Documents

<!--
Canonical docs and when to consult them. Keep this list area-based, not generic.
Update paths to match the target repository layout.
-->

- [Code Patterns & Architecture](instructions/agent-conventions/code-patterns.md) — data fetching, session/auth ownership, error handling, forms, schema validation, component architecture, and styling.
- [Navigation Architecture & Debugging](instructions/agent-conventions/navigation-architecture.md) — route tree, auth redirects, role routing, navigator upgrade triage, and runtime debugging.
- [Testing Conventions](instructions/agent-conventions/testing.md) — unit tests, integration tests, UI automation, and high-risk validation expectations.
