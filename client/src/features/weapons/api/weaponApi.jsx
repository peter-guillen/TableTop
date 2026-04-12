import API_URL from "../../../shared/api/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weaponApi = createApi({
  reducerPath: "weaponApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
  tagTypes: ["Weapon"],
  endpoints: (builder) => ({
    getWeapons: builder.query({
      query: () => "/weapons",
      providesTags: [{ type: "Weapon", id: "LIST" }],
    }),

    getWeapon: builder.query({
      query: (id) => `/weapons/${id}`,
      providesTags: (result, error, id) => [{ type: "Weapon", id }],
    }),

    createWeapon: builder.mutation({
      query: (formData) => ({
        url: "/weapons",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Weapon", id: "LIST" }],
    }),

    updateWeapon: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/weapons/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Weapon", id },
        { type: "Weapon", id: "LIST" },
      ],
    }),

    deleteWeapon: builder.mutation({
      query: (id) => ({
        url: `/weapons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Weapon", id },
        { type: "Weapon", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetWeaponsQuery,
  useGetWeaponQuery,
  useCreateWeaponMutation,
  useUpdateWeaponMutation,
  useDeleteWeaponMutation,
} = weaponApi;
