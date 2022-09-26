import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useUpdatePassMutation,
  useUpdateUserDetailsMutation,
} from "../../services/authApi";
import { useBootcampsQuery } from "../../services/bootcampsApi";
import { useEffect } from "react";
import Link from "next/link";

// Components
import Button from "../ui/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UpdateBootcamp from "../bootcamps/UpdateBootcamp";
import DeleteBootcamp from "../bootcamps/DeleteBootcamp";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import CreateBootcamp from "../bootcamps/CreateBootcamp";
import LoadingSpinner from "../ui/LoadingSpinner";

function Profile() {
  const currentUser = useSelector((state) => state.currentUser.user);
  const [profileBootcamps, setProfileBootcamps] = useState([]);

  const {
    data = [],
    isLoading,
    isSuccess,
  } = useBootcampsQuery({
    limit: 1000,
  });
  useEffect(() => {
    if (isSuccess) {
      let array = [];
      data.data.forEach((bootcamp) => {
        if (currentUser._id === bootcamp.user) {
          array.push(bootcamp);
        }
      });
      setProfileBootcamps(array);
    }
  }, [data]);
  const [updateUser] = useUpdateUserDetailsMutation();
  const [updatePass] = useUpdatePassMutation();

  const [updatePressed, setUpdatePressed] = useState(false);
  const [mismatchedPass, setMismatchedPass] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPass: "",
    newPass: "",
    newPassConfirm: "",
  });
  const [passwordTypes, setPasswordTypes] = useState({
    currentPass: "password",
    newPass: "password",
    newPassConfirm: "password",
  });

  const [inputs, setInputs] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const updateSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await updateUser(inputs);
    if (res.error) {
      toast.error("Something went wrong!");
    } else {
      setUpdatePressed(false);
      toast.success("You have updated your profile.");
    }
  };
  const changePassSubmitHandler = async (e) => {
    e.preventDefault();
    const { currentPass, newPass, newPassConfirm } = passwords;

    if (newPass !== newPassConfirm) {
      setMismatchedPass(true);
    } else {
      setMismatchedPass(false);
      const res = await updatePass({
        currentPassword: currentPass,
        newPassword: newPass,
      });
      if (res.error) {
        if (res.error.status === 401) {
          setWrongPass(true);
          return;
        } else {
          toast.error("Something went wrong!");
        }
      } else {
        setUpdatePressed(false);
        setWrongPass(false);
        toast.success("You have updated your password.");
      }
    }
  };

  const date = new Date(currentUser.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <form
        onSubmit={updateSubmitHandler}
        className="flex flex-col gap-5 p-5 shadow my-10 relative"
      >
        <div className="flex text-lg gap-2 absolute right-0 top-0 m-5">
          <AiFillEdit
            onClick={() => setUpdatePressed(!updatePressed)}
            className="text-green-500 cursor-pointer text-xl"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Name</h1>
          <input
            className={`bg-white dark:bg-dark duration-100 ease-in-out ${
              updatePressed &&
              "border-2 border-slate-300 rounded p-2 focus:outline-none focus:border-slate-100 my-5"
            }`}
            type="text"
            name="name"
            id="name"
            value={inputs.name}
            onChange={inputHandler}
            disabled={!updatePressed}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Email</h1>
          <input
            className={`bg-white dark:bg-dark duration-100 ease-in-out ${
              updatePressed &&
              "border-2 border-slate-300 rounded p-2 focus:outline-none focus:border-slate-100 my-5"
            }`}
            type="email"
            name="email"
            id="email"
            value={inputs.email}
            onChange={inputHandler}
            disabled={!updatePressed}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Role</h1>
          <p>{currentUser.role}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Created At</h1>
          <p>{date}</p>
        </div>
        {updatePressed && (
          <Button className="py-2.5 px-5 bg-green-500  mt-2 sm:w-1/4 sm:ml-auto">
            Save
          </Button>
        )}
      </form>
      {updatePressed && (
        <form onSubmit={changePassSubmitHandler} className="flex flex-col">
          <div className="my-5 flex flex-col sm:flex-row sm:items-center gap-3">
            <label htmlFor="currentPass">Current Password:</label>
            <div>
              <input
                className={`
                border-2 rounded p-2 focus:outline-none  ml-2 text-black ${
                  wrongPass
                    ? "border-red-500 focus:border-red-400"
                    : "border-slate-300 focus:border-slate-100"
                }`}
                type={passwordTypes.currentPass}
                name="currentPass"
                id="currentPass"
                required
                minLength={6}
                value={passwords.currentPass}
                onChange={(e) =>
                  setPasswords((prev) => {
                    return { ...prev, currentPass: e.target.value };
                  })
                }
              />
              {passwordTypes.currentPass === "password" ? (
                <FaEyeSlash
                  onClick={() =>
                    setPasswordTypes((prev) => {
                      return { ...prev, currentPass: "text" };
                    })
                  }
                  className="inline ml-2 cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={() =>
                    setPasswordTypes((prev) => {
                      return { ...prev, currentPass: "password" };
                    })
                  }
                  className="inline ml-2 cursor-pointer"
                />
              )}
            </div>
          </div>
          <div className="my-5 flex flex-col sm:flex-row sm:items-center gap-3">
            <label htmlFor="newPass">New Password:</label>
            <div>
              <input
                className={`
                border-2 rounded p-2 focus:outline-none  ml-2 text-black ${
                  mismatchedPass
                    ? "border-red-500 focus:border-red-400"
                    : "border-slate-300 focus:border-slate-100"
                }`}
                type={passwordTypes.newPass}
                name="newPass"
                id="newPass"
                required
                minLength={6}
                value={passwords.newPass}
                onChange={(e) =>
                  setPasswords((prev) => {
                    return { ...prev, newPass: e.target.value };
                  })
                }
              />
              {passwordTypes.newPass === "password" ? (
                <FaEyeSlash
                  onClick={() =>
                    setPasswordTypes((prev) => {
                      return { ...prev, newPass: "text" };
                    })
                  }
                  className="inline ml-2 cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={() =>
                    setPasswordTypes((prev) => {
                      return { ...prev, newPass: "password" };
                    })
                  }
                  className="inline ml-2 cursor-pointer"
                />
              )}
            </div>
          </div>
          <div className="my-5 flex flex-col sm:flex-row sm:items-center gap-3">
            <label htmlFor="newPassConfirm">Confirm:</label>
            <div>
              <input
                className={`
                border-2 rounded p-2 focus:outline-none  ml-2 text-black ${
                  mismatchedPass
                    ? "border-red-500 focus:border-red-400"
                    : "border-slate-300 focus:border-slate-100"
                }`}
                type={passwordTypes.newPassConfirm}
                name="newPassConfirm"
                id="newPassConfirm"
                required
                minLength={6}
                value={passwords.newPassConfirm}
                onChange={(e) =>
                  setPasswords((prev) => {
                    return { ...prev, newPassConfirm: e.target.value };
                  })
                }
              />
              {passwordTypes.newPassConfirm === "password" ? (
                <FaEyeSlash
                  onClick={() =>
                    setPasswordTypes((prev) => {
                      return { ...prev, newPassConfirm: "text" };
                    })
                  }
                  className="inline ml-2 cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={() =>
                    setPasswordTypes((prev) => {
                      return { ...prev, newPassConfirm: "password" };
                    })
                  }
                  className="inline ml-2 cursor-pointer"
                />
              )}
            </div>
          </div>
          {mismatchedPass && (
            <p className="text-red-600 font-bold">passwords must match.</p>
          )}
          {wrongPass && (
            <p className="text-red-600 font-bold">Wrong password.</p>
          )}
          <Button className="py-2.5 px-5 bg-red-600 mt-2 sm:w-1/4">
            Change Password
          </Button>
        </form>
      )}
      {profileBootcamps && currentUser.role !== "user" && (
        <div className="p-5 shadow my-10 relative">
          <h3 className="mb-5 font-bold">Your Bootcamps</h3>
          {isLoading && <LoadingSpinner className="mb-2" />}
          {currentUser.role !== "admin" &&
          isSuccess &&
          profileBootcamps.length === 0 ? (
            <CreateBootcamp />
          ) : (
            isSuccess && (
              <ul className="flex flex-col gap-2 mb-5">
                {profileBootcamps.map((bootcamp, i) => {
                  return (
                    <li className="flex items-center hover:underline" key={i}>
                      <GoPrimitiveDot className="text-xs mr-1" />
                      <Link href={`/bootcamps/${bootcamp.id}`}>
                        {bootcamp.name}
                      </Link>
                      <DeleteBootcamp
                        className="flex items-center gap-1 p-1 ml-1 text-red-600 font-medium hover:text-red-700 hover:underline"
                        bootcamp={bootcamp}
                      >
                        <AiFillDelete />
                      </DeleteBootcamp>
                      <UpdateBootcamp
                        className="flex items-center gap-1 p-1 text-green-600 font-medium hover:text-green-700 hover:underline"
                        bootcamp={bootcamp}
                      >
                        <AiFillEdit />
                      </UpdateBootcamp>
                    </li>
                  );
                })}
              </ul>
            )
          )}
          {currentUser.role === "admin" && <CreateBootcamp />}
        </div>
      )}
    </>
  );
}

export default Profile;
