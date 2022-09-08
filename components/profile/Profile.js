import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDeleteUserMutation } from "../../services/usersApi";
import Button from "../ui/Button";

function Profile() {
  const currentUser = useSelector((state) => state.currentUser.user);
  const [deleteUser] = useDeleteUserMutation();

  const [updatePressed, setUpdatePressed] = useState(false);
  const [password, setPassword] = useState("");

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
    console.log(password);
  };

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(currentUser.createdAt).toLocaleDateString(
    "en-US",
    options
  );

  const confirmDeleteHandler = async () => {
    const res = await deleteUser({ id: currentUser._id });
    if (res.error) {
      console.log(res.error);
      toast.error("Something went wrong!");
    } else {
      localStorage.clear("token");
      toast.success("Your account has been deleted.");
    }
  };
  const deleteHandler = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui ">
            <h1>Are you sure?</h1>
            <p>You want to delete this acount?</p>
            <button
              className="text-green-500 block border border-green-500 rounded p-2 my-2 w-full hover:bg-green-500 hover:text-white ease-in-out duration-300"
              onClick={onClose}
            >
              No
            </button>
            <button
              className="text-red-500 block border border-red-500 rounded p-2 my-2 w-full hover:bg-red-500 hover:text-white  ease-in-out duration-300"
              onClick={() => {
                confirmDeleteHandler();
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };

  return (
    <form
      onSubmit={updateSubmitHandler}
      className="flex flex-col gap-5 p-5 shadow my-10 relative"
    >
      <div className="flex text-lg gap-2 absolute right-0 top-0 m-5">
        <AiFillDelete
          onClick={deleteHandler}
          className="text-red-400 cursor-pointer text-xl"
        />
        <AiFillEdit
          onClick={() => setUpdatePressed(!updatePressed)}
          className="text-green-500 cursor-pointer text-xl"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">Name</h1>
        <input
          className={`bg-white duration-100 ease-in-out ${
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
          className={`bg-white duration-100 ease-in-out ${
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
        <div className="flex items-center">
          <div>
            <p className="text-red-600 font-bold">Enter your password</p>
            <input
              className="border-2 border-red-300 rounded p-2 focus:outline-none focus:border-red-100 mb-5"
              minLength={6}
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button className="py-2.5 px-5 bg-green-500 w-1/4 ml-auto mt-2">
            Save
          </Button>
        </div>
      )}
    </form>
  );
}

export default Profile;
