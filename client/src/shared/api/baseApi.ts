import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

// Empty in development and production: requests stay relative so the auth
// cookie is first-party (see the cookie note in the root CLAUDE.md)
const API_URL = import.meta.env.VITE_API_URL || "";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
});

// The server answers 401 only when the session is gone (no token, revoked,
// tokenVersion bumped, or the user was deleted). A role that isn't allowed
// gets 403 instead. So a 401 while a user is cached means this browser's
// session ended: clear every cache, including the current user, so no private
// data stays in memory and ProtectedRoute sends the visitor to /login.
// Logged-out visitors are skipped, so their 401s can't start a reset loop.
const baseQueryWithReset: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const state = api.getState() as {
      api: {
        queries: Record<string, { endpointName?: string; data?: unknown }>;
      };
    };
    const hasCachedUser = Object.values(state.api.queries).some(
      (query) => query?.endpointName === "getCurrentUser" && query.data,
    );
    if (hasCachedUser) {
      api.dispatch(baseApi.util.resetApiState());
    }
  }

  return result;
};

// The one RTK Query API. Each domain adds its own endpoints in
// features/<domain>/api/ with baseApi.injectEndpoints, so there is one cache,
// one 401 handler, and tags that work across domains.
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReset,
  tagTypes: [
    "Article",
    "Auth",
    "Background",
    "Character",
    "Condition",
    "Item",
    "Power",
    "Profession",
    "Species",
    "User",
  ],
  endpoints: () => ({}),
});
