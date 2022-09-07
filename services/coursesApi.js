import { rootApi } from "./rootApi";

export const coursesApi = rootApi.injectEndpoints({
  reducerPath: "coursesApi",

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
      query: (data, id, token) => ({
        url: `bootcamps/${id}/courses`,
        method: "POST",
        body: data,
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      invalidatesTags: ["Courses"],
    }),

    updateCourse: builder.mutation({
      query: (data, id, token) => ({
        url: `courses/${id}`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      invalidatesTags: ["Courses"],
    }),

    deleteCourse: builder.mutation({
      query: (id, token) => ({
        url: `courses/${id}`,
        method: "DEL",
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      invalidatesTags: ["Courses"],
    }),
  }),
});

export const {
  useCoursesQuery,
  useCoursesBootcampQuery,
  useCourseQuery,
  useNewCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesApi;
