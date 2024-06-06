import { CardTypes } from "../data/cardtypes/cardTypes";
import { apiSlice } from "./apiSlice";

export const cardTypesService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCardTypes: builder.mutation<CardTypes[], string>({
            query: (siteId) => `/cardTypes/all/${siteId}`,
            transformResponse: (response: {data: CardTypes[]}) => response.data
        })
    })
})

export const {useGetCardTypesMutation} = cardTypesService