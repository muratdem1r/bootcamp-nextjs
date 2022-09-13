import Image from "next/image";
import Button from "../ui/Button";
import NextLink from "../ui/NextLink";
import { FaRegHandPointDown } from "react-icons/fa";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
function HomeCard({
  title,
  name,
  desc,
  link,
  photo,
  textGradient,
  photoGradient,
  className,
}) {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    setIsShowing(true);
  }, []);

  return (
    <div
      className={`flex flex-col overflow-hidden justify-between items-center shadow p-5 border-black rounded lg:flex-row lg:px-24 lg:py-24 ${className}`}
    >
      <div>
        {name && (
          <p className="font-bold text-xl opacity-40 mb-10">
            {title} <FaRegHandPointDown className="inline" />
          </p>
        )}
        <Transition
          className="overflow-hidden flex flex-col gap-3"
          show={isShowing}
          enter="transition duration-500 ease-in"
          enterFrom="translate-y-52 opacity-0"
          enterTo="translate-y-0 opacity-100"
        >
          <h1 className="text-2xl font-bold deneme">{name}</h1>
          <p className="my-3 max-w-xl">{desc}</p>
          {link && (
            <NextLink href={link || ""}>
              <Button
                className={`py-4 px-8 border-2  border-black shadow-lg rounded text-xl font-bold mb-5 ml-1 ${textGradient}  `}
              >
                Check out
              </Button>
            </NextLink>
          )}
        </Transition>
      </div>
      {photo && (
        <Transition
          className={`relative w-full lg:w-[320px] h-[320px]   after:w-1/2 after:h-1/2 after:bg-gradient-to-r after:absolute after:-bottom-1.5 after:-right-1.5 after:rounded after:-z-10 mt-5 lg:mt-0 md:ml-5 ${photoGradient}`}
          show={isShowing}
          enter="transition duration-500 ease-in"
          enterFrom="translate-x-52 opacity-0"
          enterTo="translate-x-0 opacity-100"
        >
          <Image
            width="1920"
            height="1280"
            layout="fill"
            src={photo}
            alt={name}
            className="object-cover rounded overflow-visible"
          />
        </Transition>
      )}
    </div>
  );
}

export default HomeCard;
