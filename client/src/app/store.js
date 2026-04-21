import { configureStore } from "@reduxjs/toolkit";
import { weaponApi } from "../features/weapons/api/weaponApi.jsx";
import { spellApi } from "../features/spells/api/spellApi.js";
import { armorApi } from "../features/armors/api/armorApi.jsx";
import { professionApi } from "../features/professions/api/professionApi.js";
import { libraryApi } from "../features/library/api/libraryApi.jsx";

export const store = configureStore({
  reducer: {
    [libraryApi.reducerPath]: libraryApi.reducer,
    [weaponApi.reducerPath]: weaponApi.reducer,
    [spellApi.reducerPath]: spellApi.reducer,
    [armorApi.reducerPath]: armorApi.reducer,
    [professionApi.reducerPath]: professionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      libraryApi.middleware,
      weaponApi.middleware,
      spellApi.middleware,
      armorApi.middleware,
      professionApi.middleware,
    ),
});
