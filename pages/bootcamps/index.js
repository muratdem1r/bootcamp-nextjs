// domain.com/bootcamps

import axios from "axios";
import { FaRegHandPointDown } from "react-icons/fa";
import BootcampList from "../../components/bootcamps/BootcampList";

function BootcampsPage({ bootcamps }) {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8">
        Bootcamps
        <FaRegHandPointDown className="inline" />
      </h1>
      <BootcampList bootcamps={bootcamps} />
    </>
  );
}

export async function getStaticProps() {
  // Fetching data from API
  const res = await axios.get(process.env.HOST + "/api/v1/bootcamps");
  const data = res.data.data;

  return {
    props: {
      bootcamps: data,
    },
    revalidate: 10,
  };
}

export default BootcampsPage;
