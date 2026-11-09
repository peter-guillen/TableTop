# Client rules

React 18 + Vite + Redux Toolkit / RTK Query + Tailwind. The primary rules in the root [CLAUDE.md](../CLAUDE.md) still apply.

## Commands

```bash
npm run dev                 # vite on :5173, proxies /api to http://localhost:1234 (start the server too)
npm run build
npx tsc --noEmit            # type-check; there is no script for it
npm run lint                # currently broken: ESLint 9 ignores the legacy .eslintrc.cjs (needs flat-config migration)
```

There are no client tests. Verify changes with `npx tsc --noEmit` and `npm run build`, and show their output.

- `npm run build` does **not** type-check, so always run `tsc` separately.
- `tsc` currently reports 16 existing errors (ROADMAP item 8). Make sure a change doesn't raise that count or add errors in files it touches.

## Language

- **New files are TypeScript** (`.ts`/`.tsx`). `tsconfig` is `strict` with `allowJs`, so existing `.jsx` files (e.g. professions, articles) keep working. Convert one only when asked.
- Shared data shapes go in `features/<domain>/<x>Types.ts`, and empty-form defaults in `<x>Defaults.ts`. Keep them matching the server model.

## Structure

- `src/app/` holds the router (`App.tsx`, `createBrowserRouter`), layouts, top-level pages, the theme context, and `store.ts`.
- `src/features/<domain>/` holds:
  - `api/`: one RTK Query `createApi` per domain (until ROADMAP item 29 moves them onto one base API with `injectEndpoints`)
  - `pages/`: `<X>Page`, `<X>Details`, `<X>Form`
  - `components/`: form sections (`<X>BasicInfoSection`, ...), `<X>List`, `<X>Preview`
  - `<x>Types.ts` and `<x>Defaults.ts`
- `src/shared/` holds the API base URL, constants API, `LoadingSpinner`, `useFormHandlers`, and the theme. Don't add to it without asking (see primary rule 2).

## State

- **Server data goes through RTK Query.** Use local `useState` for UI and form state. Don't add Redux slices or context for something that is only needed locally. Ask first if global state seems necessary.
- **A new RTK Query API must be registered twice in `src/app/store.ts`**, as a reducer and as middleware. After ROADMAP item 29, don't add new APIs: add endpoints to the base API with `injectEndpoints` instead, and update this section.
- Each API uses `baseUrl: API_URL` (from `shared/api/api.js`). Lists provide `{ type, id: "LIST" }`, single records provide `{ type, id }`, and mutations invalidate the matching tags.
- Game enums come from `useGetConstantsQuery()`. Never hard-code them.

## Auth

- The current user comes from `authApi`'s `useGetCurrentUserQuery`. `features/auth/ProtectedRoute.tsx` gates routes and redirects to `/login` or `/forbidden` based on `roles`.
- **On logout, `app/layouts/Navbar.tsx` resets every per-user cache** (`characterApi`, `userApi`). Any new API that holds per-user data must be added there. Public library caches are kept on purpose.
- Keep requests relative (empty `VITE_API_URL`). See the cookie note in the root CLAUDE.md.

## Forms

- Domain forms are split into section components that share one state object through `shared/hooks/useFormHandlers.tsx`. Follow the existing `<X>Form` + sections pattern, using `features/powers/` as the reference.

## Styling

- Tailwind utility classes inline. Colors and roles are defined in `shared/styles/theme.ts` (for example, red is reserved for logout and destructive actions). Dark and light mode come from `ThemeContext`.
