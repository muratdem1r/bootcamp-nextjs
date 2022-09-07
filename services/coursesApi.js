import { rootApi } from "./rootApi";

export const coursesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    courses: builder.query({
      query: () => "courses",
      providesTags: ["Courses"],
    }),

    coursesBootcamp: builder.query({
      query: (id) => `bootcamps/${id}/courses`,
      providesTags: ["Courses"],
    }),

    course: builder.query({
      query: (id) => `courses/${id}`,
      providesTags: ["Courses"],
    }),

    newCourse: builder.mutation({
      query: (data, id) => ({
        url: `bootcamps/${id}/courses`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Courses"],
    }),

    updateCourse: builder.mutation({
      query: (data, id) => ({
        url: `courses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Courses"],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `courses/${id}`,
        method: "DEL",
      }),
      invalidatesTags: ["Courses"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCoursesQuery,
  useCoursesBootcampQuery,
  useCourseQuery,
  useNewCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesApi;
