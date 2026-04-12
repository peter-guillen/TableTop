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
  tagTypes: ["Profession"],
  endpoints: (builder) => ({
    getProfessions: builder.query<Profession[], void>({
      query: () => "/api/professions",
      providesTags: [{ type: "Profession", id: "LIST" }],
    }),

    getProfession: builder.query<Profession, string>({
      query: (id) => `/api/professions/${id}`,
      providesTags: (result, error, id) => [{ type: "Profession", id }],
    }),

    createProfession: builder.mutation<Profession, Profession>({
      query: (newProfession) => ({
        url: "/api/professions",
        method: "POST",
        body: newProfession,
      }),
      invalidatesTags: [{ type: "Profession", id: "LIST" }],
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
      invalidatesTags: (result, error, { id }) => [
        { type: "Profession", id },
        { type: "Profession", id: "LIST" },
      ],
    }),

    deleteProfession: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/professions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Profession", id },
        { type: "Profession", id: "LIST" },
      ],
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
