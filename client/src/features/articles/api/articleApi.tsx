import type { ArticleFormData } from "../articleTypes.ts";
import { baseApi } from "../../../shared/api/baseApi.ts";

export const articleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllArticles: builder.query<ArticleFormData[], void>({
      query: () => "/api/articles",
      providesTags: [{ type: "Article", id: "LIST" }],
    }),

    getArticleById: builder.query<ArticleFormData, string>({
      query: (id) => `/api/articles/${id}`,
      providesTags: (result, error, id) => [{ type: "Article", id }],
    }),

    createArticle: builder.mutation<ArticleFormData, ArticleFormData>({
      query: (newArticle) => ({
        url: "/api/articles",
        method: "POST",
        body: newArticle,
      }),
      invalidatesTags: [{ type: "Article", id: "LIST" }],
    }),

    updateArticle: builder.mutation<
      ArticleFormData,
      { id: string; data: ArticleFormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/articles/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Article", id },
        { type: "Article", id: "LIST" },
      ],
    }),

    deleteArticle: builder.mutation<ArticleFormData, string>({
      query: (id) => ({
        url: `/api/articles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Article", id },
        { type: "Article", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllArticlesQuery,
  useGetArticleByIdQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApi;
