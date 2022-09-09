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
    const timer = setTimeout(() => setIsShowing(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex flex-col justify-between items-center shadow-sm p-5  border border-black rounded md:flex-row md:px-24 md:py-24 ${className}`}
    >
      <div>
        {name && (
          <p className="font-bold text-xl opacity-40 mb-10">
            {title} <FaRegHandPointDown className="inline" />
          </p>
        )}
        <Transition
          className="overflow-hidden"
          show={isShowing}
          enter="transition duration-500 ease-in"
          enterFrom="translate-y-52 opacity-0"
          enterTo="translate-y-0 opacity-100"
        >
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="my-3 max-w-xl">{desc}</p>
          {link && (
            <NextLink href={link || ""}>
              <Button
                className={`border border-black p-2 text-xl font-bold mb-5 ${textGradient}`}
              >
                Check out
              </Button>
            </NextLink>
          )}
        </Transition>
      </div>
      {photo && (
        <Transition
          className="overflow-hidden"
          show={isShowing}
          enter="transition duration-700 ease-out"
          enterFrom="translate-x-52 opacity-0"
          enterTo="translate-x-0 opacity-100"
        >
          <div
            className={`relative after:w-1/2 after:h-1/2 after:bg-gradient-to-r after:absolute after:bottom-0 after:-right-1 after:rounded-br after:-z-10 md:ml-5 ${photoGradient}`}
          >
            <Image
              width={320}
              height={320}
              src={photo}
              alt={name}
              className="rounded"
            />
          </div>
        </Transition>
      )}
    </div>
  );
}

export default HomeCard;
