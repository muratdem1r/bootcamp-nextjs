import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUsersQuery } from "../../services/usersApi";
import { useBootcampsQuery } from "../../services/bootcampsApi";
import { useCoursesQuery } from "../../services/coursesApi";
import { Tab } from "@headlessui/react";
import UsersTable from "../../components/dashboard/UsersTable";
import CoursesTable from "../../components/dashboard/CoursesTable";
import BootcampsTable from "../../components/dashboard/BootcampsTable";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/dist/query";

function DashboardPage() {
  const currentUser = useSelector((state) => state.currentUser.user);
  const router = useRouter();

  const [hideContent, setHideContent] = useState(true);
  const [bootcampParameters, setBootcampParameters] = useState(skipToken);
  const [courseParameters, setCourseParameters] = useState(skipToken);

  const {
    data: users,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useUsersQuery({ limit: 1000 });

  const {
    data: bootcamps,
    isLoading: isBootcampsLoading,
    isSuccess: isBootcampsSuccess,
  } = useBootcampsQuery(bootcampParameters);

  const {
    data: courses,
    isLoading: isCoursesLoading,
    isSuccess: isCoursesSuccess,
  } = useCoursesQuery(courseParameters);

  const bootcampsButtonHandler = () => {
    setBootcampParameters({ limit: 1000 });
  };
  const coursesButtonHandler = () => {
    setCourseParameters({ limit: 1000 });
  };

  useEffect(() => {
    if (currentUser?.role === "admin") {
      setHideContent(false);
    } else {
      router.push("/");
    }
  }, [currentUser]);

  return (
    !hideContent && (
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 dark:bg-blue-900/50 p-1">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5
            ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
              selected
                ? "bg-blue-500 text-white"
                : "text-blue-700 dark:text-blue-300"
            }`}
              >
                Users
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                onClick={bootcampsButtonHandler}
                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5
            ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
              selected
                ? "bg-blue-500 text-white"
                : "text-blue-700 dark:text-blue-300"
            }`}
              >
                Bootcamps
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                onClick={coursesButtonHandler}
                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5
            ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
              selected
                ? "bg-blue-500 text-white"
                : "text-blue-700 dark:text-blue-300"
            }`}
              >
                Courses
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            {isUsersLoading ? (
              <LoadingSpinner className="mt-20 mx-auto" />
            ) : (
              isUsersSuccess && <UsersTable users={users} />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {isBootcampsLoading ? (
              <LoadingSpinner className="mt-20 mx-auto" />
            ) : (
              isBootcampsSuccess && <BootcampsTable bootcamps={bootcamps} />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {isCoursesLoading ? (
              <LoadingSpinner className="mt-20 mx-auto" />
            ) : (
              isCoursesSuccess && <CoursesTable courses={courses} />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    )
  );
}

export default DashboardPage;
