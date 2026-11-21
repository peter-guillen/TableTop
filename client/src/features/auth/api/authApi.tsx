import { UserFormData, UserType } from "../../users/userTypes";
import { baseApi } from "../../../shared/api/baseApi.ts";

type LoginCredentials = Pick<UserFormData, "email" | "password">;

// A 401 from any endpoint is handled once, in shared/api/baseApi.ts
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<UserType, void>({
      query: () => "/api/auth/me",
      providesTags: ["Auth"],
    }),

    login: builder.mutation<UserType, LoginCredentials>({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useGetCurrentUserQuery, useLoginMutation, useLogoutMutation } =
  authApi;
