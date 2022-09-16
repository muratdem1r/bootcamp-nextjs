import Link from "next/link";

// Components
import Button from "../../components/ui/Button";
import { BsCheckLg, BsXOctagonFill } from "react-icons/bs";

function CourseDetail({ course }) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(course.createdAt).toLocaleDateString("en-US", options);

  return (
    <div className="grid shadow-sm p-5 gap-5 bg-neutral-100">
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
