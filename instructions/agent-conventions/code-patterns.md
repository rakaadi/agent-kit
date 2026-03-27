# Code Patterns & Architecture

Project-specific code patterns and conventions. Consult when working on the relevant area.

## Dual RTK Query APIs

Two separate APIs with independent cache management in `src/redux/`:
- **`mainApi`** (`src/redux/api.ts`): Healthcare API
- **`backOfficeApi`** (`src/redux/backOfficeApi.ts`): Inventory/asset management/HCM

**Pattern** — Always inject endpoints into existing APIs:

```typescript
const myApi = mainApi.injectEndpoints({
  endpoints: builder => ({
    getData: builder.query<Type, Params>({
      query: (params) => ({ url: 'endpoint', method: 'GET' }),
      providesTags: ['myTag'], // Critical for cache invalidation
    }),
    updateData: builder.mutation<void, Params>({
      query: (params) => ({ url: 'endpoint', method: 'POST', body: params }),
      invalidatesTags: ['myTag'], // Refreshes cached data
    }),
  }),
})
export const { useGetDataQuery, useUpdateDataMutation } = myApi
```

- **Typed Hooks**: Import `useAppDispatch` and `useAppSelector` from `@hooks/app` (never plain Redux hooks)

## ⚠️ RTK Query Error Handling (CRITICAL)

**RTK Query mutations/queries do NOT need `.catch()` blocks** — error handling is centralized in middleware:

```typescript
// ✅ CORRECT — No catch block needed
const handleSubmit = async () => {
  await updateData(params).then(() => {
    navigation.goBack()
  })
}

// ❌ WRONG — Don't add catch blocks
const handleSubmit = async () => {
  await updateData(params)
    .then(() => navigation.goBack())
    .catch(err => console.error(err)) // Redundant!
}
```

**Why**: The `queryErrorLogger` middleware at `src/redux/middleware/queryErrorLogger.ts` automatically:
- Logs all RTK Query failures to console in dev mode
- Displays error snackbars with endpoint name and status code
- Handles both `mainApi` and `backOfficeApi` errors

**When to use catch**: Only when you need custom error handling logic (e.g., form validation feedback). Set `displayError: false` in endpoint options to suppress the global snackbar.

## Global Error Handling

Uncaught JS errors and unhandled promise rejections are captured via the `useGlobalErrorHandling` hook in `src/hooks/useGlobalErrorHandling.ts`:

```typescript
const { globalError, resetGlobalError } = useGlobalErrorHandling({
  suppressDefaultErrorScreen: true,
  getCurrentRoute: () => navigationRef.getCurrentRoute()?.name,
})
```

`ErrorBoundary` wraps all screens in `AppNavigator.tsx` via `screenLayout`:

```typescript
<RootStack.Navigator
  screenLayout={({ children }) => (
    <ErrorBoundary onError={(error, stackTrace) => onRenderError(error, stackTrace, 'render')}>
      {children}
    </ErrorBoundary>
  )}
>
```

**Key files**:
- `src/utils/crashlyticsLogger.ts` — Records fatal errors to Firebase Crashlytics
- `src/utils/navigationBreadcrumbs.ts` — Logs navigation state changes for crash context

**Features**:
- Catches sync JS errors via `ErrorUtils.setGlobalHandler`
- Tracks unhandled promise rejections with stack trace parsing
- Records fatal errors to Firebase Crashlytics via `recordFatalError()`
- Provides `globalError` state for custom error UI (used with `ErrorFallbackView`)
- Configured in `App.tsx`, works alongside `ErrorBoundary` for render errors

## Form State Management

**Pattern** — Use the `useFormHandler` hook for Redux-backed forms (`src/hooks/useFormHandler.ts`):

```typescript
import { useFormHandler } from '@hooks/useFormHandler'
import { updateClinicalPathologyForm } from '@reducers/formSlice'

const form = useAppSelector(state => state.form.clinical_pathology)
const { handleChange, handleNestedChange, handlePickerChange } = useFormHandler(updateClinicalPathologyForm, form)

// Simple field: handleChange('field_name')
// Nested field: handleNestedChange('parent', 'child') — auto-merges parent object
// Picker field: handlePickerChange('field_prefix') — sets both {prefix}_id and {prefix}_name
```

**When to use**: Any form that stores state in `formSlice.ts` or `boFormSlice.ts`.

## Zod Schemas

Use Indonesian error messages:

```typescript
export const FORM_SCHEMA = z.object({
  username: z.string().min(3, 'Username tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})
```

## Component Architecture

### Screen Wrapper

`src/components/Screen.tsx` — Base component with built-in `KeyboardAvoidingView` and 3 header types:
- `basic`: Standard title + back button
- `full`: Custom header with additional controls
- `actions`: Header with action buttons

```typescript
<Screen
  headerType="basic"
  headerProps={{ title: 'Title', onBackPress: () => {} }}
  backgroundColor={colors.palette.white}
  safeAreaEdges={['top', 'bottom']}
  loadingCondition={isLoading}
>
  {/* Content */}
</Screen>
```

### Styling

Use `react-native-unistyles` (never inline styles):

```typescript
import { createStyleSheet, useStyles } from 'react-native-unistyles'
const stylesheet = createStyleSheet((theme) => ({
  container: { backgroundColor: theme.colors.palette.white }
}))
```
