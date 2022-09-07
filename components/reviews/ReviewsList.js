// Components
import ReviewItem from "./ReviewItem";

function ReviewsList({ reviews }) {
  return (
    <ul>
      {reviews.map((review, i) => {
        return <ReviewItem key={i} review={review} />;
      })}
    </ul>
  );
}

export default ReviewsList;
