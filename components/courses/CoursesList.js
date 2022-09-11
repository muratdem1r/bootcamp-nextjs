// Components
import { InView } from "react-intersection-observer";
import CourseItem from "./CourseItem";

function CoursesList({ courses, setPage, nextPage }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
      {courses.map((course, index) => {
        if (courses.length - 1 === index) {
          return (
            <InView
              key={course._id}
              onChange={(inView, entry) => {
                if (inView) {
                  setPage(nextPage);
                }
              }}
            >
              <CourseItem course={course} />
            </InView>
          );
        }
        return <CourseItem key={course._id} course={course} />;
      })}
    </div>
  );
}

export default CoursesList;
