import { useSelector } from "react-redux";

// Components
import Link from "next/link";
import Card from "../ui/Card";
import Image from "next/image";
import UpdateBootcamp from "./UpdateBootcamp";
import DeleteBootcamp from "./DeleteBootcamp";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function BootcampItem({ bootcamp, setParams }) {
  const currentUser = useSelector((state) => state.currentUser.user);

  const photo = "/" + bootcamp.photo;

  return (
    <Card className="p-5 flex flex-col h-full">
      <Link href={"/bootcamps/" + bootcamp._id}>
        <a>
          <div className="flex flex-col h-full">
            <div className="w-full h-44 relative">
              <Image
                src={photo}
                alt={bootcamp.name}
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="flex flex-1 flex-col gap-y-3 mt-5">
              <h1 className="text-black dark:text-white font-bold text-2xl">
                {bootcamp.name}
              </h1>
              <p className="text-neutral-500 dark:text-neutral-300 text-clamp-2">
                {bootcamp.description}
              </p>
              <ul className="flex flex-wrap mt-2">
                {bootcamp.careers.map((career, i) => {
                  return (
                    <li
                      key={i}
                      className="bg-neutral-100 dark:bg-neutral-300 m-0.5 p-0.5"
                    >
                      <span className="gradient-text-purple font-bold">
                        {career}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </a>
      </Link>
      {(currentUser?._id === bootcamp.user ||
        currentUser?.role === "admin") && (
        <div className="flex items-center mt-auto">
          <DeleteBootcamp
            className="flex items-center gap-1 p-1 ml-1 text-red-600 font-medium hover:text-red-700 hover:underline"
            bootcamp={bootcamp}
            setParams={setParams}
          >
            Delete <AiFillDelete className="inline" />
          </DeleteBootcamp>
          <UpdateBootcamp
            className="flex items-center gap-1 p-1 text-green-600 font-medium hover:text-green-700 hover:underline"
            bootcamp={bootcamp}
            setParams={setParams}
          >
            Edit
            <AiFillEdit className="inline" />
          </UpdateBootcamp>
        </div>
      )}
    </Card>
  );
}

export default BootcampItem;
