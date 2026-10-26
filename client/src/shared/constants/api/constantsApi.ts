import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Constants } from "../constantTypes";

export const constantsApi = createApi({
  reducerPath: "constantsApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getConstants: builder.query<Constants, void>({
      query: () => "/api/constants",
    }),
  }),
});

export const { useGetConstantsQuery } = constantsApi;
