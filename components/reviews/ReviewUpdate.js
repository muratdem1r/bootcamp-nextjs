import React, { useEffect, useState } from "react";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { toast } from "react-toastify";
import {
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "../../services/reviewsApi";
import Button from "../ui/Button";

function ReviewUpdate({ review, setCanReview }) {
  const [updatePressed, setUpdatePressed] = useState(false);
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

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
  const deleteHandler = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui ">
            <h1>Are you sure?</h1>
            <p>You want to delete this review?</p>
            <button
              className="text-green-500 block border border-green-500 rounded p-2 my-2 w-full hover:bg-green-500 hover:text-white ease-in-out duration-300"
              onClick={onClose}
            >
              No
            </button>
            <button
              className="text-red-500 block border border-red-500 rounded p-2 my-2 w-full hover:bg-red-500 hover:text-white  ease-in-out duration-300"
              onClick={() => {
                confirmDeleteHandler();
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
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
            onClick={deleteHandler}
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
    </li>
  );
}

export default ReviewUpdate;
