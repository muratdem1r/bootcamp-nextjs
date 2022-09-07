import { rootApi } from "./rootApi";

export const reviewsApi = rootApi.injectEndpoints({
  reducerPath: "reviewsApi",

  endpoints: (builder) => ({
    reviews: builder.query({
      query: () => ({
        url: "reviews",
      }),
      providesTags: ["Reviews"],
    }),

    reviewsBootcamp: builder.query({
      query: (id) => ({
        url: `bootcamps/${id}/reviews`,
      }),
      providesTags: ["Reviews"],
    }),

    review: builder.query({
      query: (id) => ({
        url: `reviews/${id}`,
      }),
      providesTags: ["Reviews"],
    }),

    newReview: builder.mutation({
      query: ({ data, id, token }) => ({
        url: `bootcamps/${id}/reviews`,
        method: "POST",
        body: data,
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      invalidatesTags: ["Reviews"],
    }),

    updateReview: builder.mutation({
      query: (data, id, token) => ({
        url: `reviews/${id}`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      invalidatesTags: ["Reviews"],
    }),

    deleteReview: builder.mutation({
      query: (id, token) => ({
        url: `reviews/${id}`,
        method: "DEL",
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useReviewsQuery,
  useReviewsBootcampQuery,
  useReviewQuery,
  useNewReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
