import API_URL from "../../../shared/api/api";
import type { Spell } from "../spellTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spellApi = createApi({
  reducerPath: "spellApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Spell"],
  endpoints: (builder) => ({
    getSpells: builder.query<Spell[], void>({
      query: () => "/api/spells",
      providesTags: [{ type: "Spell", id: "LIST" }],
    }),

    getSpell: builder.query<Spell, string>({
      query: (id) => `/api/spells/${id}`,
      providesTags: (result, error, id) => [{ type: "Spell", id }],
    }),

    createSpell: builder.mutation<Spell, Spell>({
      query: (newSpell) => ({
        url: "/api/spells",
        method: "POST",
        body: newSpell,
      }),
      invalidatesTags: [{ type: "Spell", id: "LIST" }],
    }),

    updateSpell: builder.mutation<Spell, { id: string; data: Spell }>({
      query: ({ id, data }) => ({
        url: `/api/spells/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Spell", id },
        { type: "Spell", id: "LIST" },
      ],
    }),

    deleteSpell: builder.mutation<Spell, string>({
      query: (id) => ({
        url: `/api/spells/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Spell", id },
        { type: "Spell", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetSpellsQuery,
  useGetSpellQuery,
  useCreateSpellMutation,
  useUpdateSpellMutation,
  useDeleteSpellMutation,
} = spellApi;
