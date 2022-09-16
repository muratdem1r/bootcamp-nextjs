import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState } from "react";

// Components
import ReviewsList from "../reviews/ReviewsList";
import { GrMoney } from "react-icons/gr";
import { HiMail, HiPhone } from "react-icons/hi";
import { CgWebsite } from "react-icons/cg";
import { BsCheckLg, BsXOctagonFill } from "react-icons/bs";
import ReviewForm from "../reviews/ReviewForm";
import CreateCourse from "../courses/CreateCourse";
import UpdateBootcamp from "./UpdateBootcamp";
import DeleteBootcamp from "./DeleteBootcamp";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function BootcampDetail({ bootcamp, reviews, courses }) {
  const [canReview, setCanReview] = useState(true);
  const currentUser = useSelector((state) => state.currentUser.user);

  const photo = "/" + bootcamp.photo;

  const date = new Date(bootcamp.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="grid shadow-sm p-5 gap-5 bg-neutral-100">
        {(currentUser?._id === bootcamp.id ||
          currentUser?.role === "admin") && (
          <div className="flex items-center gap-3">
            <UpdateBootcamp
              className="flex items-center gap-1 p-1 text-green-600 font-medium hover:text-green-700 hover:underline"
              bootcamp={bootcamp}
            >
              Edit
              <AiFillEdit className="inline" />
            </UpdateBootcamp>
            <DeleteBootcamp
              className="flex items-center gap-1 p-1 text-red-600 font-medium hover:text-red-700 hover:underline"
              bootcamp={bootcamp}
              returnHome={true}
            >
              Delete
              <AiFillDelete className="inline" />
            </DeleteBootcamp>
          </div>
        )}
        <div className="w-full h-96 relative">
          <Image
            src={photo}
            alt={bootcamp.name}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        </div>
        <h1 className="text-2xl font-bold">{bootcamp.name}</h1>
        <h5>{date}</h5>
        <div className="text-green-500 font-bold flex items-center gap-x-2">
          <GrMoney className="text-xl" />
          {bootcamp.averageCost ? `$${bootcamp.averageCost}` : "Free"}
        </div>
        <p className="my-3 max-w-2xl">{bootcamp.description}</p>
        <div className="flex items-center gap-x-2">
          Average Rating:
          <span className="font-bold text-yellow-500">
            {Number(bootcamp.averageRating).toFixed(2) || "No Rating"}
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          Job Assistance:
          {bootcamp.jobAssistance ? (
            <BsCheckLg className="text-green-600 text-xl" />
          ) : (
            <BsXOctagonFill className="text-red-600 text-xl" />
          )}
        </div>
        <div className="flex items-center gap-x-2">
          Job Guarantee:
          {bootcamp.jobGuarantee ? (
            <BsCheckLg className="text-green-600 text-xl" />
          ) : (
            <BsXOctagonFill className="text-red-600 text-xl" />
          )}
        </div>
        <div className="flex items-center gap-x-2">
          Housing:
          {bootcamp.housing ? (
            <BsCheckLg className="text-green-600 text-xl" />
          ) : (
            <BsXOctagonFill className="text-red-600 text-xl " />
          )}
        </div>
        <div className="flex items-center gap-x-2">
          <HiMail className="text-xl" />
          {bootcamp.email}
        </div>
        <div className="flex items-center gap-x-2">
          <HiPhone className="text-xl" />
          {bootcamp.phone}
        </div>
        <div className="flex items-center gap-x-2">
          <CgWebsite className="text-xl" />
          {bootcamp.website}
        </div>
        <ul className="flex flex-wrap gap-y-2 gap-x-4">
          <h5 className="w-full font-bold">Courses</h5>
          {courses.map((course, i) => {
            return (
              <li
                className="bg-slate-500 text-slate-200 hover:-translate-y-1 hover:shadow-[3px_3px_0_0] hover:shadow-black hover:cursor-pointer"
                key={i}
              >
                <Link href={"/courses/" + course._id}>
                  <a className="inline-block p-1">{course.title}</a>
                </Link>
              </li>
            );
          })}
          {(currentUser?._id === bootcamp.user ||
            currentUser?.role === "admin") && (
            <CreateCourse bootcamp={bootcamp} />
          )}
        </ul>
      </div>
      {currentUser && canReview && <ReviewForm id={bootcamp.id} />}
      <ReviewsList reviews={reviews} setCanReview={setCanReview} />
    </>
  );
}

export default BootcampDetail;
