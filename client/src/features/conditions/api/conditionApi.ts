import API_URL from "../../../shared/api/api.js";
import type { Condition } from "../conditionTypes.ts";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const conditionApi = createApi({
  reducerPath: "conditionApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Condition"],
  endpoints: (builder) => ({
    getAllConditions: builder.query<Condition[], void>({
      query: () => "/api/conditions",
      providesTags: [{ type: "Condition", id: "LIST" }],
    }),

    getConditionById: builder.query<Condition, string>({
      query: (id) => `/api/conditions/${id}`,
      providesTags: (result, error, id) => [{ type: "Condition", id }],
    }),

    createCondition: builder.mutation<Condition, Condition>({
      query: (newCondition) => ({
        url: "/api/conditions",
        method: "POST",
        body: newCondition,
      }),
      invalidatesTags: [{ type: "Condition", id: "LIST" }],
    }),

    updateCondition: builder.mutation<
      Condition,
      { id: string; data: Condition }
    >({
      query: ({ id, data }) => ({
        url: `/api/conditions/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Condition", id },
        { type: "Condition", id: "LIST" },
      ],
    }),

    deleteCondition: builder.mutation<Condition, string>({
      query: (id) => ({
        url: `/api/conditions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Condition", id },
        { type: "Condition", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllConditionsQuery,
  useGetConditionByIdQuery,
  useCreateConditionMutation,
  useUpdateConditionMutation,
  useDeleteConditionMutation,
} = conditionApi;
