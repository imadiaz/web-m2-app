import { Company } from "../data/company/company";
import { apiSlice } from "./apiSlice";

export const companyService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.mutation<Company[], void>({
      query: () => "/company/all",
      transformResponse: (response: { data: Company[] }) => response.data,
    }),
  }),
});

export const { useGetCompaniesMutation } = companyService;
