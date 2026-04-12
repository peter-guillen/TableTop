import API_URL from "../../../shared/api/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const libraryApi = createApi({
  reducerPath: "libraryApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
  endpoints: (builder) => ({
    getLibraryItems: builder.query({
      query: () => "/library",
    }),
  }),
});

export const { useGetLibraryItemsQuery } = libraryApi;
