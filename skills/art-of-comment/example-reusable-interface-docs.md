# Reusable Interface Docs

Use this example when writing JSDoc for functions, types, or constants that are referenced elsewhere.

Source (adapted): [Visual Studio Code `ProtectedResourceMetadata`](https://raw.githubusercontent.com/microsoft/vscode/main/src/vs/platform/agentHost/common/state/protocol/common/state.ts)

```typescript
/**
 * Describes a protected resource's authentication requirements using
 * [RFC 9728](https://datatracker.ietf.org/doc/html/rfc9728) semantics.
 *
 * Field names use snake_case to match the RFC 9728 JSON format.
 *
 * @category Authentication
 * @see {@link https://datatracker.ietf.org/doc/html/rfc9728 | RFC 9728}
 */
export interface ProtectedResourceMetadata {
  /** OPTIONAL. Human-readable name of the protected resource. */
  resource_name?: string
}
```

- **Use JSDoc for reusable interfaces.** The comment lives on a public type used elsewhere, where hover documentation helps callers.
- **Keep implementation detail out of interface docs.** It documents semantics and constraints that matter to consumers, not how the data is parsed or stored.
- **Ground comments in evidence.** The contract is tied to the RFC that defines it instead of guessed intent.
