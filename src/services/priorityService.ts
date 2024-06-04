import { Priority } from "../data/priority/priority";
import { CreatePriority } from "../data/priority/priority.request";
import { apiSlice } from "./apiSlice";

export const priorityService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPriorities: builder.mutation<Priority[], string>({
            query: (id) => `/priority/all/${id}`,
            transformResponse: (response: {data: Priority[]}) => response.data
        }),
        createPriority: builder.mutation<void, CreatePriority>({
            query: (priority) => ({
                url: '/priority/create',
                method: 'POST',
                body: {...priority}
            })
        })
    })
})

export const {useGetPrioritiesMutation, useCreatePriorityMutation} = priorityService