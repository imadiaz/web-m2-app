import { Level } from "../data/level/level";
import { apiSlice } from "./apiSlice";

export const levelService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getlevels: builder.mutation<Level[], string>({
            query: (siteId) => `/level/all/${siteId}`,
            transformResponse: (response: {data: Level[]}) => response.data
        }),
    })
})

export const {useGetlevelsMutation} = levelService