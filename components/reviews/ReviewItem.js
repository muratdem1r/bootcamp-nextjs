import { useUserQuery } from "../../services/usersApi";
import { useSelector } from "react-redux";

// Components
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import LoadingSpinner from "../ui/LoadingSpinner";
import ReviewUpdate from "./ReviewUpdate";

function ReviewItem({ review, setCanReview }) {
  const currentUserId = useSelector((state) => state.currentUser.user?._id);

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useUserQuery(review.user);

  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    if (currentUserId === review.user) {
      content = (
        <ReviewUpdate user={user} review={review} setCanReview={setCanReview} />
      );
    } else {
      content = (
        <li className="bg-slate-500 my-10 p-5 text-white grid gap-1">
          <p>
            {user.data.name}
            <span className="opacity-20">({user.data.role})</span>
          </p>
          <p className="mb-1 opacity-40">{user.data.email}</p>
          <div className="flex">
            {[...Array(10)].map((star, i) => {
              if (i <= review.rating) {
                return <AiFillStar key={i} className="text-yellow-300" />;
              }
              return <AiOutlineStar key={i} />;
            })}
          </div>
          <h5 className="text font-bold text-lg">{review.title}</h5>
          <p>{review.text}</p>
        </li>
      );
    }
  } else if (isError) {
    console.log(error);
    content = "Something went wrong";
  }

  return content;
}

export default ReviewItem;
