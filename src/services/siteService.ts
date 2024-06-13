import { Site, SiteUpdateForm } from "../data/site/site";
import { CreateSite, UpdateSiteReq } from "../data/site/site.request";
import { apiSlice } from "./apiSlice";

export const siteService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSites: builder.mutation<Site[], string>({
      query: (companyId) => `/sites/all/${companyId}`,
      transformResponse: (response: { data: Site[] }) => response.data,
    }),
    createSite: builder.mutation<void, CreateSite>({
      query: (site) => ({
        url: "/sites/create",
        method: "POST",
        body: { ...site },
      }),
    }),
    getSite: builder.mutation<SiteUpdateForm, string>({
      query: (siteId) => `/sites/site/${siteId}`,
      transformResponse: (response: { data: SiteUpdateForm }) => response.data,
    }),
    updateSite: builder.mutation<void, UpdateSiteReq>({
      query: (site) => ({
        url: '/sites/update',
        method: 'PUT',
        body: {...site}
      })
    })
  }),
});

export const {
  useGetSitesMutation,
  useCreateSiteMutation,
  useGetSiteMutation,
  useUpdateSiteMutation
} = siteService;
