# Server rules

Express + Mongoose, ESM. The primary rules in the root [CLAUDE.md](../CLAUDE.md) still apply.

## Commands

```bash
npm run dev                 # nodemon server.js (defaults: port 1234, mongodb://127.0.0.1:27017/rpghub)
npm test                    # vitest run
npx vitest run domains/powers/power.service.test.js   # single file
npx vitest run -t "login sets a first-party cookie"   # single test by name
npm run test:coverage
node seeds/power.seed.js    # each seed is runnable directly; it WIPES that collection and reinserts
```

`.env`: `MONGODB_URI`, `JWT_SECRET`, `PEPPER` (read by `user.model.js` for password hashing). Optional: `PORT`, `CLIENT_URL` (CORS origin, default `http://localhost:5173`), `NODE_ENV`.

## Language

- **Stay in JavaScript.** The server is not being migrated to TypeScript yet. Don't add `.ts` files or TS tooling here.

## Structure

- `app.js` builds the Express app and mounts every router under `/api/<domain>`. `server.js` connects to Mongo and listens. Tests import `app.js` directly, so no DB connection is needed. A new domain must be mounted in `app.js`.
- Each domain lives in `domains/<name>/` as `<name>.model.js`, `<name>.routes.js`, `<name>.controller.js`, `<name>.service.js`, plus tests next to them.

## Domain rules

- **Every domain uses a service layer.** New domains start with one. Powers, items, and conditions already have one. The older domains (articles, backgrounds, professions, species, characters, users, auth) move to it in ROADMAP item 28. Until then, small fixes in them (like the error handling in item 2) don't require the migration.
  - The service owns all Mongoose calls. The controller only reads `req`, calls the service, and sends the response.
  - Every create/update/delete in a service calls `logAction` from `shared/utils/logger.js` with `{ userId, action, target, targetId, metadata: { before, after } }`. This feeds the `activity` domain.
  - Follow `domains/powers/` as the reference implementation. Write each domain's service out in full. Don't build a generic CRUD service or factory (see primary rule 2).
- **Controllers:** 404 when the service returns `null`. Reads return 400 with `{ error: error.message }` for bad input (`ValidationError`, `CastError`) and 500 for server failures such as the database being down. Writes pass errors to `next(error)`.
- **Every async handler catches its errors and always sends a response.** An uncaught rejection or a hanging request can take the live server down. Reads send their own 500; writes call `next(error)`, and the error handler at the end of `app.js` answers 400 for bad input (`ValidationError`, `CastError`, malformed JSON) or a generic 500. Keep that handler last in `app.js`.
- **Every `/:id` route uses `validateObjectId`**, including public GETs.
- **Route protection order:** `checkAuthenticated` → `checkAuthorization([...roles])` → `validateObjectId`. For library content, GET is public, POST/PATCH need `["admin", "moderator", "editor"]`, and DELETE needs `["admin", "moderator"]`.
- **Schema modeling is a decision. Ask me.** Choosing between embed and reference, or snapshot and live reference, is deliberate in this codebase. Example: `Power` keeps effects in three separate arrays (`healthEffects`, `statModifiers` with signed values for both buffs and debuffs, and `conditions` referencing `Condition`). Don't merge or reshape these without asking.
- **Requirements:** `minLevel` and `requiredTraits` exist on the power and item schemas, but the server enforces neither. `minLevel` is checked only in the client character builder. New game rules belong on the server too (ROADMAP item 21).

## Known issues

- `app.js` reads `CLIENT_URL` before `server.js` calls `dotenv.config()` (ESM imports run first), so `CLIENT_URL` from `.env` is ignored (ROADMAP item 6).
- The 2 failing character controller tests are out of date: they expect `user` (the code uses `userId`) and a 400 (the code returns 500). That's expected until ROADMAP item 3. Any other failure is real.
- The production database is named `test` (ROADMAP item 27).

## Auth

- The JWT lives in an HttpOnly `token` cookie (`SameSite=Lax`, `Secure` in production, 7-day expiry). `shared/middlewares/jwtoken.js` signs it with a `jti` (per-token id) and `tv` (the user's `tokenVersion`).
- `checkAuthenticated` rejects a token when it has no `jti`, when its `jti` is in `RevokedToken` (logout revokes one device), or when its `tv` doesn't match the user's current `tokenVersion` (bumping that revokes every session). It reloads the role from the DB on every request, so `checkAuthorization` sees role changes immediately.
- When clearing the cookie, pass the same options it was set with, as Express recommends for `clearCookie`. (Browsers match cookies by name, domain and path, so this is for consistency rather than something removal depends on.)

## Tests

- **Add or update Vitest tests with every server behavior change**, and show the `npm test` output.
- Service tests: `vi.mock` the model and `shared/utils/logger.js`, then assert on both the return value and the `logAction` call. See `domains/powers/power.service.test.js`.
- Controller tests: mock the service.
- Route/middleware tests: use supertest against the real `app`, `vi.spyOn` the model methods, and `vi.stubEnv` for `NODE_ENV`/`JWT_SECRET`. Restore everything in `afterEach`. See `domains/auth/auth.routes.test.js`.

## Seeds

- Power and item seeds hard-code real `Condition` `_id`s, so run `condition.seed.js` first, and update those ids if conditions are reseeded.
