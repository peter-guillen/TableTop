import API_URL from "../../../shared/api/api";
import type { Item } from "../itemTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const itemApi = createApi({
  reducerPath: "itemApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Item"],
  endpoints: (builder) => ({
    getAllItems: builder.query<Item[], void>({
      query: () => "/api/items",
      providesTags: [{ type: "Item", id: "LIST" }],
    }),

    getItemById: builder.query<Item, string>({
      query: (id) => `/api/items/${id}`,
      providesTags: (result, error, id) => [{ type: "Item", id }],
    }),

    createItem: builder.mutation<Item, Item>({
      query: (newItem) => ({
        url: "/api/items",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),

    updateItem: builder.mutation<Item, { id: string; data: Item }>({
      query: ({ id, data }) => ({
        url: `/api/items/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Item", id },
        { type: "Item", id: "LIST" },
      ],
    }),

    deleteItem: builder.mutation<Item, string>({
      query: (id) => ({
        url: `/api/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Item", id },
        { type: "Item", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  useGetItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemApi;
