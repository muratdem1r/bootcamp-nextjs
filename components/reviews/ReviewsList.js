// Components
import ReviewItem from "./ReviewItem";

function ReviewsList({ reviews }) {
  return (
    <ul className="flex flex-col">
      {reviews.map((review, i) => {
        return <ReviewItem key={i} review={review} />;
      })}
    </ul>
  );
}

export default ReviewsList;
