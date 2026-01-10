import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://live-backend-0lz9.onrender.com/api/auth/user",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
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
      query: () => ({
        url: "/getAllUser",
        method: "GET",
      }),
    }),
    deleteUser:builder.mutation({
      query:(id)=>({
        url:`/deleteAuth/${id}`,
        method:"DELETE"
      })
    }),
    getOneUser:builder.query({
      query:(id)=>({
        url:`/getAUser/${id}`,
        method:"GET"
      })
    }),
    updateAuth:builder.mutation({
      query:({id,data})=>({
        url:`/updateAuth/${id}`,
        method:"PUT",
        body:data
      })
    }),
    OrderSaree:builder.mutation({
      query:(id,userId)=>({
         url:"/order",
         method:"PUT",
         body:{id,userId}
      })
    })
  }),
});




export const sareeApi = createApi({
  reducerPath: "sareeApi",
  baseQuery:fetchBaseQuery({ baseUrl: "https://live-backend-0lz9.onrender.com/api/auth/saree",credentials: "include", }),
  endpoints: (builder) => ({
    getAllSaree: builder.query({
      query:()=>({
        url:"/getAllCards"
      })
    }),
    addItem:builder.mutation({
          query:(formDetails)=>({
            url:"/addCard",
            method:"POST",
            body:formDetails
          })
    }),
    deleteCard:builder.mutation({
      query:(id)=>({
        url:`/deleteCard/${id}`,
        method:"DELETE"
      })
    }),
    doLike:builder.mutation({
      query:(sareeId)=>({
        url:"/doLike",
        method:"PUT",
        body:{sareeId}
      })
    })
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
  useOrderSareeMutation
} = userApi;

export const {useGetAllSareeQuery ,useAddItemMutation,useDeleteCardMutation,useDoLikeMutation} = sareeApi;
