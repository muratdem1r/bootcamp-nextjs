// domain.com/bootcamps

import { FaRegHandPointDown } from "react-icons/fa";
import { useBootcampsQuery } from "../../services/bootcampsApi";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Components
import BootcampList from "../../components/bootcamps/BootcampList";
import PageLoadingSpinner from "../../components/ui/PageLoadingSpinner";
import CreateBootcamp from "../../components/bootcamps/CreateBootcamp";
import FilterBootcamps from "../../components/bootcamps/FilterBootcamps";

function BootcampsPage() {
  const currentUser = useSelector((state) => state.currentUser.user);
  const [nextPage, setNextPage] = useState(1);
  const [bootcamps, setBootcamps] = useState([]);

  const [params, setParams] = useState({
    page: 1,
    limit: 12,
    careersIn: undefined,
    averageCost: undefined,
    housing: undefined,
    jobAssistance: undefined,
    jobGuarantee: undefined,
    acceptGi: undefined,
  });

  const {
    data = [],
    isLoading,
    isSuccess,
    isError,
  } = useBootcampsQuery(params);

  useEffect(() => {
    if (data?.data?.length > 0) {
      if (params.page === 1) {
        setBootcamps([...data.data]);
      } else {
        setBootcamps([...bootcamps, ...data.data]);
      }
      if (data?.pagination?.next?.page) {
        setNextPage(data.pagination.next.page);
      }
    } else if (data?.data?.length === 0) {
      setBootcamps([]);
    }
  }, [data]);

  let content;
  if (isLoading) {
    content = <PageLoadingSpinner />;
  } else if (isSuccess) {
    content = (
      <>
        {currentUser &&
          (currentUser.role === "admin" ||
            currentUser.role === "publisher") && (
            <CreateBootcamp setParams={setParams} />
          )}
        <h2 className="text-xl font-bold my-8 ">Filter</h2>
        <FilterBootcamps params={params} setParams={setParams} />

        <h1 className="text-3xl font-bold text-center mb-8">
          Bootcamps
          <FaRegHandPointDown className="inline" />
        </h1>
        <BootcampList
          setParams={setParams}
          nextPage={nextPage}
          bootcamps={bootcamps}
        />
      </>
    );
  } else if (isError) {
    content = <></>;
  }

  return content;
}

export default BootcampsPage;
