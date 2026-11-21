import type { UserFormData, UserProfile, UserType } from "../userTypes"; // User = Omit<UserFormData, "password">
import { baseApi } from "../../../shared/api/baseApi.ts";

type NewUserInput = Omit<UserFormData, "_id" | "role">;

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserType[], void>({
      query: () => "/api/users",
      providesTags: [{ type: "User", id: "LIST" }],
    }),

    // Signing up also logs the user in, so "Auth" refreshes the current user
    // that the Navbar and ProtectedRoute read
    createUser: builder.mutation<UserType, NewUserInput>({
      query: (newUser) => ({
        url: "/api/users/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }, "Auth"],
    }),

    updateUserRole: builder.mutation<UserType, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: `/api/users/${id}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    // The Navbar shows the current user's name, so refresh "Auth" too
    updateMyProfile: builder.mutation<UserType, UserProfile>({
      query: (profile) => ({
        url: "/api/users/me/profile",
        method: "PATCH",
        body: { profile },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }, "Auth"],
    }),

    // "Auth" refreshes the current user in case an admin deleted themselves.
    // Their next /me gets a 401, and baseApi then clears every cache
    deleteUser: builder.mutation<UserType, string>({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
        "Auth",
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserRoleMutation,
  useUpdateMyProfileMutation,
  useDeleteUserMutation,
} = userApi;
