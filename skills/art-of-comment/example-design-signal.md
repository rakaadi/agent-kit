# Design Signal Example

Use this example when a comment seems to exist only because a name or abstraction is unclear.

Source (adapted): [Google Objective-C Style Guide](https://raw.githubusercontent.com/google/styleguide/gh-pages/objcguide.md)

```objectivec
// GOOD:
int numberOfErrors = 0;
int completedConnectionsCount = 0;

// AVOID:
int w;
int nerr;
int nCompConns;
```

- **Treat hard-to-write comments as a design signal.** If a variable needs a comment just to explain its name, the name is usually the problem.
- **Do not restate the code.** Clear names often remove the need for explanatory comments entirely.
- **Comment only when needed.** Use comments for non-obvious context, not to patch over obscure names.
