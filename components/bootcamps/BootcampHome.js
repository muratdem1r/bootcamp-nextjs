import { useBootcampsQuery } from "../../services/bootcampsApi";
import Image from "next/image";
import Button from "../ui/Button";
import NextLink from "../ui/NextLink";
import LoadingSpinner from "../ui/LoadingSpinner";

function BootcampHome() {
  const {
    data: bootcamps,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useBootcampsQuery();

  const firstBootcamp = bootcamps?.data[0];
  const photo = "/" + firstBootcamp?.photo;

  console.log(firstBootcamp);

  let content;

  if (isLoading) {
    content = (
      <div className="flex flex-col justify-between items-center shadow-sm p-5  border border-black rounded md:flex-row md:px-24 md:py-24"></div>
    );
  } else if (isSuccess) {
    content = (
      <div className="flex flex-col justify-between items-center shadow-sm p-5  border border-black rounded md:flex-row md:px-24 md:py-24">
        <div>
          <h1 className="text-2xl font-bold">{firstBootcamp.name}</h1>
          <p className="my-3 max-w-xl">{firstBootcamp.description}</p>
          <NextLink href={`/bootcamps/${firstBootcamp.id}`}>
            <Button className="border border-black p-2 gradient-text-purple text-xl font-bold">
              Check out
            </Button>
          </NextLink>
        </div>
        <div className="relative after:w-1/2 after:h-1/2 after:bg-gradient-to-r after:from-indigo-500 after:to-pink-500 after:absolute after:bottom-0 after:-right-1 after:rounded-br after:-z-10">
          <Image
            width={320}
            height={320}
            src={photo}
            alt={firstBootcamp.name}
            className="rounded"
          />
        </div>
      </div>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return content;
}

export default BootcampHome;
