import { configureStore } from "@reduxjs/toolkit";
import { affinityApi } from "../features/affinities/api/affinityApi.js";
import { armorApi } from "../features/armors/api/armorApi.jsx";
import { backgroundApi } from "../features/backgrounds/api/backgroundApi.jsx";
import { characterApi } from "../features/characters/api/characterApi.js";
import { libraryApi } from "../features/library/api/libraryApi.jsx";
import { professionApi } from "../features/professions/api/professionApi.js";
import { speciesApi } from "../features/species/api/speciesApi.js";
import { spellApi } from "../features/spells/api/spellApi.js";
import { traitApi } from "../features/traits/api/traitApi.js";
import { weaponApi } from "../features/weapons/api/weaponApi.jsx";

export const store = configureStore({
  reducer: {
    [affinityApi.reducerPath]: affinityApi.reducer,
    [armorApi.reducerPath]: armorApi.reducer,
    [backgroundApi.reducerPath]: backgroundApi.reducer,
    [characterApi.reducerPath]: characterApi.reducer,
    [libraryApi.reducerPath]: libraryApi.reducer,
    [professionApi.reducerPath]: professionApi.reducer,
    [speciesApi.reducerPath]: speciesApi.reducer,
    [spellApi.reducerPath]: spellApi.reducer,
    [traitApi.reducerPath]: traitApi.reducer,
    [weaponApi.reducerPath]: weaponApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      affinityApi.middleware,
      armorApi.middleware,
      backgroundApi.middleware,
      characterApi.middleware,
      libraryApi.middleware,
      professionApi.middleware,
      speciesApi.middleware,
      spellApi.middleware,
      traitApi.middleware,
      weaponApi.middleware,
    ),
});
