import type { Background } from "../backgroundTypes";
import { baseApi } from "../../../shared/api/baseApi.ts";

export const backgroundApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBackgrounds: builder.query<Background[], void>({
      query: () => "/api/backgrounds",
      providesTags: [{ type: "Background", id: "LIST" }],
    }),

    getBackgroundById: builder.query<Background, string>({
      query: (id) => `/api/backgrounds/${id}`,
      providesTags: (result, error, id) => [{ type: "Background", id }],
    }),

    createBackground: builder.mutation<Background, Background>({
      query: (newBackground) => ({
        url: "/api/backgrounds",
        method: "POST",
        body: newBackground,
      }),
      invalidatesTags: [{ type: "Background", id: "LIST" }],
    }),

    updateBackground: builder.mutation<
      Background,
      { id: string; data: Background }
    >({
      query: ({ id, data }) => ({
        url: `/api/backgrounds/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Background", id },
        { type: "Background", id: "LIST" },
      ],
    }),

    deleteBackground: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/backgrounds/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Background", id },
        { type: "Background", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBackgroundsQuery,
  useGetBackgroundByIdQuery,
  useCreateBackgroundMutation,
  useUpdateBackgroundMutation,
  useDeleteBackgroundMutation,
} = backgroundApi;
