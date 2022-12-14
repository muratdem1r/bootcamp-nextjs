import React, { Fragment } from "react";

import Link from "next/link";
import NextLink from "../ui/NextLink";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../store/slices/currentUserSlice";
import { switchDarkMode } from "../../store/slices/darkModeSlice";

// Components
import { Menu, Transition } from "@headlessui/react";
import { GiTireIronCross } from "react-icons/gi";
import { BiChevronDown, BiUser, BiLogOut } from "react-icons/bi";
import { FaSolarPanel } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import Button from "../ui/Button";
import { MdDarkMode, MdLightMode } from "react-icons/md";

import styles from "./Navbar.module.css";

function Navbar() {
  const currentUser = useSelector((state) => state.currentUser.user);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const dispatch = useDispatch();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  const logoutHandler = () => {
    setIsOpen(false);
    localStorage.clear("token");
    dispatch(logout());
    toast.success("Logged out!");
  };

  const darkModeHandler = () => {
    if (!darkMode) {
      localStorage.setItem("darkMode", "dark");
    } else {
      localStorage.setItem("darkMode", "white");
    }
    dispatch(switchDarkMode());
  };

  return (
    <header className={`${styles.header} dark:bg-navbar`}>
      <div className="w-11/12 max-w-7xl mx-auto flex justify-between items-center py-5">
        <div className={styles.logo}>
          <Link href="/">murat</Link>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-controls="navbar"
          aria-expanded="false"
          className="z-10"
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            <GiTireIronCross
              className="block md:hidden h-6 w-6 dark:text-white"
              aria-hidden="true"
            />
          ) : (
            <IoIosMenu
              className="block md:hidden h-8 w-8 dark:text-white"
              aria-hidden="true"
            />
          )}
        </button>
        <nav
          className={`flex justify-center items-center transition-transform bg-slate-100 dark:bg-navbar h-screen fixed top-0 left-0 md:h-auto w-full md:static md:w-auto ${
            !isOpen ? "translate-x-full md:translate-x-0" : ""
          } `}
          id="navbar"
        >
          <ul className="flex flex-col items-center md:flex-row text-stone-900 dark:text-white">
            <li
              onClick={() => {
                setIsOpen(false);
              }}
              className={router.pathname === "/bootcamps" ? styles.active : ""}
            >
              <Link href="/bootcamps">Bootcamps</Link>
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
              }}
              className={router.pathname === "/courses" ? styles.active : ""}
            >
              <Link href="/courses">Courses</Link>
            </li>
            <li>
              {currentUser ? (
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="text-black dark:text-white inline-flex justify-center items-center rounded-md bg-opacity-20 bg-slate-400 px-2 py-1  hover:bg-opacity-30 hover:text-black">
                      {currentUser.name}
                      <BiChevronDown
                        className="ml-2 -mr-1 h-5 w-5 text-black dark:text-white"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute -right-14 md:right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <NextLink href="/profile">
                              <button
                                onClick={() => {
                                  setIsOpen(false);
                                }}
                                className={`${
                                  active
                                    ? "bg-gray-500 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                <BiUser className="mr-2" />
                                Profile
                              </button>
                            </NextLink>
                          )}
                        </Menu.Item>
                        {currentUser.role === "admin" && (
                          <Menu.Item>
                            {({ active }) => (
                              <NextLink href="/dashboard">
                                <button
                                  onClick={() => {
                                    setIsOpen(false);
                                  }}
                                  className={`${
                                    active
                                      ? "bg-gray-500 text-white"
                                      : "text-gray-900"
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                  <FaSolarPanel className="mr-2" />
                                  Dashboard
                                </button>
                              </NextLink>
                            )}
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logoutHandler}
                              className={`${
                                active
                                  ? "bg-gray-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <BiLogOut className="mr-2" />
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <NextLink href="/signin-signup">
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="py-2.5 px-5 bg-indigo-800 dark:hover:shadow-white"
                  >
                    Sign-in
                  </Button>
                </NextLink>
              )}
            </li>
            <li>
              <button onClick={darkModeHandler}>
                {darkMode ? (
                  <MdDarkMode className="text-xl hover:cursor-pointer text-black dark:text-white hover:scale-125 transition-transform" />
                ) : (
                  <MdLightMode className="text-xl hover:cursor-pointer text-black dark:text-white hover:scale-125 transition-transform" />
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
