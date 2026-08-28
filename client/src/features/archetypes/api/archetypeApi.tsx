import API_URL from "../../../shared/api/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Archetype {
  _id?: string;
  name: string;
  description: string;
}

export const archetypeApi = createApi({
  reducerPath: "archetypeApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Archetype"],
  endpoints: (builder) => ({
    getAllArchetypes: builder.query<Archetype[], void>({
      query: () => "/api/affinities",
      providesTags: [{ type: "Archetype", id: "LIST" }],
    }),

    getArchetypeById: builder.query<Archetype, string>({
      query: (id) => `/api/affinities/${id}`,
      providesTags: (result, error, id) => [{ type: "Archetype", id }],
    }),

    createArchetype: builder.mutation<Archetype, Archetype>({
      query: (newArchetype) => ({
        url: "/api/affinities",
        method: "POST",
        body: newArchetype,
      }),
      invalidatesTags: [{ type: "Archetype", id: "LIST" }],
    }),

    updateArchetype: builder.mutation<
      Archetype,
      { id: string; data: Archetype }
    >({
      query: ({ id, data }) => ({
        url: `/api/affinities/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Archetype", id },
        { type: "Archetype", id: "LIST" },
      ],
    }),

    deleteArchetype: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/affinities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Archetype", id },
        { type: "Archetype", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllArchetypesQuery,
  useGetArchetypeByIdQuery,
  useCreateArchetypeMutation,
  useUpdateArchetypeMutation,
  useDeleteArchetypeMutation,
} = archetypeApi;
