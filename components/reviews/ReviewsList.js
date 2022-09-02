import ReviewItem from "./ReviewItem";

function ReviewsList({ reviews }) {
  return (
    <ul>
      {reviews.map((review) => {
        return <ReviewItem review={review} />;
      })}
    </ul>
  );
}

export default ReviewsList;
