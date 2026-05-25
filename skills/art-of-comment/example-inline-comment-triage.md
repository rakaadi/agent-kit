# Inline Comment Triage

Use this example when deciding whether an inline comment should stay, be removed, or be rewritten.

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
}
```

| # | Verdict | Why |
| --- | --- | --- |
| 1 | **Good intent, conditional format.** | **Use JSDoc for reusable interfaces; Ground comments in evidence.** If `getChartSegments` is reused or part of a public interface, prefer `/** ... */` so callers get hover docs. If it is only a local helper, a declaration comment may be unnecessary. |
| 2 | **Remove.** | **Comment only when needed; Do not restate the code.** The condition and fallback are already clear from the code, so the comment adds no intent or rationale. |
| 3 | **Remove unless it explains a real consequence.** | **Comment only when needed; Explain intent, rationale, or consequences.** "Filter out zero values" narrates the code. Keep it only if the real reason is non-obvious, such as preventing empty visual segments or rendering artifacts. |
| 4 | **Remove - duplicates (1).** | **Do not restate the code; Keep comments consistent with surrounding docs.** Repeating the ordering rule adds no new information and increases the chance that one comment drifts from the other. |
| 5 | **Good.** | **Document trade-offs and non-obvious behavior; Keep inline comments short.** The minimum visible segment size is a visualization compromise a reader would not infer from the expression alone, and the comment explains that briefly. |
