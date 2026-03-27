---
name: code-simplifying
description: Run a code-simplifier-style pass on recent code without changing behavior.
argument-hint: "files=<paths or areas to simplify>"
---

Simplify `${input:files:Files or areas to simplify}`. If the user does not name any files, ask first.

Goals:
- Improve readability and maintainability.
- Remove unnecessary complexity.
- Improve scalability only when it adds clear value.
- Preserve existing behavior.

Rules:
- Follow project conventions, standards, and ESLint rules.
- Keep new functions, variables, and components in the same file where they are used unless the user explicitly asks for a new file.
- If work across multiple files reveals shared logic, keep the implementation local and recommend extracting a shared import.
- Prefer clearer, more explicit code over clever or overly compact rewrites.

At the end, report:
- what you simplified
- why the change improves the code
- any follow-up extraction worth doing later