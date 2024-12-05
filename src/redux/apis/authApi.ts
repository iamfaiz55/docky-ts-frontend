import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Iuser {
    name: string,
    id?: string,
    email: string
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/auth`, credentials: "include" }),
    // baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:5000/api/auth`, credentials: "include" }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {

            register: builder.mutation({
                query: userData => {
                    return {
                        url: "/register",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            login: builder.mutation({
                query: userData => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: (data: { result: Iuser }) => {
                    localStorage.setItem("user", JSON.stringify(data.result))
                    return data.result
                },
                invalidatesTags: ["auth"]
            }),
            logout: builder.mutation({
                query: () => {
                    return {
                        url: "/logout",
                        method: "POST",

                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("user")
                    return data
                },
                invalidatesTags: ["auth"]
            }),

        }
    }
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation
} = authApi
