import { rootApi } from "./rootApi";

const ADMIN = process.env.NEXT_PUBLIC_ADMIN_TOKEN;

export const usersApi = rootApi.injectEndpoints({
  reducerPath: "usersApi",

  endpoints: (builder) => ({
    users: builder.query({
      query: () => ({
        url: "users",
        headers: {
          Authorization: "Bearer " + ADMIN,
        },
      }),
      providesTags: ["Users"],
    }),

    user: builder.query({
      query: (id) => ({
        url: `users/${id}`,
        headers: {
          Authorization: "Bearer " + ADMIN,
        },
      }),
      providesTags: ["Users"],
    }),

    newUser: builder.mutation({
      query: (data, token) => ({
        url: "users",
        method: "POST",
        body: data,
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation({
      query: (data, id, token) => ({
        url: `users/${id}`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query: (id, token) => ({
        url: `users/${id}`,
        method: "DEL",
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useUsersQuery,
  useUserQuery,
  useNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
