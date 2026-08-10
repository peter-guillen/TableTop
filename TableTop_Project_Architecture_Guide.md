# TableTop Project Architecture

> Quick-reference architecture map for the TableTop full-stack application.

```text
TableTop/
│
├── client/
│   │
│   ├── public/
│   ├── _redirects
│   ├── vite.svg
│   │
│   ├── src/
│   │   │
│   │   ├── app/
│   │   │   └── contexts/
│   │   │       └── ThemeContext.tsx
│   │   │
│   │   ├── layouts/
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Navbar.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── About.tsx
│   │   │   ├── Forbidden.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── LandingPage.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── NotFound.tsx
│   │   │   └── Register.tsx
│   │   │
│   │   ├── App.tsx
│   │   ├── store.ts
│   │   │
│   │   ├── assets/
│   │   │   └── react.svg
│   │   │
│   │   ├── features/
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── components/
│   │   │   │   ├── ActivityLog.tsx
│   │   │   │   ├── AdminNav.tsx
│   │   │   │   ├── AdminRoutes.tsx
│   │   │   │   ├── AdminTable.tsx
│   │   │   │   ├── DashboardExample.tsx
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   └── pages/
│   │   │   │       └── AdminPage.tsx
│   │   │   │
│   │   │   ├── affinities/
│   │   │   ├── armors/
│   │   │   ├── articles/
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── api/
│   │   │   │   ├── authApi.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   │
│   │   │   ├── backgrounds/
│   │   │   ├── characters/
│   │   │   ├── conditions/
│   │   │   │
│   │   │   ├── library/
│   │   │   │   ├── api/
│   │   │   │   │   └── libraryApi.jsx
│   │   │   │
│   │   │   ├── playerTools/
│   │   │   │   └── components/
│   │   │   │       └── Rules.tsx
│   │   │   │
│   │   │   ├── professions/
│   │   │   ├── species/
│   │   │   │
│   │   │   ├── spells/
│   │   │   │   ├── api/
│   │   │   │   │   └── spellApi.tsx
│   │   │   │   │
│   │   │   │   ├── components/
│   │   │   │   │   ├── SpellBasicInfoSection.tsx
│   │   │   │   │   ├── SpellCastingSection.tsx
│   │   │   │   │   ├── SpellCombatSection.tsx
│   │   │   │   │   ├── SpellConditionsSection.tsx
│   │   │   │   │   ├── SpellDescriptionSection.tsx
│   │   │   │   │   ├── SpellList.tsx
│   │   │   │   │   └── SpellPreview.tsx
│   │   │   │   │
│   │   │   │   ├── pages/
│   │   │   │   │   ├── SpellDetails.tsx
│   │   │   │   │   ├── SpellForm.tsx
│   │   │   │   │   └── SpellPage.tsx
│   │   │   │   │
│   │   │   │   ├── spellDefaults.ts
│   │   │   │   └── spellTypes.ts
│   │   │   │
│   │   │   ├── traits/
│   │   │   │
│   │   │   ├── users/
│   │   │   │   ├── api/
│   │   │   │   │   └── userApi.tsx
│   │   │   │   ├── pages/
│   │   │   │   │   └── UserPage.tsx
│   │   │   │   └── userTypes.ts
│   │   │   │
│   │   │   └── weapons/
│   │   │
│   │   ├── shared/
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── vite-env.d.ts
│   │
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── README.md
│   ├── file.ts
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.js
│
└── server/
    │
    ├── domains/
    │   ├── activity/
    │   ├── affinities/
    │   ├── armors/
    │   ├── articles/
    │   ├── auth/
    │   ├── backgrounds/
    │   ├── characters/
    │   ├── conditions/
    │   ├── library/
    │   ├── professions/
    │   ├── species/
    │   │
    │   ├── spells/
    │   │   ├── spell.controller.js
    │   │   ├── spell.controller.test.js
    │   │   ├── spell.model.js
    │   │   ├── spell.routes.js
    │   │   ├── spell.service.js
    │   │   └── spell.service.test.js
    │   │
    │   ├── traits/
    │   ├── users/
    │   └── weapons/
    │
    ├── seeds/
    │
    ├── shared/
    │   │
    │   ├── constants/
    │   │   ├── constants.controller.js
    │   │   ├── constants.js
    │   │   └── constants.routes.js
    │   │
    │   ├── middlewares/
    │   │   ├── checkAuthenticated.js
    │   │   ├── checkAuthenticated.test.js
    │   │   ├── checkAuthorization.js
    │   │   ├── jwtoken.js
    │   │   └── validateObjectId.js
    │   │
    │   ├── schemas/
    │   │   ├── healthEffectSchema.js
    │   │   └── statModifierSchema.js
    │   │
    │   └── utils/
    │       ├── logger.js
    │       └── migratePasswords.js
    │
    ├── .gitignore
    ├── app.js
    ├── package-lock.json
    ├── package.json
    ├── server.js
    ├── vitest.config.js
    └── README.md
```

## High-Level Structure

```text
TableTop
│
├── client
│   ├── Application / UI
│   ├── Pages
│   ├── Layouts
│   ├── Feature Modules
│   ├── State Management
│   ├── Contexts
│   └── Shared Frontend Resources
│
└── server
    ├── Domain Modules
    ├── Shared Infrastructure
    │   ├── Constants
    │   ├── Middleware
    │   ├── Schemas
    │   └── Utilities
    ├── Seed Data
    └── Application / Server Entry Points
```

## Domain Architecture

The backend is organized primarily around **domains**:

```text
server/domains/
│
├── activity
├── affinities
├── armors
├── articles
├── auth
├── backgrounds
├── characters
├── conditions
├── library
├── professions
├── species
├── spells
├── traits
├── users
└── weapons
```

The `spells` domain currently establishes the clearest example of the backend domain pattern:

```text
spells/
├── spell.controller.js
├── spell.controller.test.js
├── spell.model.js
├── spell.routes.js
├── spell.service.js
└── spell.service.test.js
```

This indicates a separation between:

- **Routes** — endpoint definitions
- **Controllers** — handling requests/responses
- **Services** — application/business logic
- **Models** — database/data definitions
- **Tests** — controller and service behavior

## Frontend Feature Architecture

The frontend uses a feature-oriented organization:

```text
client/src/features/
│
├── admin/
├── affinities/
├── armors/
├── articles/
├── auth/
├── backgrounds/
├── characters/
├── conditions/
├── library/
├── playerTools/
├── professions/
├── species/
├── spells/
├── traits/
├── users/
└── weapons/
```

Features can contain their own:

```text
feature/
├── api/
├── components/
├── pages/
└── types / defaults / other feature-specific resources
```

The `spells` feature is currently the most developed example:

```text
spells/
├── api/
│   └── spellApi.tsx
│
├── components/
│   ├── SpellBasicInfoSection.tsx
│   ├── SpellCastingSection.tsx
│   ├── SpellCombatSection.tsx
│   ├── SpellConditionsSection.tsx
│   ├── SpellDescriptionSection.tsx
│   ├── SpellList.tsx
│   └── SpellPreview.tsx
│
├── pages/
│   ├── SpellDetails.tsx
│   ├── SpellForm.tsx
│   └── SpellPage.tsx
│
├── spellDefaults.ts
└── spellTypes.ts
```
