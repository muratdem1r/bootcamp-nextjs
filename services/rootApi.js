import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://1365backe7.execute-api.us-east-1.amazonaws.com/Prod/api/v1/",
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("token");

      headers.set("Authorization", `Bearer ${accessToken}`);
      headers.set("Access-Control-Allow-Headers", "*");
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Access-Control-Allow-Methods", "*");
      return headers;
    },
  }),
  endpoints: () => ({}),
});
export const rootApi = api.enhanceEndpoints({
  addTagTypes: ["Auth", "Bootcamps", "Courses", "Reviews", "Users"],
});
