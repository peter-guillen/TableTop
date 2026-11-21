import type { Character, CharacterInput } from "../charactersTypes";
import { baseApi } from "../../../shared/api/baseApi.ts";

export const characterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCharacters: builder.query<Character[], void>({
      query: () => "/api/characters",
      providesTags: [{ type: "Character", id: "LIST" }],
    }),

    getCharacterById: builder.query<Character, string>({
      query: (id) => `/api/characters/${id}`,
      providesTags: (result, error, id) => [{ type: "Character", id }],
    }),

    createCharacter: builder.mutation<Character, CharacterInput>({
      query: (newCharacter) => ({
        url: "/api/characters",
        method: "POST",
        body: newCharacter,
      }),
      invalidatesTags: [{ type: "Character", id: "LIST" }],
    }),

    updateCharacter: builder.mutation<
      Character,
      { id: string; data: Partial<CharacterInput> }
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
  useGetAllCharactersQuery,
  useGetCharacterByIdQuery,
  useCreateCharacterMutation,
  useUpdateCharacterMutation,
  useDeleteCharacterMutation,
} = characterApi;
