import { configureStore } from "@reduxjs/toolkit";
import {  sareeApi, userApi } from "./state";



const store = configureStore({
    reducer:{
     [userApi.reducerPath]:userApi.reducer,
     [sareeApi.reducerPath]:sareeApi.reducer
    
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(userApi.middleware,sareeApi.middleware)
})

export default store