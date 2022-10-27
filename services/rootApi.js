import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_HOST + "/api/v1/",
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("token");

      headers.set("Authorization", `Bearer ${accessToken}`);
      headers.set("mode", "no-corse");

      return headers;
    },
  }),
  endpoints: () => ({}),
});
export const rootApi = api.enhanceEndpoints({
  addTagTypes: ["Auth", "Bootcamps", "Courses", "Reviews", "Users"],
});
