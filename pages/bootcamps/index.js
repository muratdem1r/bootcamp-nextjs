// domain.com/bootcamps
import axios from "axios";
import BootcampList from "../../components/bootcamps/BootcampList";

function BootcampsPage({ bootcamps }) {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Bootcamps!</h1>
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
