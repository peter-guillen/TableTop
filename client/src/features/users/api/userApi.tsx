import API_URL from "../../../shared/api/api";
import type { UserFormData, UserProfile, UserType } from "../userTypes"; // User = Omit<UserFormData, "password">
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../app/store.ts";
import { authApi } from "../../auth/api/authApi.tsx";

type NewUserInput = Omit<UserFormData, "_id" | "role">;
type UpdateUserInput = Partial<Omit<UserFormData, "_id">>;

export const userApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/users`,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserType[], void>({
      query: () => "/",
      providesTags: [{ type: "User", id: "LIST" }],
    }),

    getUserById: builder.query<UserType, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    createUser: builder.mutation<UserType, NewUserInput>({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
      // Signing up also logs the user in, so refresh the current user that
      // the Navbar and ProtectedRoute read from authApi
      async onQueryStarted(newUser, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authApi.util.invalidateTags(["Auth"]));
        } catch {
          // Failed signup: the Register page shows the error
        }
      },
    }),

    updateUser: builder.mutation<
      UserType,
      { id: string; data: UpdateUserInput }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    updateUserRole: builder.mutation<UserType, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: `/${id}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    updateMyProfile: builder.mutation<UserType, UserProfile>({
      query: (profile) => ({
        url: "/me/profile",
        method: "PATCH",
        body: { profile },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
      // The Navbar reads the current user from authApi, so refresh it too
      async onQueryStarted(profile, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(authApi.util.invalidateTags(["Auth"]));
      },
    }),

    deleteUser: builder.mutation<UserType, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
      async onQueryStarted(id, { dispatch, getState, queryFulfilled }) {
        await queryFulfilled;

        const currentUser = authApi.endpoints.getCurrentUser.select()(
          getState() as RootState,
        ).data;

        if (currentUser?._id === id) {
          dispatch(authApi.util.invalidateTags(["Auth"]));
        }
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateUserRoleMutation,
  useUpdateMyProfileMutation,
  useDeleteUserMutation,
} = userApi;
