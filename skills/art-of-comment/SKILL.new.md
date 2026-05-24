---
name: art-of-comment
description: Guide for editing existing and writing inline comments and JSDoc. Use when generating comments for documenting new components or functions, non-obvious code behaviour, or complex logic.
---

# Overview

This skills is derived from the "A Philosophy of Software Design" chapter on comments, by John Ousterhout. It provides guidelines for writing effective comments that add value to the codebase without creating noise or maintenance burden.

## Guidelines

### Red Flags

These are signs a comment may be not adding value:

- **Comment repeats code**: If the information in a comment is already obvious from the code itself, the comment isn't helpful.
- **Implementation documentation contaminates interface**: Don't add the method-level comment on the function/component declaration, especially if it describes implementation details that aren't relevant to the caller.
- **Hard to describe**: The comment that describes a method or variable should be simple and yet complete. If it's hard to write, that's a sign there is a problem with the design of the code that it's trying to describe. Suggest an improvement to the code instead of writing a complicated comment.

### Best Practices

- **Use different words**: It's better to use different words in the comment from those in the name of the entity being described. Pick words for the comment that provide additional information about the meaning of the entity, not just restate it.
- **What and why, not how**: A good comment describes what the code does and why, not how it does it. The main goal of a comment is to help readers understand _what_ the code is doing.
- **Keep comments up-to-date**: Outdated comments can be more harmful than no comments. Always update comments when the code changes.

## Example

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
