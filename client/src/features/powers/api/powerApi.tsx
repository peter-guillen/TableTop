import type { Power } from "../powerTypes";
import { baseApi } from "../../../shared/api/baseApi.ts";

export const powerApi = baseApi.injectEndpoints({
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
