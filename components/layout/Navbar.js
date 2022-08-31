import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GiTireIronCross } from "react-icons/gi";
import { IoIosMenu } from "react-icons/io";
import Button from "../ui/Button";
import styles from "./Navbar.module.css";

function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <header className={styles.header}>
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
              className="block md:hidden h-6 w-6"
              aria-hidden="true"
            />
          ) : (
            <IoIosMenu className="block md:hidden h-8 w-8" aria-hidden="true" />
          )}
        </button>
        <nav
          className={`flex justify-center items-center ease-in duration-300 bg-slate-100 h-screen fixed top-0 left-0 md:h-auto w-full md:static md:w-auto ${
            !isOpen ? "translate-x-full md:translate-x-0" : ""
          } `}
          id="navbar"
        >
          <ul className="flex flex-col items-center md:flex-row">
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
            <li
              onClick={() => {
                setIsOpen(false);
              }}
              className={router.pathname === "/signin" ? styles.active : ""}
            >
              <Button className={"py-2.5 px-5"}>
                <Link href="/signin">Sign-in</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
