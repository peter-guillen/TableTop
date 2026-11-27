# RPGHub

A full-stack TTRPG companion application for browsing, managing, and building around RPGHub's custom RPG system — powers, items, species, backgrounds, professions, and character creation. Built as a portfolio project to demonstrate deliberate backend architecture, not just CRUD plumbing.

**Live app:** https://rpgtabletop.netlify.app/

## Why this project is more than a CRUD app

Most "TTRPG database" projects stop at models and endpoints. RPGHub is built around the actual design problems that show up once a domain gets complex:

- **Domain-Driven Design backend.** The server was migrated from a flat MVC structure to a DDD architecture once the project grew to 11 domains, with clear separation between domain logic and infrastructure concerns.
- **Deliberate schema modeling, not just Mongoose defaults.** The `Power` schema separates effects into three independent arrays (`healthEffects`, `statModifiers`, `conditions`) rather than one generic "effect" blob — `statModifiers` unifies buffs and debuffs through signed values instead of duplicating logic, and `Condition` was graduated from an embedded blob into its own referenced domain model once it needed independent lifecycle and reuse across powers.
- **Embedded vs. referenced, decided per case.** Document relationships (snapshot vs. live-reference, embed vs. reference) are chosen deliberately based on whether data needs to move with its parent or stay live and shared — not defaulted to whichever Mongoose pattern is easiest to write.
- **State architecture matches the data's shape.** Server data goes through RTK Query: one base API holds the shared setup (credentials, cache tags, 401 handling), and each domain injects its own endpoints. Everything else is local `useState`. There are no hand-written Redux slices, because no state needed one.
- **Shared constants without a shared codebase.** Because frontend and backend deploy independently (Netlify + Railway), backend constants are exposed through a dedicated `/api/constants` RTK Query endpoint instead of being duplicated or fragile-imported across the split deployment.

## Tech Stack

**Frontend:** React + Vite, TypeScript, Redux Toolkit / RTK Query, Tailwind CSS
**Backend:** Node.js + Express (JavaScript, ES modules), MongoDB + Mongoose, Domain-Driven Design architecture
**Auth:** JWT with session cookies
**Testing:** Vitest (backend unit/integration tests for services, controllers, and middleware)
**Deployment:** MongoDB Atlas · Netlify (frontend) · Railway (backend)

## Features

- **Power / Item / Species / Background / Profession Library** — browsable, searchable catalogs of custom game content
- **Admin Panel** — full CRUD for game content management, gated by role
- **Character Builder** — composes data across multiple library domains into a single character state
- **JWT Authentication** — session-cookie-based auth persistence
- **Dark/Light Theme** — persisted via cookies

## Project Structure

```
server/
├── domains/              # DDD-organized business domains (powers, items, characters, etc.)
├── shared/
│   └── middlewares/      # Authentication, authorization, and ID validation
└── ...

client/
└── src/
    ├── app/               # routes, layouts, top-level pages
    ├── features/          # feature-driven modules (admin, powers, items, characters)
    │   └── powers/
    │       ├── api/       # RTK Query endpoints
    │       └── pages/
    └── shared/
```

## Getting Started

**Try the live demo:** click **Try the demo** on the login page, or log in with email `demo@rpg.com` and password `demo`. The demo account is a regular user: it can browse the library and build characters.

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB (local or Atlas account)
- npm or yarn

### Installation

```bash
git clone <this-repo-url>
cd TableTop

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

Create a `.env` file in `server/`:

```env
PORT=1234
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PEPPER=your_pepper_value
CLIENT_URL=http://localhost:5173
```

`PORT` defaults to 1234, which the Vite dev proxy expects. `CLIENT_URL` is the origin allowed by CORS and defaults to `http://localhost:5173`.

The client reads one optional variable, `VITE_API_URL`, the base URL for API calls. Leave it unset: the client then calls `/api` on its own origin (the Vite proxy in development, Netlify's `_redirects` proxy in production), which keeps the auth cookie first-party.

Run both dev servers:

```bash
# server/
npm run dev

# client/
npm run dev
```

### Running tests

```bash
cd server
npm test
```

## API Overview

### Auth

| Method | Endpoint             | Description       | Auth |
| ------ | -------------------- | ----------------- | ---- |
| POST   | `/api/users/register` | Register new user | No   |
| POST   | `/api/auth/login`    | Login user        | No   |
| POST   | `/api/auth/logout`   | Logout user       | Yes  |
| GET    | `/api/auth/me`       | Get current user  | Yes  |

### Powers

| Method | Endpoint          | Description      | Auth       |
| ------ | ----------------- | ---------------- | ---------- |
| GET    | `/api/powers`     | Get all powers   | No         |
| GET    | `/api/powers/:id` | Get single power | No         |
| POST   | `/api/powers`     | Create power     | Editor+    |
| PATCH  | `/api/powers/:id` | Update power     | Editor+    |
| DELETE | `/api/powers/:id` | Delete power     | Moderator+ |

_(Items, species, backgrounds, professions, and conditions follow the same pattern.)_

### Constants

| Method | Endpoint         | Description                                                                                                     | Auth |
| ------ | ---------------- | --------------------------------------------------------------------------------------------------------------- | ---- |
| GET    | `/api/constants` | Backend-owned constants, shared with the frontend at runtime rather than duplicated across the split deployment | No   |

## User Roles

- **Admin** — everything a moderator can do, plus managing users and roles
- **Moderator** — everything an editor can do, plus deleting content and viewing the activity log
- **Editor** — creates and edits game content
- **User** — browses the library and builds characters (new accounts start here)
- **Guest** — browses the library only

## Development Status

Live and in active development. Core CRUD, auth, and admin tooling are complete and deployed. Current focus: hardening (rate limiting, CI, server-side validation; see [ROADMAP.md](ROADMAP.md)) and the character builder.

## Contributing

Issues and pull requests are welcome.

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## Contact

Questions or feedback — open an issue on GitHub.

## License

The code and the game content are licensed separately. See [LICENSE](LICENSE).

- **Code: MIT.** Everything under `client/` and `server/` is MIT-licensed, except the game content below.
- **Game content: all rights reserved.** The game system's design documents (`docs/design/`), its seed data (`server/seeds/`) and its rules text are not covered by the MIT License and may not be reused without permission.
