// domain.com/bootcamps/bootcampId

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

function BootcampDetailsPage() {
  const router = useRouter();

  return (
    <h1 className="text-3xl font-bold underline text-center">
      Bootcamp singular!
    </h1>
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          bootcampId: "5d725a1b7b292f5f8ceff788",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  // Fetching single bootcamp from API

  const bootcampId = context.params.bootcampId;
  console.log(bootcampId);
  return {
    props: {
      data: {},
    },
    revalidate: 10,
  };
}

export default BootcampDetailsPage;
