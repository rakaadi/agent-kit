# Evidence-Backed Comments

Use this example when documenting a workaround, reproduction case, or platform-specific constraint.

Sources (adapted): [React `Navigate.js`](https://raw.githubusercontent.com/facebook/react/main/fixtures/flight/src/Navigate.js), [React `attributes.js`](https://raw.githubusercontent.com/facebook/react/main/fixtures/attribute-behavior/src/attributes.js)

```javascript
/** Repro for https://issues.chromium.org/u/1/issues/419746417 */
function provokeChromeCrash() {
  // ...
}

read: getAttribute('challenge'), // The property is not supported in Chrome.
```

- **Ground comments in evidence.** Both comments tie the rationale to a concrete browser bug or capability.
- **Explain intent, rationale, or consequences.** They tell the reader why the code or test exists, not just what it does.
- **Keep inline comments short.** The browser-support note is a one-line constraint, not a narration of the surrounding code.
