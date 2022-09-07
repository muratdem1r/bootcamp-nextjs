// domain.com/bootcamps/bootcampId

import { useRouter } from "next/router";
import { useBootcampQuery } from "../../services/bootcampsApi";
import { useCoursesBootcampQuery } from "../../services/coursesApi";
import { useReviewsBootcampQuery } from "../../services/reviewsApi";

// Components
import BootcampDetail from "../../components/bootcamps/BootcampDetail";
import NotFound from "../../components/not-found/NotFound";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

function BootcampDetailsPage() {
  const router = useRouter();

  const id = router.query.bootcampId;

  const {
    data: bootcamp,
    isLoading: isBootcampLoading,
    isSuccess: isBootcampSuccess,
    isError: isBootcampError,
    error: bootcampError,
  } = useBootcampQuery(id);

  const {
    data: courses,
    isLoading: isCoursesLoading,
    isSuccess: isCoursesSuccess,
    isError: isCoursesError,
    error: coursesError,
  } = useCoursesBootcampQuery(id);

  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isSuccess: isReviewsSuccess,
    isError: isReviewsError,
    error: reviewsError,
  } = useReviewsBootcampQuery(id);

  let content;

  if (isBootcampLoading && isCoursesLoading && isReviewsLoading) {
    content = <LoadingSpinner />;
  } else if (isBootcampSuccess && isCoursesSuccess && isReviewsSuccess) {
    content = (
      <BootcampDetail
        bootcamp={bootcamp.data}
        reviews={reviews.data}
        courses={courses.data}
      />
    );
  } else if (isBootcampError || isCoursesError || isReviewsError) {
    content = <NotFound />;
  }

  return content;
}

export default BootcampDetailsPage;
