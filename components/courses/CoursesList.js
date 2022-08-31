import CourseItem from "./CourseItem";

function CoursesList({ courses }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
      {courses.map((course) => {
        return <CourseItem key={course.id} course={course} />;
      })}
    </div>
  );
}

export default CoursesList;
