# Client rules

React 18 + Vite + Redux Toolkit / RTK Query + Tailwind. The primary rules in the root [CLAUDE.md](../CLAUDE.md) still apply.

## Commands

```bash
npm run dev                 # vite on :5173, proxies /api to http://localhost:1234 (start the server too)
npm run build               # runs tsc --noEmit, then vite build
npx tsc --noEmit            # type-check on its own
npm run lint                # ESLint 9 flat config (eslint.config.js), .js/.jsx/.ts/.tsx, max 0 warnings
```

There are no client tests. Verify changes with `npm run lint` and `npm run build` (which type-checks), and show their output.

- `tsc` and lint are both at 0 errors. Keep them there: a type error now fails the Netlify build.

## Language

- **All client code is TypeScript** (`.ts`/`.tsx`, `strict`). Don't add `.js`/`.jsx` files.
- Shared data shapes go in `features/<domain>/<x>Types.ts`, and empty-form defaults in `<x>Defaults.ts`. Keep them matching the server model.
- `shared/constants/constantTypes.ts` holds only types used by more than one domain (`DamageType`, `Stats`, `Skills`, `Properties`, `StatModifier`, `HealthEffect`, `Resistance`, ...) and the `Constants` response shape. A type used by one domain (for example `Rarity` and `Quality` for items) lives in that domain's `<x>Types.ts`. Don't hardcode DB-backed names (professions, species, backgrounds) as union types; they come from the API.

## Structure

- `src/app/` holds the router (`App.tsx`, `createBrowserRouter`), layouts, top-level pages, the theme context, and `store.ts`.
- `src/features/<domain>/` holds:
  - `api/`: the domain's endpoints, added to the one base API with `baseApi.injectEndpoints`
  - `pages/`: `<X>Page`, `<X>Details`, `<X>Form`
  - `components/`: form sections (`<X>BasicInfoSection`, ...), `<X>List`, `<X>Preview`
  - `<x>Types.ts` and `<x>Defaults.ts`
- `src/shared/` holds the base API (`shared/api/baseApi.ts`), constants API, the theme, and the shared presentational components in `shared/components/`. Don't add to it without asking (see primary rule 2).
- **Use the shared components instead of writing these by hand:** `LoadingSpinner` and `ErrorMessage` (optional `message`) for a page or list that's loading or failed, `EmptyState` for "nothing here", and in list pages `SearchInput`, `FilterDropdown` (the Filter button, count badge, Clear and popover) and `FilterCheckboxGroup` (one titled list of checkboxes). They only render. The list keeps its own filter state, the options to show and the filtering logic. A missing record still shows `NotFound`. There is no shared list, form or detail component: those stay written out per domain.

## State

- **Server data goes through RTK Query.** Use local `useState` for UI and form state. Don't add Redux slices or context for something that is only needed locally. Ask first if global state seems necessary.
- **There is one RTK Query API, `baseApi` in `shared/api/baseApi.ts`.** Don't add another `createApi`. A domain adds endpoints with `baseApi.injectEndpoints` in its own `api/` file, written out in full (no endpoint factories). `store.ts` registers only `baseApi`.
- `baseApi` owns the setup: relative `baseUrl`, `credentials: "include"`, and the one list of `tagTypes`. A new tag type goes in that list. Lists provide `{ type, id: "LIST" }`, single records provide `{ type, id }`, and mutations invalidate the matching tags. Since every domain shares one cache, a mutation can invalidate another domain's tags directly (for example `"Auth"` after a profile change).
- Game enums come from `useGetConstantsQuery()`. Never hard-code them.

## Auth

- The current user comes from `authApi`'s `useGetCurrentUserQuery`. `features/auth/ProtectedRoute.tsx` gates routes and redirects to `/login` or `/forbidden` based on `roles`.
- **Logout and expired sessions clear the whole cache** with `baseApi.util.resetApiState()`, public library data included. `app/layouts/Navbar.tsx` does it on logout. `baseApi`'s base query does it when any request gets a 401 while a current user is cached (the server sends 401 only when the session is gone, and 403 for a role that isn't allowed). Nothing per-API needs adding.
- Keep requests relative (empty `VITE_API_URL`). See the cookie note in the root CLAUDE.md.

## Forms

- Domain forms are split into section components that share one `useState` object owned by the form. The form defines its change handlers inline and passes them to the sections as props. Follow the existing `<X>Form` + sections pattern, using `features/powers/` as the reference.

## Styling

- Tailwind utility classes inline. Colors and roles are defined in `shared/styles/theme.ts` (for example, red is reserved for logout and destructive actions). Dark and light mode come from `ThemeContext`.
