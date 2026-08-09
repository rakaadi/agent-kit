---
name: code-refactoring
description: Guide for code refactoring, use this skill to guide you when user asked to refactor a components or functions and when an implementation of a plan requiring a code refactoring.
---

## Skill Purpose

This skill specializes in refactoring React Native code. It focuses on eliminating deeply nested conditionals, optimizing array operations and component re-renders, improving RTK Query usage patterns, and enhancing code readability while maintaining React Compiler compatibility and ESLint compliance.

## Core Refactoring Principles

**Simplicity is a Feature, Not a Limitation:**
Code complexity should only exist when it solves a problem that simple code cannot. Every abstraction, every layer of indirection, every clever pattern must justify its existence by making the code clearer or more maintainable. If a straightforward approach works, use it. Advanced techniques that make code harder to understand make bugs harder to find and fix. In a healthcare application, clarity is a safety feature.

**Priority Order (Highest to Lowest):**
1. Code readability and maintainability
2. RTK Query optimization (data flow determines component architecture)
3. Logical improvements and proper React patterns
4. Performance optimizations (let React Compiler handle micro-optimizations)
5. Modern React patterns (when they genuinely improve clarity)

## Refactoring Workflow

### Step 1: Analyze Current Pattern
- Identify the anti-pattern (nested conditionals, unoptimized loops, etc.)
- Check if the pattern violates React rules or ESLint config
- Assess impact on component re-renders

### Step 2: Check RTK Query Usage
- Is data being over-fetched? → Use `selectFromResult`
- Are there conditional queries? → Use `skipToken`
- Is cache invalidation configured? → Add `invalidatesTags`/`providesTags`
- Is polling controlled? → Tie to screen focus with `useFocusEffect`

### Step 3: Evaluate Hook Necessity
- Is `useMemo` wrapping simple calculations? → Remove
- Is `useCallback` wrapping stable references? → Remove
- Is `useEffect` creating derived state? → Compute during render
- Can modern React 19 patterns replace old patterns? → Suggest upgrade if clearer

### Step 4: Apply Refactoring
- Extract complex logic into helper functions
- Use `ts-pattern` for nested conditionals in rendering
- Use early returns for nested conditionals in functions
- Stabilize references with `useCallback` only when passing to memoized children
- Memoize expensive computations with clear performance benefit
- Lift state when mapped components need coordination

### Step 5: Verify Compliance
- All imports use path aliases (`@components`, `@utils/*`, etc.) where applicable
- Redux hooks are typed (`useAppDispatch`, `useAppSelector`)
- No Rules of Hooks violations
- React Compiler compatible (no manual object identity preservation unless necessary)
- ESLint passes

## Code Generation Guidelines

When suggesting refactored code:

**Always Include:**
- Import statements with correct path aliases
- Type annotations for function parameters and returns
- Comments explaining WHY the refactor improves the code
- Before/after comparison when helpful

**Always Explain:**
- The specific anti-pattern being fixed
- How the refactor improves readability/performance
- Trade-offs (if any) of the new approach
- Which React/RTK Query pattern is being applied

**Never:**
- Use relative imports like `../../components` when the import is covered by an alias
- Suggest React Native incompatible patterns (e.g., `Suspense` for data fetching is experimental in RN)
- Use plain Redux hooks (`useDispatch`, `useSelector`)
- Suggest patterns that conflict with React Compiler