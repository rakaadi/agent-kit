<!-- Only use this if Serena MCP server is available through the lean-ctx gateway, adjust where necessary -->

## Serena MCP Server

Serena is available through the lean-ctx gateway as `serena-codex`. Before using Serena symbol/reference tools in a new session, activate the repo with `serena-codex::activate_project` using project name or the absolute repo path.

Use Serena for symbol-aware code navigation and edits when the task depends on language semantics: finding definitions or references, tracing callers, renaming symbols, or performing refactors that should respect the language server's view of the project. For ordinary compressed file reads, text search, shell commands, or broad repo orientation, use the lean-ctx tools described below.

<!--
Proposed rephrase:

The current Serena and lean-ctx instructions overlap because both tell the agent
to avoid plain reads/grep for codebase work. I would make Serena narrower and
position it as the symbol-aware layer, while lean-ctx remains the default MCP/CLI
route for compressed reads, searches, and shell output.

Suggested Serena paragraph:

Use Serena for symbol-aware code navigation and edits when the task depends on
language semantics: finding definitions or references, tracing callers, renaming
symbols, or performing refactors that should respect the language server's view
of the project. For ordinary compressed file reads, text search, shell commands,
or broad repo orientation, use the lean-ctx tools described below.

This keeps the practical order clear:
- lean-ctx is the default route for token-efficient commands, reads, and search.
- Serena is the specialized layer for LSP-backed symbol/reference/refactor work.
-->
