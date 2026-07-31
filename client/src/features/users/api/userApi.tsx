import API_URL from "../../../shared/api/api";
import type { UserFormData, UserType } from "../userTypes"; // User = Omit<UserFormData, "password">
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
  useDeleteUserMutation,
} = userApi;
