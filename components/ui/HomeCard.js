import Image from "next/image";
import Button from "../ui/Button";
import NextLink from "../ui/NextLink";

function HomeCard({
  name,
  desc,
  link,
  photo,
  textGradient,
  photoGradient,
  className,
}) {
  return (
    <div
      className={`flex flex-col justify-between items-center shadow-sm p-5  border border-black rounded md:flex-row md:px-24 md:py-24 ${className}`}
    >
      <div>
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
      </div>
      {photo && (
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
      )}
    </div>
  );
}

export default HomeCard;
