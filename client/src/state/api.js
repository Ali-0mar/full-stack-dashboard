import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        }),
    tagTypes: ['User', 'Products', 'Customers'],
    endpoints:(builder)=> ({
        getUser: builder.query({
            query: (id) => `/general/user/${id}`,
            providesTags: ['User']
        }),
        getProducts: builder.query({
            query:()=> `/client/products`,
            providesTags: ['Products']
        }),
        getCustomers: builder.query({
            query:()=> `/client/customers`,
            providesTags: ['Customers']
        })
    })
})

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery
} = api