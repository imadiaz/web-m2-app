import { Site } from "../data/site/site";
import { CreateSite } from "../data/site/site.request";
import { apiSlice } from "./apiSlice";

export const siteService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSites: builder.mutation<Site[], string>({
        query: (companyId) => `/sites/all/${companyId}`,
        transformResponse: (response: {data: Site[]}) => response.data
    }),
    createSite: builder.mutation<void, CreateSite>({
      query: (site) => ({
          url: '/sites/create',
          method: 'POST',
          body: {...site}
      })
  })
  }),
});

export const {
  useGetSitesMutation,
  useCreateSiteMutation
} = siteService;