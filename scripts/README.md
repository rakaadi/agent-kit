# Hook Scripts

This folder contains the command scripts referenced by [`hooks.json`](../hooks.json).

## Included hooks

| Hook event | Script | Purpose |
| --- | --- | --- |
| `PreToolUse` | [`pre-tool-use-python.mjs`](./pre-tool-use-python.mjs) | Warns when a shell command uses bare `python` and recommends `python3` instead. |
| `PostToolUse` | [`post-tool-use-eslint.mjs`](./post-tool-use-eslint.mjs) | Runs touched-file ESLint after successful file edits so agents avoid unnecessary repo-wide lint runs. |

## Notes

- The hook wiring lives in [`hooks.json`](../hooks.json).
- The ESLint hook only reacts to successful file-modifying tool calls.
- The ESLint hook caches successful results for the current touched-file set.
- If repo-local ESLint is unavailable, the ESLint hook skips cleanly.
