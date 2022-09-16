import { rootApi } from "./rootApi";

export const bootcampsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    bootcamps: builder.query({
      query: ({ page = 1, limit = 12 }) => ({
        url: "bootcamps",
        params: { limit: limit, page: page },
      }),
      providesTags: ["Bootcamps"],
    }),

    bootcamp: builder.query({
      query: (id) => `bootcamps/${id}`,
      providesTags: ["Bootcamps"],
    }),

    newBootcamp: builder.mutation({
      query: (data) => ({
        url: "bootcamps",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bootcamps"],
    }),

    updateBootcamp: builder.mutation({
      query: ({ data, id }) => ({
        url: `bootcamps/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Bootcamps"],
    }),

    deleteBootcamp: builder.mutation({
      query: (id) => ({
        url: `bootcamps/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bootcamps"],
    }),

    bootcampsByDistance: builder.query({
      query: (date, num) => `bootcamps/radius/${date}/${num}`,
      providesTags: ["Bootcamps"],
    }),

    uploadBootcampPhoto: builder.mutation({
      query: ({ photo, id }) => ({
        url: `bootcamps/${id}/photo`,
        method: "PUT",
        body: photo,
      }),
      invalidatesTags: ["Bootcamps"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useBootcampsQuery,
  useBootcampQuery,
  useNewBootcampMutation,
  useUpdateBootcampMutation,
  useDeleteBootcampMutation,
  useBootcampsByDistanceQuery,
  useUploadBootcampPhotoMutation,
} = bootcampsApi;
