import API_URL from "../../../shared/api/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const armorApi = createApi({
  reducerPath: "armorApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
  tagTypes: ["Armor"],
  endpoints: (builder) => ({
    getArmors: builder.query({
      query: () => "/armors",
      providesTags: [{ type: "Armor", id: "LIST" }],
    }),

    getArmor: builder.query({
      query: (id) => `/armors/${id}`,
      providesTags: (result, error, id) => [{ type: "Armor", id }],
    }),

    createArmor: builder.mutation({
      query: (formData) => ({
        url: "/armors",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Armor", id: "LIST" }],
    }),

    updateArmor: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/armors/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Armor", id },
        { type: "Armor", id: "LIST" },
      ],
    }),

    deleteArmor: builder.mutation({
      query: (id) => ({
        url: `/armors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Armor", id },
        { type: "Armor", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetArmorsQuery,
  useGetArmorQuery,
  useCreateArmorMutation,
  useUpdateArmorMutation,
  useDeleteArmorMutation,
} = armorApi;
