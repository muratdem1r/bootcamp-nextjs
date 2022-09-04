import { AiOutlineStar, AiFillStar } from "react-icons/ai";

function ReviewItem({ review }) {
  return (
    <li className="bg-slate-500 my-10 p-5 text-white grid gap-1">
      <p className="mb-1">
        {review.name} <span className="opacity-20">({review.role})</span>
      </p>
      <div className="flex">
        {[...Array(10)].map((star, i) => {
          if (i <= review.rating) {
            return <AiFillStar className="text-yellow-300" />;
          }
          return <AiOutlineStar />;
        })}
      </div>
      <h5 className="text font-bold text-lg">{review.title}</h5>
      <p>{review.text}</p>
    </li>
  );
}

export default ReviewItem;
