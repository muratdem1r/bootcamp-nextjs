// domain.com/courses

import axios from "axios";
import CoursesList from "../../components/courses/CoursesList";

function CoursesPage({ courses }) {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Courses!</h1>
      <CoursesList courses={courses} />
    </>
  );
}

export async function getStaticProps() {
  // Fetching data from API
  const res = await axios.get(process.env.HOST + "/api/v1/courses");
  const data = res.data.data;

  return {
    props: {
      courses: data,
    },
    revalidate: 10,
  };
}

export default CoursesPage;
