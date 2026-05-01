import API_URL from "../../../shared/api/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Trait {
  _id?: string;
  name: string;
  description: string;
}

export const traitApi = createApi({
  reducerPath: "traitApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Trait"],
  endpoints: (builder) => ({
    getAllTraits: builder.query<Trait[], void>({
      query: () => "/api/traits",
      providesTags: [{ type: "Trait", id: "LIST" }],
    }),

    getTraitById: builder.query<Trait, string>({
      query: (id) => `/api/traits/${id}`,
      providesTags: (result, error, id) => [{ type: "Trait", id }],
    }),

    createTrait: builder.mutation<Trait, Trait>({
      query: (newTrait) => ({
        url: "/api/traits",
        method: "POST",
        body: newTrait,
      }),
      invalidatesTags: [{ type: "Trait", id: "LIST" }],
    }),

    updateTrait: builder.mutation<Trait, { id: string; data: Trait }>({
      query: ({ id, data }) => ({
        url: `/api/traits/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Trait", id },
        { type: "Trait", id: "LIST" },
      ],
    }),

    deleteTrait: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/traits/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Trait", id },
        { type: "Trait", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllTraitsQuery,
  useGetTraitByIdQuery,
  useCreateTraitMutation,
  useUpdateTraitMutation,
  useDeleteTraitMutation,
} = traitApi;
