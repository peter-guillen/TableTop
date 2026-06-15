// src/features/constants/constantsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Constants {
  PROFESSIONS: string[];
  AFFINITIES: string[];
  CONDITIONS: string[];
  STATS: Record<string, string>;
  SKILLS: Record<string, string>;
}

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
