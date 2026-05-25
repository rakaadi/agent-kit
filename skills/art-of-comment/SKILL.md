---
name: art-of-comment
description: Guide for editing existing and writing inline comments and JSDoc. Use when generating comments for documenting new components or functions, non-obvious code behaviour, or complex logic.
---

# Overview

Every comment should earn its place. A good comment adds context the code alone cannot convey: why a decision was made, what trade-off was accepted, what side effect or constraint matters, or how a non-obvious piece fits the bigger picture. A comment that merely restates the code is noise and adds maintenance burden. When in doubt, prefer no comment over a redundant one.

## Guidelines

- **Comment only when needed.** Add comments or JSDoc only when the code alone does not make the intent clear. If the code is self-explanatory, prefer no comment.
- **Explain intent, rationale, or consequences.** Good comments add information the code cannot: why a decision was made, what trade-off was accepted, what side effect, exception, or constraint a caller should know about.
- **Do not restate the code.** If a comment only paraphrases names, conditions, or control flow, remove it. Use words that add meaning, not synonyms for the code.
- **Use JSDoc for reusable interfaces.** Functions, types, and constants used elsewhere should use `/** ... */` when hover documentation would help a caller understand purpose, important parameters, return semantics, side effects, or usage constraints.
- **Keep implementation detail out of interface docs.** Declaration-level comments should describe what the symbol promises or why it exists, not internal steps that only matter to the implementation.
- **Keep inline comments short.** Inline comments should usually fit in 1-2 lines and explain *why* or *why not*, not narrate *what* the next line does.
- **Document trade-offs and non-obvious behavior.** If the code accepts a compromise, workaround, minimum threshold, ordering rule, or other surprising behavior, explain the rationale briefly.
- **Treat hard-to-write comments as a design signal.** If a comment is difficult to make both simple and clear, the code or API may need to be renamed, split, or refactored instead of further explained.
- **Ground comments in evidence.** Do not invent rationale. Base comments on code behavior, library docs, project conventions, or explicit user requirements, and ask for clarification when intent is uncertain.
- **Keep comments consistent with surrounding docs.** Do not contradict nearby comments, and do not duplicate information already explained elsewhere unless repetition helps the caller at that exact point.
- **Update or remove stale comments.** An outdated comment is usually worse than no comment.

## Examples

Read the example file that matches the kind of comment you are writing or reviewing.

- `example-inline-comment-triage.md` — Inline comment keep/remove decisions, duplicate comments, and trade-off comments. Read when deciding whether an inline comment earns its place.
- `example-reusable-interface-docs.md` — Reusable interface JSDoc that documents the caller-facing contract without leaking internals. Read when writing declaration-level docs for shared symbols.
- `example-evidence-backed-comments.md` — Evidence-backed workaround and compatibility comments. Read when documenting a browser bug, platform limitation, or reproduction note.
- `example-design-signal.md` — Cases where better names remove the need for comments. Read when a comment seems to compensate for unclear naming or structure.

The stale-comment rule does not need a dedicated example. Apply it whenever you modify code with existing comments.
