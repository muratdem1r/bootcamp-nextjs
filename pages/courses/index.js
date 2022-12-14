// domain.com/courses

import { FaRegHandPointDown } from "react-icons/fa";
import { useCoursesQuery } from "../../services/coursesApi";
import { useState, useEffect } from "react";

// Components
import CoursesList from "../../components/courses/CoursesList";
import PageLoadingSpinner from "../../components/ui/PageLoadingSpinner";

function CoursesPage() {
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [courses, setCourses] = useState([]);

  const { data, isLoading, isSuccess, isError, error } = useCoursesQuery({
    page: page,
    limit: 12,
  });

  useEffect(() => {
    if (data?.data?.length) {
      if (page === 1) {
        setCourses([...data.data]);
      } else {
        setCourses([...courses, ...data.data]);
      }
      if (data?.pagination?.next?.page) {
        setNextPage(data.pagination.next.page);
      }
    }
  }, [data]);

  let content;
  if (isLoading) {
    content = <PageLoadingSpinner />;
  } else if (isSuccess) {
    content = (
      <>
        <h1 className="text-3xl font-bold text-center mb-8">
          Courses
          <FaRegHandPointDown className="inline" />
        </h1>
        <CoursesList courses={courses} setPage={setPage} nextPage={nextPage} />
      </>
    );
  } else if (isError) {
    console.log(error);
    content = <></>;
  }

  return content;
}

export default CoursesPage;
