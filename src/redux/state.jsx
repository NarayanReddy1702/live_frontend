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
      invalidatesTags: ["Users"],
    }),

    getAllUsers: builder.query({
      query: () => "/getAllUser",
      providesTags: (result) =>
        result?.users
          ? [
              ...result.users.map(({ _id }) => ({
                type: "User",
                id: _id,
              })),
              "Users",
            ]
          : ["Users"],
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
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        "Users",
      ],
    }),

    OrderSaree: builder.mutation({
      query: (sareeId) => ({
        url: "/order",
        method: "PUT",
        body: { sareeId },
      }),
      invalidatesTags: (result, error, sareeId) => [
        { type: "Saree", id: sareeId },
        "Sarees",
      ],
    }),
    removerOrderList:builder.mutation({
         query:(sareeId)=>({
           url:"/removeOrder",
           method:"PUT",
           body:{sareeId}
         })
    })
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
  providesTags: (result) =>
    result
      ? [
          ...result.saree.map(({ _id }) => ({ type: "Saree", id: _id })),
          "Sarees",
        ]
      : ["Sarees"],
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
      invalidatesTags: (result, error, id) => [
        { type: "Saree", id },
        "Sarees",
      ],
    }),

    doLike: builder.mutation({
  query: (sareeId) => ({
    url: "/doLike",
    method: "PUT",
    body: { sareeId },
  }),
  invalidatesTags: (result, error, sareeId) => [
    { type: "Saree", id: sareeId },
    "Sarees",
  ],
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
  useRemoverOrderListMutation
} = userApi;

export const {
  useGetAllSareeQuery,
  useAddItemMutation,
  useDeleteCardMutation,
  useDoLikeMutation,
  useGetACardQuery,
} = sareeApi;
