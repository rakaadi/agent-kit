---
name: dispatch-report
description: Generate a post-dispatch summary comparing subagent outputs after a multi-agent workflow.
argument-hint: "Brief description of the dispatched task"
agent: agent
---

Generate a **dispatch report** summarizing the results of the most recent subagent dispatches for: `${input:task:Brief description of the dispatched task}`.

## Report Structure

For each subagent that was dispatched, produce a row in the comparison table:

| Agent | Task Given | Status | Key Output | Issues / Gaps |
|-------|-----------|--------|------------|---------------|

Then provide:

### Consensus
- Points where all agents agree.

### Conflicts
- Points where agents disagree or contradict each other. For each conflict, state which agent's output you recommend and why.

### Unresolved
- Questions, gaps, or ambiguities that no agent addressed and that require user decision or a follow-up dispatch.

### Recommended Next Steps
- Concrete actions: accept, re-dispatch with refined prompt, or escalate to user.

Keep the report concise. Prefer bullet points over prose.
