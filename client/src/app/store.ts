import { configureStore } from "@reduxjs/toolkit";

import { constantsApi } from "../shared/constants/api/constantsApi.js";
import { authApi } from "../features/auth/api/authApi.js";
import { userApi } from "../features/users/api/userApi.tsx";

import { articleApi } from "../features/articles/api/articleApi.tsx";
import { backgroundApi } from "../features/backgrounds/api/backgroundApi.js";
import { characterApi } from "../features/characters/api/characterApi.js";
import { conditionApi } from "../features/conditions/api/conditionApi.ts";
import { itemApi } from "../features/items/api/itemApi.tsx";
import { powerApi } from "../features/powers/api/powerApi.js";
import { professionApi } from "../features/professions/api/professionApi.js";
import { speciesApi } from "../features/species/api/speciesApi.js";

export const store = configureStore({
  reducer: {
    [constantsApi.reducerPath]: constantsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    [articleApi.reducerPath]: articleApi.reducer,
    [backgroundApi.reducerPath]: backgroundApi.reducer,
    [characterApi.reducerPath]: characterApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
    [conditionApi.reducerPath]: conditionApi.reducer,
    [powerApi.reducerPath]: powerApi.reducer,
    [professionApi.reducerPath]: professionApi.reducer,
    [speciesApi.reducerPath]: speciesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      constantsApi.middleware,
      authApi.middleware,
      userApi.middleware,

      articleApi.middleware,
      backgroundApi.middleware,
      characterApi.middleware,
      itemApi.middleware,
      conditionApi.middleware,
      powerApi.middleware,
      professionApi.middleware,
      speciesApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
