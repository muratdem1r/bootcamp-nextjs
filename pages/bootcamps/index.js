// domain.com/bootcamps

import { FaRegHandPointDown } from "react-icons/fa";
import { useBootcampsQuery } from "../../services/bootcampsApi";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Components
import BootcampList from "../../components/bootcamps/BootcampList";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import CreateBootcamp from "../../components/bootcamps/CreateBootcamp";

function BootcampsPage() {
  const currentUser = useSelector((state) => state.currentUser.user);
  const [canCreateBootcamp, setCanCreateBootcamp] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [bootcamps, setBootcamps] = useState([]);

  const {
    data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useBootcampsQuery({ page, limit: 12 });

  useEffect(() => {
    if (data?.data?.length) {
      if (page === 1) {
        setBootcamps([...data.data]);
      } else {
        setBootcamps([...bootcamps, ...data.data]);
      }
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
        {currentUser &&
          (currentUser.role === "admin" ||
            currentUser.role === "publisher") && (
            <CreateBootcamp setPage={setPage} />
          )}

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
