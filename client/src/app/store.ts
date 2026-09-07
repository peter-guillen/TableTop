import { configureStore } from "@reduxjs/toolkit";

import { constantsApi } from "../shared/api/constantsApi.js";
import { authApi } from "../features/auth/api/authApi.js";
import { userApi } from "../features/users/api/userApi.tsx";

import { archetypeApi } from "../features/archetypes/api/archetypeApi.js";
import { armorApi } from "../features/armors/api/armorApi.jsx";
import { articleApi } from "../features/articles/api/articleApi.tsx";
import { backgroundApi } from "../features/backgrounds/api/backgroundApi.js";
import { characterApi } from "../features/characters/api/characterApi.js";
import { conditionApi } from "../features/conditions/api/conditionApi.ts";
import { itemApi } from "../features/items/api/itemApi.tsx";
import { libraryApi } from "../features/library/api/libraryApi.tsx";
import { powerApi } from "../features/powers/api/powerApi.js";
import { professionApi } from "../features/professions/api/professionApi.js";
import { speciesApi } from "../features/species/api/speciesApi.js";
import { spellApi } from "../features/spells/api/spellApi.js";
import { traitApi } from "../features/traits/api/traitApi.js";
import { weaponApi } from "../features/weapons/api/weaponApi.js";

export const store = configureStore({
  reducer: {
    [constantsApi.reducerPath]: constantsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    [archetypeApi.reducerPath]: archetypeApi.reducer,
    [armorApi.reducerPath]: armorApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
    [backgroundApi.reducerPath]: backgroundApi.reducer,
    [characterApi.reducerPath]: characterApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
    [conditionApi.reducerPath]: conditionApi.reducer,
    [libraryApi.reducerPath]: libraryApi.reducer,
    [powerApi.reducerPath]: powerApi.reducer,
    [professionApi.reducerPath]: professionApi.reducer,
    [speciesApi.reducerPath]: speciesApi.reducer,
    [spellApi.reducerPath]: spellApi.reducer,
    [traitApi.reducerPath]: traitApi.reducer,
    [weaponApi.reducerPath]: weaponApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      constantsApi.middleware,
      authApi.middleware,
      userApi.middleware,

      archetypeApi.middleware,
      armorApi.middleware,
      articleApi.middleware,
      backgroundApi.middleware,
      characterApi.middleware,
      itemApi.middleware,
      conditionApi.middleware,
      libraryApi.middleware,
      powerApi.middleware,
      professionApi.middleware,
      speciesApi.middleware,
      spellApi.middleware,
      traitApi.middleware,
      weaponApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
