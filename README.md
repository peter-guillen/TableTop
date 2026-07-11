# RPGHub

A full-stack TTRPG companion application for browsing, managing, and building around a custom tabletop RPG system — spells, weapons, armor, and (in progress) character creation. Built as a portfolio project to demonstrate production-grade backend architecture, not just CRUD plumbing.

**Live app:** https://rpgtabletop.netlify.app/

## Why this project is more than a CRUD app

Most "TTRPG database" projects stop at models and endpoints. RPGHub is built around the actual design problems that show up once a domain gets complex:

- **Domain-Driven Design backend.** The server was migrated from a flat MVC structure to a DDD architecture once the project grew past 15 domains, with clear separation between domain logic, shared subdocument schemas, and infrastructure concerns.
- **Deliberate schema modeling, not just Mongoose defaults.** The `Power` schema separates effects into three independent arrays (`healthEffects`, `statModifiers`, `conditions`) rather than one generic "effect" blob — `statModifiers` unifies buffs and debuffs through signed values instead of duplicating logic, and `Condition` was graduated from an embedded blob into its own referenced domain model once it needed independent lifecycle and reuse across spells.
- **Embedded vs. referenced, decided per case.** Document relationships (snapshot vs. live-reference, embed vs. reference) are chosen deliberately based on whether data needs to move with its parent or stay live and shared — not defaulted to whichever Mongoose pattern is easiest to write.
- **State architecture matches the data's shape.** Redux (RTK Query + slices) is used where state is genuinely global and multi-domain (e.g., the character builder, which composes data across many library sources); local `useState` is used everywhere simpler. This is a conscious tradeoff, not one pattern applied everywhere.
- **Shared constants without a shared codebase.** Because frontend and backend deploy independently (Netlify + Railway), backend constants are exposed through a dedicated `/api/constants` RTK Query endpoint instead of being duplicated or fragile-imported across the split deployment.

## Tech Stack

**Frontend:** React + Vite, Redux Toolkit / RTK Query, Tailwind CSS, migrating to TypeScript
**Backend:** Node.js + Express, MongoDB + Mongoose, migrating to TypeScript, Domain-Driven Design architecture
**Auth:** JWT with session cookies
**Testing:** Vitest (backend unit/integration tests for services, controllers, and middleware)
**Deployment:** MongoDB Atlas · Netlify (frontend) · Railway (backend)

> **TypeScript migration:** Actively in progress across both frontend and backend, module by module (currently converted: shared hooks like `useFormHandlers` with generics, several form and admin components, backend schema layers). The project intentionally started in JavaScript and is migrating incrementally rather than as a rewrite, to keep the app shippable throughout.

## Features

- **Spell / Weapon / Armor Library** — browsable, searchable catalogs of custom game content
- **Admin Panel** — full CRUD for game content management, gated by role
- **Character Builder** _(in progress)_ — composes data across multiple library domains into a single character state
- **JWT Authentication** — session-cookie-based auth persistence
- **Dark/Light Theme** — persisted via cookies

### Planned

- Full character sheet management (tracker vs. builder split: builder handles deliberate configuration, tracker handles live mutable session state like current HP/MP and active conditions)
- Campaign management tools

## Project Structure

```
server/
├── domains/              # DDD-organized business domains (spells, characters, etc.)
├── shared/
│   └── schemas/          # Shared subdocument schemas (e.g. Condition, effect types)
└── ...

client/
└── src/
    ├── app/               # routes, layouts, top-level pages
    ├── features/          # feature-driven modules (admin, spells, weapons, armor, characters)
    │   └── spells/
    │       ├── api/       # RTK Query endpoints
    │       └── pages/
    └── shared/
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB (local or Atlas account)
- npm or yarn

### Installation

```bash
git clone <this-repo-url>
cd rpghub

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

Create a `.env` file in `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PEPPER=your_pepper_value
```

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
| POST   | `/api/auth/register` | Register new user | No   |
| POST   | `/api/auth/login`    | Login user        | No   |
| POST   | `/api/auth/logout`   | Logout user       | Yes  |
| GET    | `/api/auth/me`       | Get current user  | Yes  |

### Spells

| Method | Endpoint          | Description      | Auth  |
| ------ | ----------------- | ---------------- | ----- |
| GET    | `/api/spells`     | Get all spells   | No    |
| GET    | `/api/spells/:id` | Get single spell | No    |
| POST   | `/api/spells`     | Create spell     | Admin |
| PUT    | `/api/spells/:id` | Update spell     | Admin |
| DELETE | `/api/spells/:id` | Delete spell     | Admin |

_(Weapons and armor follow the same pattern.)_

### Constants

| Method | Endpoint         | Description                                                                                                     | Auth |
| ------ | ---------------- | --------------------------------------------------------------------------------------------------------------- | ---- |
| GET    | `/api/constants` | Backend-owned constants, shared with the frontend at runtime rather than duplicated across the split deployment | No   |

## User Roles

- **Admin** — full CRUD access to all game content
- **User** — read-only browsing of spells, weapons, and armor

## Development Status

Live and in active development. Core CRUD, auth, and admin tooling are complete and deployed. Current focus: TypeScript migration and the character builder/tracker system.

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

License to be determined.
