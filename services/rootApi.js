import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
<<<<<<< HEAD
    baseUrl: process.env.NEXT_PUBLIC_AWS_HOST,
=======
    baseUrl:
      "https://vqd86ub631.execute-api.us-east-1.amazonaws.com/Prod/api/v1/",
    mode: "no-cors",
>>>>>>> 8971dfc47277a8c6c7c7bb72e97afe7d85bb87de
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("token");

      headers.set("Authorization", `Bearer ${accessToken}`);
      headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers"
      );
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set(
        "Access-Control-Allow-Methods",
        "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT"
      );
      headers.set("X-Requested-With", "*");

      return headers;
    },
  }),
  endpoints: () => ({}),
});
export const rootApi = api.enhanceEndpoints({
  addTagTypes: ["Auth", "Bootcamps", "Courses", "Reviews", "Users"],
});
