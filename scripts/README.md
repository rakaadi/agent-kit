# Hook Scripts

This folder contains the command scripts referenced by [`hooks.json`](../hooks.json) and release utility scripts.

## Agent hook scripts

| Hook event | Script | Purpose |
| --- | --- | --- |
| `PreToolUse` | [`pre-tool-use-python.mjs`](./pre-tool-use-python.mjs) | Warns when a shell command uses bare `python` and recommends `python3` instead. |
| `PostToolUse` | [`post-tool-use-eslint.mjs`](./post-tool-use-eslint.mjs) | Runs touched-file ESLint after successful file edits so agents avoid unnecessary repo-wide lint runs. |

## Release utilities

| Script | Purpose |
| --- | --- |
| [`update-version.sh`](./update-version.sh) | Updates the version field in all plugin config files at once. |

### `update-version.sh`

Keeps `plugin.json`, `.claude-plugin/plugin.json`, and both `marketplace.json` files in sync by updating them all to the supplied version in one step.

```sh
npm run set-version -- 2026.4.3
# or directly:
bash scripts/update-version.sh 2026.4.3
```

**Requires [`jq`](https://jqlang.org/download/)** — the script exits with an error if jq is not found.

---

## Pre-commit hook

A Husky pre-commit hook lives at [`.husky/pre-commit`](../.husky/pre-commit). It checks version alignment across all plugin config files **only when one of those files is staged**, blocking the commit if any version mismatches are found.

Run `npm install` once to activate the hook via the `prepare` lifecycle script.
