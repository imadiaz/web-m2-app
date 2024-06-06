import { CreatePreclassifier } from "../data/preclassifier/preclassifier.request";
import { apiSlice } from "./apiSlice";

export const preclassifierService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPreclassifier: builder.mutation<Preclassifier[], string>({
            query: (cardTypeId) => `/preclassifier/all/${cardTypeId}`,
            transformResponse: (response: {data: Preclassifier[]}) => response.data
        }),
        createPreclassifier: builder.mutation<void, CreatePreclassifier>({
            query: (preclassifier) => ({
                url: '/preclassifier/create',
                method: 'POST',
                body: {...preclassifier}
            })
        })
    })
})

export const {useGetPreclassifierMutation, useCreatePreclassifierMutation} = preclassifierService