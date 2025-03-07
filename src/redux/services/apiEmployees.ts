import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiEmployees = createApi({
  reducerPath: "apiEmployees",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  tagTypes: ["employees"],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: ({ limit, page }) => ({
        url: `employees?limit=${limit}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["employees"],
    }),
    getEmployeeById: builder.query({
      query: (id) => ({
        url: `employees/${id}`,
        method: "GET",
      }),
      providesTags: ["employees"],
    }),
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "employees",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["employees"],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `employees/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["employees"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employees"],
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetEmployeeByIdQuery,
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
} = apiEmployees;
