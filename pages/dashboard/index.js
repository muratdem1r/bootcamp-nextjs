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
import PageLoadingSpinner from "../../components/ui/PageLoadingSpinner";
import { useState } from "react";

function DashboardPage() {
  const currentUser = useSelector((state) => state.currentUser.user);
  const router = useRouter();

  const [hideContent, setHideContent] = useState(true);

  const {
    data: users,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useUsersQuery({ limit: 50 });

  const {
    data: bootcamps,
    isLoading: isBootcampsLoading,
    isSuccess: isBootcampsSuccess,
  } = useBootcampsQuery({ limit: 50 });

  const {
    data: courses,
    isLoading: isCoursesLoading,
    isSuccess: isCoursesSuccess,
  } = useCoursesQuery({ limit: 50 });

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
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5
            ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
              selected ? "bg-blue-500 text-white" : "text-blue-700"
            }`}
              >
                Users
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5
            ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
              selected ? "bg-blue-500 text-white" : "text-blue-700"
            }`}
              >
                Bootcamps
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5
            ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${
              selected ? "bg-blue-500 text-white" : "text-blue-700"
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
              <PageLoadingSpinner />
            ) : (
              isUsersSuccess && <UsersTable users={users} />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {isBootcampsLoading ? (
              <PageLoadingSpinner />
            ) : (
              isBootcampsSuccess && <BootcampsTable bootcamps={bootcamps} />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {isCoursesLoading ? (
              <PageLoadingSpinner />
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
