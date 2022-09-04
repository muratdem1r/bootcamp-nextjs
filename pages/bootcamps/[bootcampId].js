// domain.com/bootcamps/bootcampId

import axios from "axios";
import BootcampDetail from "../../components/bootcamps/BootcampDetail";

function BootcampDetailsPage({ bootcamp, reviews, courses }) {
  return (
    <BootcampDetail bootcamp={bootcamp} reviews={reviews} courses={courses} />
  );
}

export async function getStaticPaths() {
  const res = await axios.get(process.env.HOST + "/api/v1/bootcamps");
  const data = res.data.data;

  const paths = data.map((bootcamp) => {
    return {
      params: { bootcampId: bootcamp._id },
    };
  });

  return {
    fallback: false,
    paths: paths,
  };
}

export async function getStaticProps(context) {
  // Fetching single bootcamp from API
  const bootcampId = context.params.bootcampId;

  // Bootcamp Details

  const res = await axios.get(
    process.env.HOST + "/api/v1/bootcamps/" + bootcampId
  );
  const data = res.data.data;

  // Reviews for bootcamp
  const path = `/api/v1/bootcamps/${bootcampId}/reviews`;

  const resReviews = await axios.get(process.env.HOST + path);
  const dataReviews = resReviews.data.data;

  const config = {
    headers: {
      Authorization: "Bearer " + process.env.ADMIN_TOKEN,
    },
  };

  const reviews = dataReviews.map(async (review) => {
    // User Infos
    const userRes = await axios.get(
      process.env.HOST + "/api/v1/users/" + review.user,
      config
    );
    const user = userRes.data.data;

    // Reviews with user infos
    return {
      name: user.name,
      email: user.email,
      role: user.role,
      title: review.title,
      text: review.text,
      rating: review.rating,
    };
  });

  // Courses for bootcamp
  const resCourses = await axios.get(
    process.env.HOST + `/api/v1/bootcamps/${bootcampId}/courses`
  );
  const dataCourses = resCourses.data.data.map((course) => {
    return { id: course._id, name: course.title };
  });

  return {
    props: {
      bootcamp: data,
      reviews: await Promise.all(reviews),
      courses: dataCourses,
    },
    revalidate: 100,
  };
}

export default BootcampDetailsPage;
