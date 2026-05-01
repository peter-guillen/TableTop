import API_URL from "../../../shared/api/api";
import type { Character } from "../charactersTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const characterApi = createApi({
  reducerPath: "characterApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Character"],
  endpoints: (builder) => ({
    getCharacters: builder.query<Character[], void>({
      query: () => "/api/characters",
      providesTags: [{ type: "Character", id: "LIST" }],
    }),

    getCharacter: builder.query<Character, string>({
      query: (id) => `/api/characters/${id}`,
      providesTags: (result, error, id) => [{ type: "Character", id }],
    }),

    createCharacter: builder.mutation<Character, Character>({
      query: (newCharacter) => ({
        url: "/api/characters",
        method: "POST",
        body: newCharacter,
      }),
      invalidatesTags: [{ type: "Character", id: "LIST" }],
    }),

    updateCharacter: builder.mutation<
      Character,
      { id: string; data: Character }
    >({
      query: ({ id, data }) => ({
        url: `/api/characters/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Character", id },
        { type: "Character", id: "LIST" },
      ],
    }),

    deleteCharacter: builder.mutation<Character, string>({
      query: (id) => ({
        url: `/api/characters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Character", id },
        { type: "Character", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterQuery,
  useCreateCharacterMutation,
  useUpdateCharacterMutation,
  useDeleteCharacterMutation,
} = characterApi;
