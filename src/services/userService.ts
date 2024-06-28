import { Responsible, UserTable } from "../data/user/user";
import { CreateUser } from "../data/user/user.request";
import { apiSlice } from "./apiSlice";

export const userService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.mutation<UserTable[], void>({
            query: () => `/users/all`,
            transformResponse: (response: {data: UserTable[]}) => response.data
        }),
        getSiteResponsibles: builder.mutation<Responsible[], void>({
            query: (siteId) => `/users/all/${siteId}`,
            transformResponse: (response: {data: Responsible[]}) => response.data
        }),
        createUser: builder.mutation<void, CreateUser>({
            query: (user) => ({
                url: '/users/create',
                method: 'POST',
                body: {...user}
            }),
        }),
    })
})

export const {useGetUsersMutation, useGetSiteResponsiblesMutation, useCreateUserMutation} = userService