# Reference

`writing-unit-test` is a narrow companion skill, not a full replacement for `tdd`.

It assumes the global `tdd` skill from [`mattpocock/skills`](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd) is also installed and used as the canonical foundation for:

- overall TDD workflow
- interface design guidance
- mocking guidance
- deeper testability principles

Install the dependency globally:

```bash
npx skills add mattpocock/skills@tdd
```

Use `writing-unit-test` when the job is specifically to write or refine the test itself, especially when you want a smaller slice of guidance than the full red-green-refactor workflow.
