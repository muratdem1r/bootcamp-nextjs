// domain.com/courses/courseId

import { useRouter } from "next/router";
import { useCourseQuery } from "../../services/coursesApi";

// Components
import CourseDetail from "../../components/courses/CourseDetail";
import NotFound from "../../components/not-found/NotFound";
import PageLoadingSpinner from "../../components/ui/PageLoadingSpinner";

function CourseDetailPage() {
  const router = useRouter();
  const id = router.query.courseId;

  const {
    data: course,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useCourseQuery(id);

  let content;

  if (isLoading) {
    content = <PageLoadingSpinner />;
  } else if (isSuccess) {
    content = <CourseDetail course={course.data} />;
  } else if (isError) {
    console.log(error);
    content = <NotFound />;
  }

  return content;
}

export default CourseDetailPage;
