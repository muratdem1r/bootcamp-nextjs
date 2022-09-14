import Link from "next/link";
import { useSelector } from "react-redux";

// Components
import Card from "../ui/Card";
import Button from "../ui/Button";
import UpdateBootcamp from "./UpdateBootcamp";
import Image from "next/image";
function BootcampItem({ bootcamp, setPage }) {
  const currentUser = useSelector((state) => state.currentUser.user);

  const photo = "/" + bootcamp.photo;

  return (
    <Card className="bg-slate-300">
      <div className="w-full h-44 md:h-72 relative">
        <Image
          src={photo}
          alt={bootcamp.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t"
        />
      </div>
      <div className="p-5 flex flex-col gap-y-5">
        <h1 className="text-white font-bold text-2xl text-center">
          {bootcamp.name}
        </h1>
        <p className="text-neutral-500 clamp">{bootcamp.description}</p>
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
      <div className="flex items-center mt-auto p-5">
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
