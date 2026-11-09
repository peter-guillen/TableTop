# RPGHub Roadmap

Cleanup goals from the full re-review (2026-11-07). Items are numbered in the order to do them. The first goal (items 1–11) is a live site that **can't be crashed, can't be brute-forced, has green CI, and an accurate README**, all before any refactoring.

Check items off as they land; delete ones that become irrelevant.

## Baseline (2026-11-07)

| Measure | Value |
| --- | --- |
| Server tests | 58 passing, 2 failing (item 3) |
| Server coverage | 53% lines, 29% branches |
| Unauthenticated crash points | 24 (item 2) |
| Client type errors / lint / tests | 16 / broken / 0 |
| Client bundle | 657 KB, one file |

## 1. Stop the bleeding: live site safe and accurate

- [ ] **1. Deploy `auth-sessions`.** Merge to get logout revocation, the cache clear on logout, and the second dead-code pass live. Everyone has to log in once more. (Live today: a token reused after logout still returns 200, and `/api/traits` still responds.)
- [ ] **2. Crash points.** Error handling only. Moving these domains to the service layer is item 28.
  - Add error handling to the 20 async handlers that have none (articles, backgrounds, professions, species, users, auth).
  - Add `validateObjectId` to the 4 `GET /:id` routes that lack it.
  - Make the article and species create handlers respond on error instead of hanging.
- [ ] **3. Fix the 2 character tests.** They're out of date: they expect `user` (the code uses `userId`) and a 400 (the code returns 500).
- [ ] **4. Rate limiting** on login and signup. Set Express `trust proxy` so limits apply per visitor behind Netlify. (Live today: 6 bad logins in a row were never blocked.)
  - Requests pass through Netlify and Railway's edge, so check the real `X-Forwarded-For` chain before choosing the hop count. Too low and every visitor shares one limit. Too high and clients can fake their IP.
- [ ] **5. Server-side auth validation.**
  - Make emails lowercase and trimmed.
  - Make usernames unique.
  - Set password length limits, including bcrypt's 72-byte cutoff.
  - Change the login error that says "username" when login uses email.
- [ ] **6. Startup checks.**
  - Refuse to start without `JWT_SECRET` and `PEPPER`.
  - Load `.env` before `app.js` runs. Today `app.js` reads `CLIENT_URL` before `dotenv.config()`, because ESM imports load first.
- [ ] **7. Dependency vulnerabilities.** Server: 1 critical, 1 high and 1 moderate, all in Express's dependencies. Client: 2 moderate.
- [ ] **8. Client type check.** Fix the 16 type errors first, then make `npm run build` run the type check. In the other order, the next Netlify deploy fails.
- [ ] **9. Lint.** Migrate to ESLint 9's flat config, and extend the script to `.ts` and `.tsx`.
- [ ] **10. CI.** GitHub Actions running lint, the type check, server tests and the build, plus a status badge. Add client tests to CI once item 24 exists.
- [ ] **11. README accuracy.**
  - Remove "production-grade" until items 2, 7 and 10 are done (crash points, dependency vulnerabilities, CI).
  - Remove "backend migrating to TypeScript" (the server has no TS) and "RTK Query + slices" (there are no slices).
  - Change "past 15 domains" to 11.
  - Change `PORT=5000` to 1234.
  - Add `CLIENT_URL` and `VITE_API_URL`.
  - `cd rpghub` won't work until the repo is renamed (see Housekeeping).
  - Add license and contact details.

## 2. Finish auth

- [ ] **12. Login and signup experience.**
  - Add required fields, a loading state and double-submit protection.
  - Show specific signup errors, like an email that's already taken.
  - Return users to the page they wanted after login.
  - Redirect logged-in users away from the login and signup pages.
- [ ] **13. `ProtectedRoute`.** Stop remounting the page on background refetches, and stop treating server errors as "logged out".
- [ ] **14. Expired sessions.** When a session expires, per-user caches aren't cleared, and only `authApi` reacts to a 401. Best fixed together with item 29.
- [ ] **15. Password change.** Bump `tokenVersion` to log out the user's other devices.
- [ ] **16. Move the demo account off `rpg.com`**, a real domain someone else owns. Do this before any emails go out.
- [ ] **17. Password reset and email verification.** These need an email service.

## 3. Engineering signals: tests, hardening, operations

- [ ] **18. Server tests.**
  - Add controller tests for articles, backgrounds, professions, species and users.
  - Raise branch coverage above 29%.
  - Add tests against a real database, for example `mongodb-memory-server`.
- [ ] **19. helmet.** Security headers, which also removes the `x-powered-by: Express` header.
- [ ] **20. Schema validation for content bodies.** Editor input currently goes straight into the database.
- [ ] **21. Server-side game rules.** `minLevel`, leveling rewards and slot limits are only checked in the client, and `requiredTraits` isn't checked anywhere.
- [ ] **22. Database indexes and pagination.** There are none today.
- [ ] **23. Operations.**
  - Add a health endpoint and structured logging.
  - Shut down cleanly.
  - Exit when the DB connection fails, instead of staying up without listening.
- [ ] **24. Client tests.** Vitest + React Testing Library, plus Playwright flows for signup, building a character and an admin edit.
- [ ] **25. Client resilience.** Route error boundaries, plus code splitting to shrink the 657 KB bundle.
- [ ] **26. Local setup.** Docker Compose, an `npm run seed` script, and a guard that stops seeds from running against production.
- [ ] **27. Rename the `test` database.** (You're handling this.)
- [ ] **28. Service layer for the older domains.** Articles, backgrounds, professions, species, characters, users and auth have no service. Move each one to the pattern in `domains/powers/`: the service owns the Mongoose calls and calls `logAction` on every write. Write each service out in full, with no generic CRUD service. Kept separate from item 2 so the crash fixes ship first.

## 4. Architecture

> **Decided (2026-11-08):** items 29–31 are allowed under the shared-infrastructure exception to primary rule 2. Share only the setup and policy (API base, 401 handling, permissions, small UI pieces). Endpoints, services and domain logic stay written out per domain.

- [ ] **29. One RTK Query API** instead of 11, with each domain adding its endpoints through `injectEndpoints`. This brings one 401 handler, a one-call logout reset and tags that work across domains. Fixes item 14.
- [ ] **30. Central roles.** Replace the 60 hardcoded role arrays with permissions returned from `/me`.
- [ ] **31. Shared UI, kept small.** Only presentational pieces that repeat unchanged, such as loading, error and empty states, a search input and a filter dropdown. No generic list, form or detail component; those stay per domain.
- [ ] **32. TypeScript.** Convert the 16 remaining client JS files. Convert the server only if you keep that README claim.

## 5. Polish

- [ ] **33. Site metadata.** A real favicon (it's still the Vite logo), a meta description and Open Graph tags.
- [ ] **34. README visuals.** Screenshots or a GIF, an architecture diagram, and short decision records about the embed vs. reference reasoning.
- [ ] **35. Repo files.** A `LICENSE` and a root `.gitignore`.

## 6. Product

- [ ] **36. Character tracker.** Finish the builder, then add a live tracker for HP, MP and conditions during play.
- [ ] **37. Sharing.** A public read-only character link and a PDF export.

## Housekeeping (not code)

- [ ] Delete the stale remote branches: `Testing`, `admin-features`, `character-features`, `weapons-features`.
- [ ] Delete the local `login` branch.
- [ ] Rename the GitHub repo to RPGHub (then fix `cd rpghub` in the README).
- [ ] Move the repo out of `~/Documents` so iCloud stops making copies.
