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
  }),
});

export const { useGetAllConditionsQuery } = conditionApi;
