import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUsersQuery } from "../../services/usersApi";
import { useBootcampsQuery } from "../../services/bootcampsApi";
import { useCoursesQuery } from "../../services/coursesApi";
import { Tab } from "@headlessui/react";
import UsersTable from "../../components/dashboard/UsersTable";
import CourseItem from "../../components/dashboard/CourseItem";
import BootcampItem from "../../components/dashboard/BootcampItem";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

function index() {
  const currentUser = useSelector((state) => state.currentUser.user);
  const router = useRouter();

  const {
    data: users,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useUsersQuery();
  const { data: bootcamps, isLoading: isBootcampsLoading } =
    useBootcampsQuery();
  const { data: courses, isLoading: isCoursesLoading } = useCoursesQuery();

  useEffect(() => {
    if (!currentUser || currentUser?.role !== "admin") {
      router.push("/");
    }
  }, [currentUser]);

  if (currentUser?.role === "admin") {
    return (
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
              <LoadingSpinner />
            ) : (
              isUsersSuccess && <UsersTable users={users} />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {isBootcampsLoading ? (
              <LoadingSpinner />
            ) : (
              bootcamps?.data.map((bootcamp) => {
                return <BootcampItem key={bootcamp._id} bootcamp={bootcamp} />;
              })
            )}
          </Tab.Panel>
          <Tab.Panel>
            {isCoursesLoading ? (
              <LoadingSpinner />
            ) : (
              courses?.data.map((course) => {
                return <CourseItem key={course._id} course={course} />;
              })
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    );
  }
  return null;
}

export default index;
