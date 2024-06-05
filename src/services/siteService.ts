import { Site } from "../data/site/site";
import { apiSlice } from "./apiSlice";

export const siteService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSites: builder.mutation<Site[], string>({
        query: (companyId) => `/sites/all/${companyId}`,
        transformResponse: (response: {data: Site[]}) => response.data
    }),
  }),
});

export const {
  useGetSitesMutation
} = siteService;