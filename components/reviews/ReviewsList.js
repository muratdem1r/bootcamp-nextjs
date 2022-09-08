// Components
import ReviewItem from "./ReviewItem";

function ReviewsList({ reviews, setCanReview }) {
  return (
    <ul className="flex flex-col">
      {reviews.map((review, i) => {
        return (
          <ReviewItem key={i} review={review} setCanReview={setCanReview} />
        );
      })}
    </ul>
  );
}

export default ReviewsList;
