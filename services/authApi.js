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
        body: email,
      }),
      invalidatesTags: ["Auth"],
    }),

    resetPass: builder.mutation({
      query: (id, password) => ({
        url: `auth/resetpassword/${id}`,
        method: "PUT",
        body: password,
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
      query: (passwords) => ({
        url: "auth/updatepassword",
        method: "PUT",
        body: passwords,
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
