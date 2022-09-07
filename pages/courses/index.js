// domain.com/courses

import { FaRegHandPointDown } from "react-icons/fa";
import { useCoursesQuery } from "../../services/coursesApi";

// Components
import CoursesList from "../../components/courses/CoursesList";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

function CoursesPage() {
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useCoursesQuery();

  let content;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = (
      <>
        <h1 className="text-3xl font-bold text-center mb-8">
          Courses
          <FaRegHandPointDown className="inline" />
        </h1>
        <CoursesList courses={courses.data} />
      </>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return content;
}

export default CoursesPage;
