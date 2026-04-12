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

// export const fetchWeapons = async () => {
//   const response = await fetch(`${API_URL}/api/weapons`);
//   const jsonResponse = response.json();
//   return jsonResponse;
// };

// export const fetchWeapon = async (id) => {
//   const response = await fetch(`${API_URL}/api/weapons/${id}`);
//   const jsonResponse = response.json();
//   return jsonResponse;
// };

// export const createWeapon = async (formData) => {
//   const response = await fetch(`${API_URL}/api/weapons`, {
//     method: "POST",
//     headers: { "Content-type": "application/json" },
//     body: JSON.stringify(formData),
//   });
//   if (!response.ok) {
//     throw new Error("Error creating new weapon");
//   }
//   return await response;
// };

// export const updateWeapon = async (id, formData) => {
//   const response = await fetch(`${API_URL}/api/weapons/${id}`, {
//     method: "PATCH",
//     headers: { "Content-type": "application/json" },
//     body: JSON.stringify(formData),
//   });
//   if (!response.ok) {
//     throw new Error("Error updating weapon");
//   }
//   return await response;
// };

// export const deleteWeapon = async (id) => {
//   const response = await fetch(`${API_URL}/api/weapons/${id}`, {
//     method: "DELETE",
//     headers: { "Content-type": "application/json" },
//   });
//   if (!response.ok) {
//     throw new Error("Error deleting weapon");
//   }
//   return await response.json();
// };
