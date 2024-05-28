import { Company } from "../data/company/company";
import { CreateCompany } from "../data/company/company.request";
import { apiSlice } from "./apiSlice";

export const companyService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.mutation<Company[], void>({
      query: () => "/company/all",
      transformResponse: (response: { data: Company[] }) => response.data,
    }),
    createCompany: builder.mutation<void, CreateCompany>({
      query: (company) => ({
        url: "/company/create",
        method: "POST",
        body: { ...company },
      }),
      transformResponse: (response: {data: any}) => response.data
    }),
  }),
});

export const { useGetCompaniesMutation, useCreateCompanyMutation } = companyService;
