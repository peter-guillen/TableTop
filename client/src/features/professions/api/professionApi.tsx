import API_URL from "../../../shared/api/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface Level {
  name: string;
  description: string;
}

interface Profession {
  _id: string;
  title: string;
  spell: string;
  weapon: string;
  armor: string;
  levels: Level[];
}

export const professionApi = createApi({
  reducerPath: "professionApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getProfessions: builder.query<Profession[], void>({
      query: () => "/api/professions",
    }),
    getProfession: builder.query<Profession, string>({
      query: (id) => `/api/professions/${id}`,
    }),
    createProfession: builder.mutation<Profession, Profession>({
      query: (newProfession) => ({
        url: "/api/professions",
        method: "POST",
        body: newProfession,
      }),
    }),
    updateProfession: builder.mutation<
      Profession,
      { id: string; data: Profession }
    >({
      query: ({ id, data }) => ({
        url: `/api/professions/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteProfession: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/professions/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProfessionsQuery,
  useGetProfessionQuery,
  useCreateProfessionMutation,
  useUpdateProfessionMutation,
  useDeleteProfessionMutation,
} = professionApi;
