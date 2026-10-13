# Skill invocation policy across Codex, Pi, and Claude Code

Research date: 2026-10-13. Sources describe current documented behavior; this investigation did not run a live invocation test in any harness.

## Recommendation

Keep Codex's `agents/openai.yaml` policy and add `disable-model-invocation: true` to the `SKILL.md` frontmatter of skills that already have `policy.allow_implicit_invocation: false`. This expresses the same author intent through the settings each harness supports. It does not establish identical enforcement across harnesses. Codex documents its policy in [Build skills](https://learn.chatgpt.com/docs/build-skills); Pi documents the frontmatter flag in [Skills](https://pi.dev/docs/latest/skills#understand-how-skills-load); Claude Code documents it in [Control who invokes a skill](https://code.claude.com/docs/en/skills#control-who-invokes-a-skill).

The repository audit found 11 active skills: seven with implicit invocation disabled in Codex and four enabled. `review-code-complexity` already had the corresponding frontmatter flag. The six missing flags have been added; the four automatic skills retain their defaults. Existing Codex policy files are preserved. This inventory and change scope come from the local implementation audit, not the external sources.

## Supported behavior

| Harness | Setting | Default | Effect when automatic invocation is disabled | Explicit invocation |
| --- | --- | --- | --- | --- |
| Codex | `policy.allow_implicit_invocation` in `agents/openai.yaml` | `true` | Codex does not implicitly invoke the skill based on the user prompt. | `$skill-name` still works. |
| Pi | `disable-model-invocation` in `SKILL.md` | Omitted or `false` permits catalog inclusion. | The skill is loaded into the registry but excluded from the model's skills catalog. | `/skill:name` still works. |
| Claude Code | `disable-model-invocation` in `SKILL.md` | `false` | The description is excluded from context, and Claude Code blocks unauthorized model skill calls. | `/skill-name` works; an explicit slash mention inside user prose can grant invocation permission for that message. |

The Codex row follows [official OpenAI documentation](https://learn.chatgpt.com/docs/build-skills#optional-metadata). The original `developers.openai.com/codex/skills` URL redirects there. The Pi row follows [Pi documentation](https://pi.dev/docs/latest/skills#understand-how-skills-load) and [Pi's skill loader](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/src/core/skills.ts): `loadSkillFromFile` sets the boolean with `frontmatter["disable-model-invocation"] === true`, and `formatSkillsForPrompt` filters flagged skills. Use a YAML boolean, not the string `"true"`.

The Claude Code row follows [its current invocation documentation](https://code.claude.com/docs/en/skills#control-who-invokes-a-skill), which also says a blocked call instructs Claude not to reproduce the workflow another way. `user-invocable: false` controls user command visibility separately; adding it would not express the requested policy.

**Enforcement limit:** Pi's demonstrated mechanism is catalog filtering. Inference from that implementation: it should not be treated as a filesystem permission boundary against reading a known `SKILL.md` path. The reviewed Codex documentation establishes implicit-invocation behavior, but does not establish a filesystem prohibition. Claude Code documents a stronger skill-call restriction. Matching the flags aligns routing intent, not every access path.

## Why the field is absent from the specification

The [Agent Skills specification](https://agentskills.io/specification#frontmatter) currently lists six frontmatter fields: `name`, `description`, `license`, `compatibility`, `metadata`, and experimental `allowed-tools`. It does not list `disable-model-invocation`. Pi's [portable frontmatter table](https://pi.dev/docs/latest/skills#write-portable-frontmatter) includes it under fields attributed to the specification; that attribution conflicts with the specification's current table.

There is a recorded explanation, rather than a need to guess. In [Discussion #241](https://github.com/agentskills/agentskills/discussions/241), Jonathan Hefner explained on March 13, 2026 that the specification does not dictate activation conditions and that adding this field would introduce additional implications. He pointed to [Issue #105](https://github.com/agentskills/agentskills/issues/105), which proposes several Claude Code fields and remains open. This establishes a boundary and an unresolved standardization proposal; it does not establish a permanent rejection.

In [Discussion #212](https://github.com/agentskills/agentskills/discussions/212), Hefner also explained that specifying new fields does not make clients implement them, and suggested namespaced metadata files as a way for clients to experiment before converging. This supports retaining Codex's metadata alongside the cross-client frontmatter flag.

The official [client implementation guide](https://agentskills.io/client-implementation/adding-skills-support#filtering) already uses a `disable-model-invocation` flag as an example of opting out of model-driven activation and recommends hiding such skills from the catalog. That practical guidance is distinct from adding the field to the normative frontmatter list.

## Compatibility and validation limits

Unknown extension fields are not universally ignored. The current [Agent Skills reference validator](https://github.com/agentskills/agentskills/blob/main/skills-ref/src/skills_ref/validator.py) has a six-field allowlist and reports unexpected frontmatter keys. The bundled Codex `quick_validate.py` likewise rejects this flag, including the repository's previously flagged skill; that local failure does not demonstrate a Codex runtime rejection.

Claude Code explicitly distinguishes its extensions from strict distribution paths: [claude.ai uploads, the Skills API, and `package_skill.py`](https://code.claude.com/docs/en/skills#using-skill-frontmatter-outside-claude-code) accept only the six standard fields and reject extra keys. The added field therefore improves invocation-policy portability for supporting harnesses while reducing compatibility with those strict packagers. Moving the flag under `metadata` would satisfy the schema but would not provide the documented Pi or Claude Code behavior.

Local verification established boolean policy agreement for all 11 skills, exactly one added line in each of the six edited skill files, and a clean whitespace check. Since the strict validator rejects the extension, validation also ran on temporary copies with only that field removed; all passed. These checks establish file structure and policy consistency. Live model selection, command invocation, and installed harness versions remain untested.
