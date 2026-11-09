# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Primary rules

These override defaults and apply to every task.

1. **Ask me for decisions and clarity.** When a request is ambiguous, or there's more than one reasonable approach (schema shape, embed vs. reference, where state lives, naming, UX behavior), stop and ask before writing code. Don't guess and don't pick silently.
2. **Avoid abstraction and helper functions.** Write code inline, where it is used, even if that means some repetition across domains. Don't add new helpers, utility modules, wrappers, base classes, or generic hooks/components. Using the patterns that already exist (the server service layer, `useFormHandlers`, the RTK Query API per domain) is fine. Creating new shared layers is not, unless I ask for one.
   - **Exception: shared infrastructure.** Code that encodes one policy and must behave the same everywhere may be shared: the single base RTK Query API (ROADMAP item 29), central role permissions (item 30), and small presentational UI pieces (item 31). Everything else stays inline: domain logic, services, endpoint definitions, form sections, and filters. No generic CRUD services, endpoint factories, or config-driven "entity" components.
3. **Show your work.**
   - **Before editing:** say what will change, in which files, and why.
   - **Tradeoffs:** when there was more than one way to do it, say which was picked and why.
   - **Verification:** show the commands actually run (tests, type-check, build) and their real output, including failures.
   - **After:** list each file touched and what changed in it.

## Overview

RPGHub: a full-stack companion app for a custom TTRPG system (powers, items, species, backgrounds, professions, conditions, characters). Two independently deployed packages that share no code:

- `server/`: Node + Express + Mongoose, ESM JavaScript, deployed on Railway. See [server/CLAUDE.md](server/CLAUDE.md).
- `client/`: React 18 + Vite + Redux Toolkit / RTK Query + Tailwind, deployed on Netlify. See [client/CLAUDE.md](client/CLAUDE.md).

Install and run each package from its own directory (`npm install`, `npm run dev`). In development, the client proxies `/api` to the server on port 1234.

## Things that span both packages

- **Game constants live on the server.** `server/shared/constants/constants.js` is the source of truth for game enums (stats, damage types, effect types, ...). The client gets them at runtime from `GET /api/constants`. Never copy them into the client.
- **The auth cookie must stay first-party.** In production, `client/public/_redirects` proxies `/api/*` to the Railway backend, so the client and API share an origin and the `token` cookie can be `SameSite=Lax` (iOS Safari blocks third-party cookies). Keep client API calls relative, and don't switch the cookie to `SameSite=None` or call the Railway URL directly.
- **Contract changes touch both sides.** Changing a Mongoose model or a response shape means updating the matching `client/src/features/<domain>/<x>Types.ts` and `<x>Defaults.ts` in the same change.
- **Role names** (`admin`, `moderator`, `editor`, `user`, `guest`) are checked on both sides: server route middleware and the client `ProtectedRoute`. Keep them in sync. New accounts start as `user`. `guest` stays assignable by admins (for example, for an account being closed) but is never the default.

## Roadmap

Cleanup goals, in priority order, are in [ROADMAP.md](ROADMAP.md). Check it before starting cleanup work, and tick items off when they're done.

## Known issues

- The README overclaims in places (see ROADMAP item 11). For example, it says `PORT=5000`, but the code and the Vite proxy use 1234. Trust the code. Don't add README claims the code doesn't back up.
