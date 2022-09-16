import Link from "next/link";
import { useSelector } from "react-redux";

// Components
import Button from "../../components/ui/Button";
import { BsCheckLg, BsXOctagonFill } from "react-icons/bs";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function CourseDetail({ course }) {
  const currentUser = useSelector((state) => state.currentUser.user);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(course.createdAt).toLocaleDateString("en-US", options);

  return (
    <div className="grid shadow-sm p-5 gap-5 bg-neutral-100">
      {(currentUser?._id === course.user || currentUser?.role === "admin") && (
        <div className="flex items-center gap-3">
          <UpdateCourse
            className="flex items-center gap-1 p-1 text-green-600 font-medium hover:text-green-700 hover:underline"
            course={course}
          >
            Edit
            <AiFillEdit className="inline" />
          </UpdateCourse>
          <DeleteCourse
            className="flex items-center gap-1 p-1 text-red-600 font-medium hover:text-red-700 hover:underline"
            course={course}
            returnHome={true}
          >
            Delete
            <AiFillDelete className="inline" />
          </DeleteCourse>
        </div>
      )}
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <h5>{date}</h5>
      <div>
        Duration:
        <span className="font-bold ml-2">{course.weeks} weeks</span>
      </div>
      <div>
        Tuition:
        <span className="text-green-500 font-bold ml-2">
          {course.tuition === 0 ? "Free" : "$" + course.tuition}
        </span>
      </div>
      <div>
        Minimum Skill:
        <span className="gradient-text-purple font-bold ml-2">
          {course.minimumSkill}
        </span>
      </div>
      <p className="my-3 max-w-2xl">{course.description}</p>
      <div className="flex items-center gap-x-2">
        Scholarship:
        {course.scholarshipAvailable ? (
          <BsCheckLg className="text-green-600 text-xl" />
        ) : (
          <BsXOctagonFill className="text-red-600 text-xl" />
        )}
      </div>
      <div className="border-2 rounded mt-10 p-5 md:w-1/2">
        <h5 className="font-bold text-lg text-slate-800">
          {course.bootcamp.name}
        </h5>
        <p className="my-3 max-w-2xl text-slate-600">
          {course.bootcamp.description}
        </p>

        <Link className="w-full" href={"/bootcamps/" + course.bootcamp.id}>
          <a>
            <Button className="py-2.5 px-5 bg-indigo-800 text-sm">
              check out
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default CourseDetail;
