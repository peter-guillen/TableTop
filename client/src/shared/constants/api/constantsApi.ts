import { Constants } from "../constantTypes";
import { baseApi } from "../../api/baseApi.ts";

export const constantsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConstants: builder.query<Constants, void>({
      query: () => "/api/constants",
    }),
  }),
});

export const { useGetConstantsQuery } = constantsApi;
