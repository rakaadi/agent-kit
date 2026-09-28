<!-- Only append this if the tooling is actually present in the harness -->

## Repository Tool Routing

Use the narrowest tool that matches the task.

### `fff` — Lexical Discovery

Use `fff` tools (`find_files`, `grep`, `multi_grep`) instead of `grep`/`rg` for:

- filename and path lookup
- fuzzy file discovery
- lexical or text search
- broad repository exploration
- multi-pattern search

### Serena — Semantic Understanding

Activate the current project before using Serena in a new repository session.

Use Serena for:

- symbol and declaration lookup
- references, callers, and implementations
- semantic relationships
- language-server diagnostics
- symbol-aware rename and refactoring

Before changing code, inspect the relevant symbols and references first. Do not use Serena for ordinary text search, filename discovery, raw reads, directory listing, or shell execution.

### Native Codex Tools

Use native Codex tools for:

- editing and writing files
- builds, tests, lint, type checking, Git, and project scripts
