import { apiSlice } from "./apiSlice";

export const preclassifierService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPreclassifier: builder.mutation<Preclassifier[], string>({
            query: (cardTypeId) => `/preclassifier/all/${cardTypeId}`,
            transformResponse: (response: {data: Preclassifier[]}) => response.data
        })
    })
})

export const {useGetPreclassifierMutation} = preclassifierService