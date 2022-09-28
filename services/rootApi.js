import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://vqd86ub631.execute-api.us-east-1.amazonaws.com/Prod/api/v1/",
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("token");

      headers.set("Authorization", `Bearer ${accessToken}`);

      return headers;
    },
  }),
  endpoints: () => ({}),
});
export const rootApi = api.enhanceEndpoints({
  addTagTypes: ["Auth", "Bootcamps", "Courses", "Reviews", "Users"],
});
