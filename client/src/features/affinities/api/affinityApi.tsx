import API_URL from "../../../shared/api/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Affinity {
  _id?: string;
  name: string;
  description: string;
}

export const affinityApi = createApi({
  reducerPath: "affinityApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Affinity"],
  endpoints: (builder) => ({
    getAllAffinities: builder.query<Affinity[], void>({
      query: () => "/api/affinities",
      providesTags: [{ type: "Affinity", id: "LIST" }],
    }),

    getAffinityById: builder.query<Affinity, string>({
      query: (id) => `/api/affinities/${id}`,
      providesTags: (result, error, id) => [{ type: "Affinity", id }],
    }),

    createAffinity: builder.mutation<Affinity, Affinity>({
      query: (newAffinity) => ({
        url: "/api/affinities",
        method: "POST",
        body: newAffinity,
      }),
      invalidatesTags: [{ type: "Affinity", id: "LIST" }],
    }),

    updateAffinity: builder.mutation<Affinity, { id: string; data: Affinity }>({
      query: ({ id, data }) => ({
        url: `/api/affinities/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Affinity", id },
        { type: "Affinity", id: "LIST" },
      ],
    }),

    deleteAffinity: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/affinities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Affinity", id },
        { type: "Affinity", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllAffinitiesQuery,
  useGetAffinityByIdQuery,
  useCreateAffinityMutation,
  useUpdateAffinityMutation,
  useDeleteAffinityMutation,
} = affinityApi;
