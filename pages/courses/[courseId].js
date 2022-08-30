// domain.com/courses/courseId

import { useRouter } from "next/router";

function CourseDetailPage() {
  const router = useRouter();

  const courseId = router.query.courseId;

  return (
    <h1 className="text-3xl font-bold underline text-center">
      Course singular! {courseId}
    </h1>
  );
}

export default CourseDetailPage;
