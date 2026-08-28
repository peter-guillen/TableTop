import API_URL from "../../../shared/api/api";
import type { Power } from "../powerTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const powerApi = createApi({
  reducerPath: "powerApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Power"],
  endpoints: (builder) => ({
    getAllPowers: builder.query<Power[], void>({
      query: () => "/api/powers",
      providesTags: [{ type: "Power", id: "LIST" }],
    }),

    getPowerById: builder.query<Power, string>({
      query: (id) => `/api/powers/${id}`,
      providesTags: (result, error, id) => [{ type: "Power", id }],
    }),

    createPower: builder.mutation<Power, Power>({
      query: (newPower) => ({
        url: "/api/powers",
        method: "POST",
        body: newPower,
      }),
      invalidatesTags: [{ type: "Power", id: "LIST" }],
    }),

    updatePower: builder.mutation<Power, { id: string; data: Power }>({
      query: ({ id, data }) => ({
        url: `/api/powers/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Power", id },
        { type: "Power", id: "LIST" },
      ],
    }),

    deletePower: builder.mutation<Power, string>({
      query: (id) => ({
        url: `/api/powers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Power", id },
        { type: "Power", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllPowersQuery,
  useGetPowerByIdQuery,
  useCreatePowerMutation,
  useUpdatePowerMutation,
  useDeletePowerMutation,
} = powerApi;
