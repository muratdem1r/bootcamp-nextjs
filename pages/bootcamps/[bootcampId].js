// domain.com/bootcamps/bootcampId

import axios from "axios";

function BootcampDetailsPage({ bootcamp }) {
  if (bootcamp) {
    return (
      <h1 className="text-3xl font-bold underline text-center">
        Bootcamp singular! {bootcamp.id}
      </h1>
    );
  }
  return <h1>Couldn't find</h1>;
}

export async function getStaticPaths() {
  const res = await axios.get(process.env.HOST + "/api/v1/bootcamps");
  const data = res.data.data;

  const paths = data.map((bootcamp) => {
    return {
      params: { bootcampId: bootcamp.id },
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

  const res = await axios.get(
    process.env.HOST + "/api/v1/bootcamps/" + bootcampId
  );
  const data = res.data.data;

  return {
    props: {
      bootcamp: data,
    },
    revalidate: 10,
  };
}

export default BootcampDetailsPage;
