import { useRouter } from "next/router";

// Components
import Card from "../ui/Card";
import Button from "../ui/Button";

function CourseItem({ course }) {
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push("/courses/" + course._id);
  };

  return (
    <Card className="bg-orange-300/80">
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
    </Card>
  );
}

export default CourseItem;
