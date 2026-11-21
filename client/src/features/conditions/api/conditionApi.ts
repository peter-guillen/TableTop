import type { Condition } from "../conditionTypes.ts";
import { baseApi } from "../../../shared/api/baseApi.ts";

export const conditionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllConditions: builder.query<Condition[], void>({
      query: () => "/api/conditions",
      providesTags: [{ type: "Condition", id: "LIST" }],
    }),
  }),
});

export const { useGetAllConditionsQuery } = conditionApi;
