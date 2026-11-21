import type { Species } from "../speciesTypes";
import { baseApi } from "../../../shared/api/baseApi.ts";

export const speciesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSpecies: builder.query<Species[], void>({
      query: () => "/api/species",
      providesTags: [{ type: "Species", id: "LIST" }],
    }),

    getSpeciesById: builder.query<Species, string>({
      query: (id) => `/api/species/${id}`,
      providesTags: (result, error, id) => [{ type: "Species", id }],
    }),

    createSpecies: builder.mutation<Species, Species>({
      query: (newSpecies) => ({
        url: "/api/species",
        method: "POST",
        body: newSpecies,
      }),
      invalidatesTags: [{ type: "Species", id: "LIST" }],
    }),

    updateSpecies: builder.mutation<Species, { id: string; data: Species }>({
      query: ({ id, data }) => ({
        url: `/api/species/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Species", id },
        { type: "Species", id: "LIST" },
      ],
    }),

    deleteSpecies: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/species/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Species", id },
        { type: "Species", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllSpeciesQuery,
  useGetSpeciesByIdQuery,
  useCreateSpeciesMutation,
  useUpdateSpeciesMutation,
  useDeleteSpeciesMutation,
} = speciesApi;
