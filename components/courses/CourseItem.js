import { useRouter } from "next/router";
import { useSelector } from "react-redux";

// Components
import Card from "../ui/Card";
import Button from "../ui/Button";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function CourseItem({ course, setPage }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push("/courses/" + course._id);
  };

  return (
    <Card className="bg-orange-300/80 flex flex-col h-full">
      <div className="flex flex-col gap-y-5 p-5 ">
        <h1 className="text-white font-bold text-2xl text-center">
          {course.title}
        </h1>
        <p className="text-neutral-900 text-clamp">{course.description}</p>
      </div>
      <div className="flex items-center justify-between mt-auto p-5">
        <div className="flex flex-wrap">
          <div className="bg-neutral-200 m-0.5 p-0.5">
            <span className="gradient-text-purple font-bold">
              {course.minimumSkill}
            </span>
          </div>
        </div>
        <Button
          className="text-xs py-1 px-3 rounded bg-slate-700"
          onClick={showDetailsHandler}
        >
          More info
        </Button>
      </div>

      {(currentUser?._id === course.user || currentUser?.role === "admin") && (
        <div className="flex items-center px-5 pb-5">
          <UpdateCourse
            className="flex items-center gap-1 p-1 text-green-600 font-medium hover:text-green-700 hover:underline"
            course={course}
            setPage={setPage}
          >
            Edit
            <AiFillEdit className="inline" />
          </UpdateCourse>
          <DeleteCourse
            className="flex items-center gap-1 p-1 text-red-600 font-medium hover:text-red-700 hover:underline"
            course={course}
            setPage={setPage}
          >
            Delete
            <AiFillDelete className="inline" />
          </DeleteCourse>
        </div>
      )}
    </Card>
  );
}

export default CourseItem;
