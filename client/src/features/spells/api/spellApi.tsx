import API_URL from "../../../shared/api/api";
import type { Spell } from "../spellTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spellApi = createApi({
  reducerPath: "spellApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getSpells: builder.query<Spell[], void>({
      query: () => "/api/spells",
    }),

    getSpell: builder.query<Spell, string>({
      query: (id) => `/api/spells/${id}`,
    }),
    createSpell: builder.mutation<Spell, Spell>({
      query: (newSpell) => ({
        url: "/api/spells",
        method: "POST",
        body: newSpell,
      }),
    }),
    updateSpell: builder.mutation<Spell, { id: string; data: Spell }>({
      query: ({ id, data }) => ({
        url: `/api/spells/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteSpell: builder.mutation<Spell, string>({
      query: (id) => ({
        url: `/api/spells/${id}`,
        method: "DELETE",
      }),
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
