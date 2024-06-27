import { Level } from "../data/level/level";
import { CreateLevel } from "../data/level/level.request";
import { apiSlice } from "./apiSlice";

export const levelService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getlevels: builder.mutation<Level[], string>({
      query: (siteId) => `/level/all/${siteId}`,
      transformResponse: (response: { data: Level[] }) => response.data,
    }),
    createLevel: builder.mutation<void, CreateLevel>({
      query: (level) => ({
        url: "/level/create",
        method: "POST",
        body: { ...level },
      }),
    }),
  }),
});

export const { useGetlevelsMutation, useCreateLevelMutation } = levelService;
