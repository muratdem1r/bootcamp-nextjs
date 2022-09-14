import { rootApi } from "./rootApi";

export const usersApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      query: () => "users",
      providesTags: ["Users"],
    }),

    user: builder.query({
      query: (id) => `users/${id}`,
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
      query: ({ data, id }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
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
