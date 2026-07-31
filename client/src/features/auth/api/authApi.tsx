import API_URL from "../../../shared/api/api";
import { UserFormData, UserType } from "../../users/userTypes";
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/api/auth`,
  credentials: "include",
});

const AUTH_TAG = "Auth" as const;

export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error?.status === 401 && api.endpoint !== "getCurrentUser") {
    api.dispatch(authApi.util.invalidateTags([AUTH_TAG]));
  }
  return result;
};

type LoginCredentials = Pick<UserFormData, "email" | "password">;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: [AUTH_TAG],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<UserType, void>({
      query: () => "/me",
      providesTags: [AUTH_TAG],
    }),

    login: builder.mutation<UserType, LoginCredentials>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [AUTH_TAG],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: [AUTH_TAG],
    }),
  }),
});

export const { useGetCurrentUserQuery, useLoginMutation, useLogoutMutation } =
  authApi;
