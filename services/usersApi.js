import { rootApi } from "./rootApi";

const ADMIN = process.env.NEXT_PUBLIC_ADMIN_TOKEN;

export const usersApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      query: () => "users",
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
      query: (data) => ({
        url: "users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation({
      query: (data, id) => ({
        url: `users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DEL",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useUsersQuery,
  useUserQuery,
  useNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
