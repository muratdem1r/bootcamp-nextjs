import { useSelector } from "react-redux";

// Components
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import ReviewUpdate from "./ReviewUpdate";

function ReviewItem({ review, setCanReview }) {
  const currentUserId = useSelector((state) => state.currentUser.user?._id);

  const date = new Date(review.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let content;

  if (currentUserId === review.user) {
    content = <ReviewUpdate review={review} setCanReview={setCanReview} />;
  } else {
    content = (
      <li className="bg-slate-500 my-10 p-5 text-white grid gap-1">
        <h5 className="text font-bold text-lg">
          {review.title}
          <span className="opacity-40 text-sm font-light ml-2">
            ({review.user})
          </span>
        </h5>
        <p className="opacity-60">{date}</p>
        <div className="flex">
          {[...Array(10)].map((star, i) => {
            if (i <= review.rating) {
              return <AiFillStar key={i} className="text-yellow-300" />;
            }
            return <AiOutlineStar key={i} />;
          })}
        </div>
        <p>{review.text}</p>
      </li>
    );
  }

  return content;
}

export default ReviewItem;
