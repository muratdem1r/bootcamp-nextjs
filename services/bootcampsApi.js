import { rootApi } from "./rootApi";

export const bootcampsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    bootcamps: builder.query({
      query: () => "bootcamps",
      providesTags: ["Bootcamps"],
    }),

    bootcamp: builder.query({
      query: (id) => `bootcamps/${id}`,
      providesTags: ["Bootcamps"],
    }),

    newBootcamp: builder.mutation({
      query: (data, token) => ({
        url: "bootcamps",
        method: "POST",
        body: data,
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      invalidatesTags: ["Bootcamps"],
    }),

    updateBootcamp: builder.mutation({
      query: (data, id, token) => ({
        url: `bootcamps/${id}`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      invalidatesTags: ["Bootcamps"],
    }),

    deleteBootcamp: builder.mutation({
      query: (id, token) => ({
        url: `bootcamps/${id}`,
        method: "DEL",
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      invalidatesTags: ["Bootcamps"],
    }),

    bootcampsByDistance: builder.query({
      query: (date, num) => `bootcamps/radius/${date}/${num}`,
      providesTags: ["Bootcamps"],
    }),

    uploadBootcampPhoto: builder.mutation({
      query: (photo, id, token) => ({
        url: `bootcamps/${id}`,
        method: "PUT",
        body: photo,
        headers: {
          Authorization: "Bearer " + token,
        },
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
