import { rootApi } from "./rootApi";

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "auth/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),

    login: builder.mutation({
      query: (user) => ({
        url: "auth/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),

    getLoggedinUser: builder.query({
      query: () => "auth/me",
      providesTags: ["Auth"],
    }),

    forgotPass: builder.mutation({
      query: (email) => ({
        url: "auth/forgotpassword",
        method: "POST",
        body: { email: email },
      }),
      invalidatesTags: ["Auth"],
    }),

    resetPass: builder.mutation({
      query: ({ token, password }) => ({
        url: `auth/resetpassword/${token}`,
        method: "PUT",
        body: { password: password },
      }),
      invalidatesTags: ["Auth"],
    }),

    updateUserDetails: builder.mutation({
      query: (data) => ({
        url: "auth/updatedetails",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    updatePass: builder.mutation({
      query: ({ currentPassword, newPassword }) => ({
        url: "auth/updatepassword",
        method: "PUT",
        body: {
          currentPassword,
          newPassword,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetLoggedinUserQuery,
  useForgotPassMutation,
  useResetPassMutation,
  useUpdateUserDetailsMutation,
  useUpdatePassMutation,
} = authApi;
