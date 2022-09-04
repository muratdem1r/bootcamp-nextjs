// domain.com/courses/courseId

import axios from "axios";
import { useRouter } from "next/router";

import CourseDetail from "../../components/courses/CourseDetail";

function CourseDetailPage({ course }) {
  const router = useRouter();

  const courseId = router.query.courseId;

  return <CourseDetail course={course} />;
}

export async function getStaticPaths() {
  const res = await axios.get(process.env.HOST + "/api/v1/courses");
  const data = res.data.data;

  const paths = data.map((course) => {
    return {
      params: { courseId: course._id },
    };
  });

  return {
    fallback: false,
    paths: paths,
  };
}

export async function getStaticProps(context) {
  // Fetching single course from API

  const courseId = context.params.courseId;

  // Course Details
  const res = await axios.get(process.env.HOST + "/api/v1/courses/" + courseId);
  const data = res.data.data;

  return {
    props: {
      course: data,
    },
    revalidate: 10,
  };
}

export default CourseDetailPage;
