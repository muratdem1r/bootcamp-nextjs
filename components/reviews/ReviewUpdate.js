import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "../../services/reviewsApi";

// Components
import {
  AiFillDelete,
  AiFillEdit,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import Button from "../ui/Button";
import { Dialog, Transition } from "@headlessui/react";

function ReviewUpdate({ review, setCanReview }) {
  const [updatePressed, setUpdatePressed] = useState(false);
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [deletePressed, setDeletePressed] = useState(false);

  const [inputs, setInputs] = useState({
    title: review.title,
    text: review.text,
    rating: review.rating,
  });

  const date = new Date(review.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    setCanReview(false);
  }, []);

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await updateReview({ data: inputs, id: review._id });
    if (res.error) {
      toast.error("Something went wrong!");
    } else {
      setUpdatePressed(false);
      toast.success("You have updated your review.");
    }
  };
  const confirmDeleteHandler = async () => {
    const res = await deleteReview({ id: review._id });
    if (res.error) {
      console.log(res.error);
      toast.error("Something went wrong!");
    } else {
      setCanReview(true);
      toast.success("Your review has been deleted.");
    }
  };

  return (
    <li className="order-first">
      <form
        className="bg-slate-500 my-10 p-5 text-white grid gap-1 relative"
        onSubmit={submitHandler}
      >
        <h5 className="text font-bold text-lg">
          <input
            className={`bg-slate-500 font-bold text-lg ease-in-out duration-100 ${
              updatePressed &&
              "border-2 border-slate-300 rounded p-2 focus:outline-none focus:border-slate-100 my-5"
            }`}
            type="text"
            name="title"
            id="title"
            value={inputs.title}
            onChange={inputHandler}
            disabled={!updatePressed}
            required
          />
          <div className="opacity-40 text-sm font-light">Your review</div>
        </h5>
        <p className="opacity-60">{date}</p>
        <div className="flex my-2">
          {[...Array(10)].map((star, i) => {
            if (i < inputs.rating) {
              return (
                <AiFillStar
                  onClick={() => {
                    if (updatePressed) {
                      setInputs((prev) => {
                        return { ...prev, rating: i + 1 };
                      });
                    }
                  }}
                  key={i}
                  className={
                    updatePressed
                      ? "cursor-pointer text-yellow-300 text-xl ease-in-out duration-100"
                      : "text-yellow-300"
                  }
                />
              );
            }
            return (
              <AiOutlineStar
                onClick={() => {
                  if (updatePressed) {
                    setInputs((prev) => {
                      return { ...prev, rating: i + 1 };
                    });
                  }
                }}
                key={i}
                className={
                  updatePressed
                    ? "cursor-pointer text-xl ease-in-out duration-100"
                    : ""
                }
              />
            );
          })}
        </div>
        <textarea
          className={`bg-slate-500 font-['Nunito'] resize-none ease-in-out duration-100 ${
            updatePressed &&
            "border-2 border-slate-300 rounded p-2 focus:outline-none focus:border-slate-100"
          }`}
          name="text"
          id="text"
          rows={5}
          value={inputs.text}
          onChange={inputHandler}
          disabled={!updatePressed}
          required
        />
        <div className="flex gap-2 absolute top-0 right-0 m-5">
          <AiFillDelete
            onClick={() => {
              setDeletePressed(true);
            }}
            className="text-red-400 cursor-pointer text-xl"
          />
          <AiFillEdit
            onClick={() => setUpdatePressed(!updatePressed)}
            className="text-green-500 cursor-pointer text-xl"
          />
        </div>
        {updatePressed && (
          <Button className="py-2.5 px-5 bg-green-500 w-1/4 ml-auto mt-2">
            Update
          </Button>
        )}
      </form>
      <Transition appear show={deletePressed} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setDeletePressed(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Are you sure?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Do you want to delete your review?
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      className="rounded-md  bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        confirmDeleteHandler();
                        setDeletePressed(false);
                      }}
                    >
                      Yes, Delete it!
                    </button>
                    <button
                      type="button"
                      className="rounded-md  bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => setDeletePressed(false)}
                    >
                      No, thanks
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </li>
  );
}

export default ReviewUpdate;
