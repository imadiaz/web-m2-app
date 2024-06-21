import { UserTable } from "../data/user/user";
import { apiSlice } from "./apiSlice";

export const userService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.mutation<UserTable[], void>({
            query: () => `/users/all`,
            transformResponse: (response: {data: UserTable[]}) => response.data
        }),
    })
})

export const {useGetUsersMutation} = userService