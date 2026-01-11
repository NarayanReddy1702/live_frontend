import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://live-backend-0lz9.onrender.com/api/auth/user",
    credentials: "include",
  }),
  tagTypes: ["Users", "User"],

  endpoints: (builder) => ({
    register: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),

    login: builder.mutation({
      query: (userDet) => ({
        url: "/login",
        method: "POST",
        body: userDet,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    getAllUsers: builder.query({
      query: () => "/getAllUser",
      providesTags: ["Users"],
    }),

    getOneUser: builder.query({
      query: (id) => `/getAUser/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    updateAuth: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateAuth/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        "Users",
      ],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/deleteAuth/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    OrderSaree: builder.mutation({
      query: (id) => ({
        url: "/order",
        method: "PUT",
        body: { sareeId: id },
      }),
      invalidatesTags: ["Sarees"],
    }),
  }),
});

export const sareeApi = createApi({
  reducerPath: "sareeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://live-backend-0lz9.onrender.com/api/auth/saree",
    credentials: "include",
  }),
  tagTypes: ["Sarees", "Saree"],

  endpoints: (builder) => ({
    getAllSaree: builder.query({
      query: () => "/getAllCards",
      providesTags: ["Sarees"],
    }),

    getACard: builder.query({
      query: (id) => `/getACard/${id}`,
      providesTags: (result, error, id) => [{ type: "Saree", id }],
    }),

    addItem: builder.mutation({
      query: (formDetails) => ({
        url: "/addCard",
        method: "POST",
        body: formDetails,
      }),
      invalidatesTags: ["Sarees"],
    }),

    deleteCard: builder.mutation({
      query: (id) => ({
        url: `/deleteCard/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sarees"],
    }),

    doLike: builder.mutation({
      query: (sareeId) => ({
        url: "/doLike",
        method: "PUT",
        body: { sareeId },
      }),
      invalidatesTags:["Sarees"]
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetOneUserQuery,
  useUpdateAuthMutation,
  useOrderSareeMutation,
} = userApi;

export const {
  useGetAllSareeQuery,
  useAddItemMutation,
  useDeleteCardMutation,
  useDoLikeMutation,
  useGetACardQuery,
} = sareeApi;
