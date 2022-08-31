import { useRouter } from "next/router";
import Card from "../ui/Card";
import Button from "../ui/Button";

function BootcampItem({ bootcamp }) {
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push("/bootcamps/" + bootcamp.id);
  };

  return (
    <Card>
      <h1 className="text-white font-bold text-2xl text-center">
        {bootcamp.name}
      </h1>
      <p className="text-neutral-500 clamp">{bootcamp.description}</p>
      <div className="flex items-end self-end ">
        <div className="flex flex-wrap">
          {bootcamp.careers.map((career) => {
            return (
              <div className="bg-neutral-200 m-0.5 p-0.5">
                <span className="gradient-text font-bold">{career}</span>
              </div>
            );
          })}
        </div>
        <Button
          className="text-xs py-1 px-3 rounded"
          onClick={showDetailsHandler}
        >
          More info
        </Button>
      </div>
    </Card>
  );
}

export default BootcampItem;
