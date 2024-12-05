import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface IDoc {
    profile?: File;
    name: string;
    age: string;
    address: string;
    birthDate: string;
    role: string;
    isVerified: boolean;
    gender: string;
    interests: string[];
    _id?: string;
    // fd?: IDoc;

}



export const docApi = createApi({
    reducerPath: "docApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/doc`, credentials: "include" }),
    tagTypes: ["doc"],
    endpoints: (builder) => {
        return {
            getDocs: builder.query<IDoc[], void>({
                query: () => {
                    return {
                        url: "/getAllDoc",
                        method: "GET",
                        // body: docData
                    }
                },
                transformResponse: (data: { result: IDoc[] }) => {
                    return data.result
                },
                providesTags: ["doc"]
            }),
            addDoc: builder.mutation<void, FormData>({
                query: (docData) => {

                    return {

                        url: "/add-doc",
                        method: "POST",
                        body: docData
                    }
                },
                invalidatesTags: ["doc"]
            }),
            updateDoc: builder.mutation<void, { fd: FormData, _id: string }>({
                query: ({ fd, _id }) => {
                    // console.log("from Api", docData);

                    return {
                        url: `/update-doc/${_id}`,
                        method: "PUT",
                        body: fd
                    }
                },
                invalidatesTags: ["doc"]
            }),
            deleteDoc: builder.mutation({
                query: ({ id }) => {
                    // console.log("from Api", docData);

                    return {
                        url: `/delete-doc/${id}`,
                        method: "DELETE",
                        // body: fd
                    }
                },
                invalidatesTags: ["doc"]
            }),


        }
    }
})

export const {
    useAddDocMutation,
    useGetDocsQuery,
    useUpdateDocMutation,
    useDeleteDocMutation

} = docApi
