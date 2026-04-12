import { configureStore } from "@reduxjs/toolkit";
import { weaponApi } from "../features/weapons/api/weaponApi.jsx";
import { spellApi } from "../features/spells/api/spellApi.js";
import { armorApi } from "../features/armors/api/armorApi.jsx";
import { professionApi } from "../features/professions/api/professionApi.js";

export const store = configureStore({
  reducer: {
    [weaponApi.reducerPath]: weaponApi.reducer,
    [spellApi.reducerPath]: spellApi.reducer,
    [armorApi.reducerPath]: armorApi.reducer,
    [professionApi.reducerPath]: professionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      weaponApi.middleware,
      spellApi.middleware,
      armorApi.middleware,
      professionApi.middleware,
    ),
});
