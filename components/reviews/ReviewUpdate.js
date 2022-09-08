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

function ReviewUpdate({ user, review, setCanReview }) {
  const [updatePressed, setUpdatePressed] = useState(false);
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const [inputs, setInputs] = useState({
    title: review.title,
    text: review.text,
    rating: review.rating,
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
      toast.success("You have successfully updated your comment.");
    }
  };
  const confirmDeleteHandler = async () => {
    const res = await deleteReview({ id: review._id });
    if (res.error) {
      console.log(res.error);
      toast.error("Something went wrong!");
    } else {
      setCanReview(true);
      toast.success("Your review was deleted.");
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
        className="bg-slate-500 my-10 p-5 text-white grid gap-1"
        onSubmit={submitHandler}
      >
        <div className="flex justify-between">
          <p>
            {user.data.name}
            <span className="opacity-20">({user.data.role})</span>
          </p>
          <div className="flex text-lg gap-2">
            <AiFillDelete
              onClick={deleteHandler}
              className="text-red-400 cursor-pointer text-xl"
            />
            <AiFillEdit
              onClick={() => setUpdatePressed(!updatePressed)}
              className="text-green-500 cursor-pointer text-xl"
            />
          </div>
        </div>
        <p className="mb-1 opacity-40">{user.data.email}</p>
        <div className="flex">
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
                      ? "cursor-pointer text-yellow-300"
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
                className={updatePressed ? "cursor-pointer" : ""}
              />
            );
          })}
        </div>
        <input
          className={`bg-slate-500 font-bold text-lg resize-none h-fix ${
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
        <textarea
          className={`bg-slate-500 font-['Nunito'] resize-none h-fix ${
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
        {updatePressed && (
          <Button className="py-2.5 px-5 bg-green-500 w-1/4 ml-auto mt-2">
            Save
          </Button>
        )}
      </form>
    </li>
  );
}

export default ReviewUpdate;
