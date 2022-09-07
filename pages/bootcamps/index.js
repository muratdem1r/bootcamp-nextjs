// domain.com/bootcamps

import { FaRegHandPointDown } from "react-icons/fa";
import { useBootcampsQuery } from "../../services/bootcampsApi";

// Components
import BootcampList from "../../components/bootcamps/BootcampList";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

function BootcampsPage() {
  const {
    data: bootcamps,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useBootcampsQuery();

  let content;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = (
      <>
        <h1 className="text-3xl font-bold text-center mb-8">
          Bootcamps
          <FaRegHandPointDown className="inline" />
        </h1>
        <BootcampList bootcamps={bootcamps.data} />
      </>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return content;
}

export default BootcampsPage;
