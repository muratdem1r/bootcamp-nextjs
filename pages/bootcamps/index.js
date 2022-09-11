// domain.com/bootcamps

import { FaRegHandPointDown } from "react-icons/fa";
import { useBootcampsQuery } from "../../services/bootcampsApi";
import { useState, useEffect } from "react";

// Components
import BootcampList from "../../components/bootcamps/BootcampList";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

function BootcampsPage() {
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [bootcamps, setBootcamps] = useState([]);

  const {
    data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useBootcampsQuery(page);

  useEffect(() => {
    if (data?.data?.length) {
      setBootcamps([...bootcamps, ...data.data]);
      if (data?.pagination?.next?.page) {
        setNextPage(data.pagination.next.page);
      }
    }
  }, [data]);

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
        <BootcampList
          setPage={setPage}
          nextPage={nextPage}
          bootcamps={bootcamps}
        />
      </>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return content;
}

export default BootcampsPage;
