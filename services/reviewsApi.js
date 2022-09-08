import { rootApi } from "./rootApi";

export const reviewsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    reviews: builder.query({
      query: () => "reviews",
      providesTags: ["Reviews"],
    }),

    reviewsBootcamp: builder.query({
      query: (id) => `bootcamps/${id}/reviews`,
      providesTags: ["Reviews"],
    }),

    review: builder.query({
      query: (id) => `reviews/${id}`,
      providesTags: ["Reviews"],
    }),

    newReview: builder.mutation({
      query: ({ data, id }) => ({
        url: `bootcamps/${id}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),

    updateReview: builder.mutation({
      query: ({ data, id }) => ({
        url: `reviews/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),

    deleteReview: builder.mutation({
      query: ({ id }) => ({
        url: `reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useReviewsQuery,
  useReviewsBootcampQuery,
  useReviewQuery,
  useNewReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
