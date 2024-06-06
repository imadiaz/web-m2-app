import { CardTypes } from "../data/cardtypes/cardTypes";
import { CreateCardType } from "../data/cardtypes/cardTypes.request";
import { apiSlice } from "./apiSlice";

export const cardTypesService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCardTypes: builder.mutation<CardTypes[], string>({
            query: (siteId) => `/cardTypes/all/${siteId}`,
            transformResponse: (response: {data: CardTypes[]}) => response.data
        }),
        createCardType: builder.mutation<void, CreateCardType>({
            query: (cardType) => ({
                url: '/cardTypes/create',
                method: 'POST',
                body: {...cardType}
            })
        })
    })
})

export const {useGetCardTypesMutation, useCreateCardTypeMutation} = cardTypesService