import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//const accessToken = localStorage.getItem("token");
/**
 * prepareHeaders: (headers, { getState }) => {
      headers.set("Authorization", `Bearer ${accessToken}`);
      return headers;
    },
 */
export const rootApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_HOST + "/api/v1/",
  }),

  tagTypes: ["Auth", "Bootcamps", "Courses", "Reviews", "Users"],
  endpoints: () => ({}),
});
