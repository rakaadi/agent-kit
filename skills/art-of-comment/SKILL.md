---
name: art-of-comment
description: Guide for writing inline comments and JSDoc in the codebase. Use when generating code for bug fixes, new components, refactoring, or feature implementation.
---

# Overview

Every comment should earn its place. A good comment provides context the code alone cannot convey — *why* a decision was made, what trade-off was accepted, or how a non-obvious piece fits the bigger picture. A comment that merely restates the code is noise; remove or avoid it. When in doubt, prefer no comment over a redundant one.

# Guidelines

- **Comment only when needed.** Do not add comments or JSDoc unless the code is non-obvious or you are explicitly asked. Self-explanatory code needs no narration.
- **Inline comments: ≤ 2 lines.** Keep them terse — explain *why*, not *what*.
- **JSDoc: comprehensive yet concise.** Document only what adds value: purpose, non-obvious parameters, return semantics, or usage examples. Omit what the signature already communicates.
- **Use `/** ... */` for reusable symbols.** Functions, types, and constants referenced elsewhere should use JSDoc so IDE hover tooltips display the information.
- **Document trade-offs.** When the implementation accepts a trade-off, explain the rationale and why it was worth taking.
- **No assumptions.** Ground comments in library docs, project standards, or best practices — not guesses. Ask for clarification when unsure.
- **Stay consistent; never contradict.** Match the tone and terminology of existing comments. Do not duplicate information already stated in a nearby comment — reference it instead.

# Example

The annotated snippet below highlights common comment pitfalls alongside good practice.

```typescript
// (1) Calculate chart segments based on priority: verified > registered > rejected
const getChartSegments = (): {
  value: number
  color: string
  backgroundColor?: string
  badgeLabel?: string
}[] => {
  const verified = data?.verified ?? 0
  const registered = data?.registered ?? 0
  const rejected = data?.rejected ?? 0
  const total = verified + registered + rejected

  // (2) If all values are 0, show full gray circle
  if (total === 0) {
    return [{ value: 1, color: colors.palette.lightGray }]
  }

  // (3) Filter out zero values to prevent empty segments
  const segments = []

  // (4) Priority order: verified > registered > rejected
  if (verified > 0) {
    segments.push({
      value: verified,
      color: '#01C58A',
      backgroundColor: '#D6F6EC',
      badgeLabel: `${verified} Aset Terdata`,
    })
  }
  if (registered > 0) {
    segments.push({
      value: registered,
      color: '#FF9E00',
      backgroundColor: '#FFF1DB',
      badgeLabel: `${registered} Belum Diverif`,
    })
  }
  if (rejected > 0) {
    segments.push({
      value: rejected <= 2 ? 2 : rejected, // (5) Minimum visible segment size of 2
      color: '#FF5264',
      backgroundColor: '#FFECEC',
      badgeLabel: `${rejected} Ditolak`,
    })
  }
```

| # | Verdict | Why |
|---|---------|-----|
| 1 | **Good intent, wrong syntax.** Clearly summarizes purpose and priority order — but should use `/** ... */` so the description appears on hover where `getChartSegments` is called. |
| 2 | **Remove.** The condition and return value are self-explanatory; the comment adds nothing. |
| 3 | **Borderline.** States the obvious, but may be acceptable as a signpost when debugging segment logic — acceptable only if it conveys intent the code cannot. |
| 4 | **Remove — duplicates (1).** The priority order is already documented above; repeating it creates a maintenance burden. Reference the earlier comment if needed. |
| 5 | **Good.** Concisely explains a non-obvious workaround and its effect. |
