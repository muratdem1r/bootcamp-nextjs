import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNewReviewMutation } from "../../services/reviewsApi";
import Button from "../ui/Button";

function ReviewForm({ id }) {
  const token = localStorage.getItem("token");

  const [newReview] = useNewReviewMutation();

  const [inputs, setInputs] = useState({
    title: "",
    text: "",
    rating: 5,
  });

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    newReview({ data: inputs, id, token });
  };

  return (
    <form
      className="flex flex-col gap-5 p-5 shadow my-5"
      onSubmit={formSubmitHandler}
    >
      <h1 className="font-bold">Leave a Comment</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Title</label>
        <input
          className="border"
          type="text"
          name="title"
          id="title"
          onChange={inputHandler}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="text">Text</label>
        <textarea
          className="border"
          name="text"
          id="text"
          onChange={inputHandler}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="rating">Rating</label>
        <div className="flex text-2xl">
          {[...Array(10)].map((star, i) => {
            if (i < inputs.rating) {
              return (
                <AiFillStar
                  onClick={() => {
                    setInputs((prev) => {
                      return { ...prev, rating: i + 1 };
                    });
                  }}
                  key={i}
                  className="text-yellow-300 cursor-pointer"
                />
              );
            }
            return (
              <AiOutlineStar
                onClick={() => {
                  setInputs((prev) => {
                    return { ...prev, rating: i + 1 };
                  });
                }}
                key={i}
                className="cursor-pointer"
              />
            );
          })}
        </div>
      </div>

      <Button className="bg-slate-400 w-1/3 mx-auto py-2">Submit</Button>
    </form>
  );
}

export default ReviewForm;
