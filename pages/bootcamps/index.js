// domain.com/bootcamps
import axios from "axios";
import BootcampList from "../../components/bootcamps/BootcampList";

function BootcampsPage(props) {
  console.log(props.bootcamps.data);
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Bootcamps!</h1>
      <BootcampList />
    </>
  );
}

export async function getStaticProps() {
  // Fetching data from API
  const res = await axios.get("http://localhost:5000/api/v1/bootcamps");

  return {
    props: {
      bootcamps: res.data,
    },
    revalidate: 10,
  };
}

export default BootcampsPage;
