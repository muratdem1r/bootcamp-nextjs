import Link from "next/link";
import { useSelector } from "react-redux";

// Components
import Card from "../ui/Card";
import Button from "../ui/Button";
import UpdateBootcamp from "./UpdateBootcamp";

function BootcampItem({ bootcamp, setPage }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  return (
    <Card className="bg-slate-300 h-full">
      <h1 className="text-white font-bold text-2xl text-center">
        {bootcamp.name}
      </h1>
      <p className="text-neutral-500 clamp">{bootcamp.description}</p>
      <div className="flex items-end self-end ">
        <ul className="flex flex-wrap">
          {bootcamp.careers.map((career, i) => {
            return (
              <li key={i} className="bg-neutral-200 m-0.5 p-0.5">
                <span className="gradient-text-purple font-bold">{career}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center">
        {currentUser?._id === bootcamp.user && (
          <UpdateBootcamp bootcamp={bootcamp} setPage={setPage} />
        )}
        <Link href={"/bootcamps/" + bootcamp._id}>
          <a className="ml-auto">
            <Button className="text-xs p-3 rounded bg-indigo-800">
              More info
            </Button>
          </a>
        </Link>
      </div>
    </Card>
  );
}

export default BootcampItem;
