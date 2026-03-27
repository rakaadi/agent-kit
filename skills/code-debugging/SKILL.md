---
name: code-debugging
description: Guide for debugging issue on a specific code sections, pattern, or files. Used this skill when user asking for assistant when debugging an issues or explaining a code.
---

## Skill Purpose

This skill specializes in debugging React Native code issues. When you encounter bugs, crashes, unexpected behavior, or error messages, this skill helps identify root causes, explains why problems occur in the React Native environment, and provides targeted fixes. Once bugs are resolved, it can suggest when deeper refactoring would improve code quality and recommend engaging the Refactoring Skill for comprehensive improvements.

## Core Philosophy

**Debug First, Review Later**: Critiquing code architecture while fundamental logic is broken is counterproductive. This skill prioritizes establishing working code before optimizing it. Think of it as ensuring a building's foundation is solid before renovating the interior.

**Simplicity Over Cleverness**: Readable, straightforward code is always preferred over advanced, complex solutions. When debugging, this skill focuses on reducing complexity first because complexity is often where bugs originate. Simple code fails in simple, obvious ways. Complex code fails in complex, hidden ways. A bug in a straightforward conditional is easy to spot and fix. A bug buried in nested abstractions, higher-order functions, or clever composition patterns takes hours to diagnose and days to fix safely. In any critical application where mistakes have real consequences, the developer debugging an issue at 2 AM needs to understand the code immediately, not spend time deciphering elegant but opaque logic.

**Fix the Bug, Then Improve the Pattern**: After resolving the immediate issue, assess whether a new code pattern would prevent similar bugs from recurring. Sometimes a bug reveals that the current approach is fundamentally fragile. In these cases, introduce a better pattern as part of the solution. But the pattern should serve clarity and maintainability, not showcase advanced techniques. Every new pattern must earn its place by making the code easier to understand and harder to break.

**Teach, Don't Just Fix**: Every bug is a learning opportunity. This skill explains the mental model behind issues so you understand not just what broke, but why it broke and how to prevent similar issues in the future.

## Debugging Process

1. Symptom Analysis: Gather detailed information about the bug, including error messages, stack traces, and reproduction steps.
2. Root Cause Investigation: Analyze the relevant code sections to identify the underlying issue, considering React Native's unique constraints and patterns.
3. Solution: Provide a targeted fix with a clear explanation of how it resolves the issue.
4. Root Cause Explanation: Clearly explain what's happening, why it's happening, and why this pattern fails in React Native.
5. Prevention Guidance: Offer brief advice on how to avoid similar bugs in the future, including mental models and best practices.

## When to Recommend Refactoring

After resolving a bug, assess whether the code would benefit from broader improvements. Recommend calling the Refactoring Skill when:

**Complexity Breeds More Bugs:**
- The bug was hard to find because the code does too many things at once
- Fixing one bug reveals that similar bugs likely exist in related complex code
- The fix required understanding multiple layers of abstraction
- The code has grown organically complex without clear structure

**Structural Issues Emerge:**
- The bug fix reveals deeply nested conditionals that obscure logic
- Multiple similar bugs suggest a fragile pattern that needs restructuring
- The component has grown too large and responsibilities should be split
- State management is complex and error-prone

**Simplification Opportunity:**
- The code could be rewritten in a simpler way that makes bugs obvious
- Complex clever code could be replaced with straightforward readable code
- Advanced patterns (higher-order functions, complex composition) are obscuring intent
- The code would benefit from being broken into smaller, testable pieces

**Performance Concerns:**
- The component re-renders excessively after the fix
- Array operations in the fixed code could be optimized
- RTK Query usage could be improved with better cache management

**Maintainability Red Flags:**
- The fixed code is hard to understand or fragile
- Similar logic is duplicated across multiple locations
- The component violates single responsibility principle
- Future developers will struggle to understand the code at 2 AM

### Structured Debugging Response

For complex bugs requiring investigation:

```
Investigation Summary:
[Brief overview of what you investigated]

Root Cause Analysis:
[Detailed explanation of what's causing the bug and why]

React Native Context:
[Explain any RN-specific constraints or platform differences]

Solution:
[Code snippets with clear before/after comparison]

Verification:
[How to test that the fix works correctly]

Related Considerations:
[Other potential issues this fix might affect]

Refactoring Recommendation (if applicable):
[Whether this code would benefit from broader improvements]
```

### Refactoring Handoff

When recommending the Refactoring Skill:

```
Bug Status: ✓ Fixed

The immediate issue is resolved—[brief summary of what was fixed].

However, I've identified several structural concerns that would benefit from
refactoring now that the code is working:

[List 2-4 specific refactoring opportunities]

These issues aren't causing bugs right now, but they make the code harder to
maintain and more prone to future issues. The Refactoring Skill can help address
these systematically.

Recommend: Engage the Refactoring Skill for comprehensive improvement.
```

## Collaboration with Refactoring Skill

The Code Review skill and Refactoring Skill work together in a natural workflow:

**Code Review Skill (This Skill):**
- Diagnoses bugs and explains root causes
- Provides minimal fixes to restore functionality
- Identifies when code structure needs improvement
- Hands off to Refactoring Skill for systematic improvements

**Refactoring Skill:**
- Takes working code and improves structure
- Optimizes performance and readability
- Applies modern patterns and best practices
- Returns improved, maintainable code

**Example Collaboration:**

```
User: "My component crashes when I update patient vitals"

Code Review Skill:
→ Investigates the crash
→ Finds it's due to stale closure in useEffect
→ Provides targeted fix with explanation
→ Notes the component also has nested conditionals and suboptimal loops
→ Recommends: "Bug is fixed. Consider refactoring for better maintainability."

User: "Yes, let's refactor"

Refactoring Skill:
→ Takes the now-working code
→ Simplifies nested conditionals with ts-pattern
→ Optimizes loop with proper memoization
→ Improves RTK Query usage with selectFromResult
→ Returns clean, maintainable code
```

## Key Principles to Remember

**Minimal Fixes First:**
Don't combine bug fixes with refactoring. Get the code working, then assess if broader improvements are needed.

**Always Explain the "Why":**
Don't just say "change X to Y." Explain why X causes the problem and why Y solves it. Build understanding, not just fixes.

**Project Patterns are Intentional:**
Refer to the project code patterns documentation (if any) for project-specific decisions. Don't flag intentional patterns as bugs, ask for clarification when you are not sure, **never** guess about the intention behind code.

**Teach Through Debugging:**
Every bug is a learning opportunity. Help the developer understand React's mental model, JavaScript's async behavior, and React Native's platform constraints.

**Know When to Hand Off:**
When a bug reveals structural problems or complexity that breeds bugs, fix the immediate issue first, then recommend the Refactoring Skill for comprehensive simplification and improvements.
