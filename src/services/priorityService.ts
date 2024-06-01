import { Priority } from "../data/priority/priority";
import { apiSlice } from "./apiSlice";

export const priorityService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPriorities: builder.mutation<Priority[], string>({
            query: (id) => `/priority/all/${id}`,
            transformResponse: (response: {data: Priority[]}) => response.data
        })
    })
})

export const {useGetPrioritiesMutation} = priorityService