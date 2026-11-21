import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "../shared/api/baseApi.ts";

// Every domain injects its endpoints into baseApi, so it is the only API to
// register here. Don't add another createApi: use baseApi.injectEndpoints.
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
