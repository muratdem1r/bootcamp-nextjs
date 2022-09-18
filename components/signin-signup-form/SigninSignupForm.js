import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { setCurrentUser } from "../../store/slices/currentUserSlice";
import { useDispatch } from "react-redux";
import {
  useRegisterMutation,
  useLoginMutation,
  useGetLoggedinUserQuery,
} from "../../services/authApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";

// Components
import Button from "../ui/Button";
import NextLink from "../ui/NextLink";
import { FaUserAlt, FaLock, FaUnlock } from "react-icons/fa";
import { Transition } from "@headlessui/react";
import { MdEmail } from "react-icons/md";

function SigninSignupForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showRegister, setShowRegister] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(skipToken);
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const { data: user, isSuccess } = useGetLoggedinUserQuery(token);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCurrentUser({ user: user.data }));
      router.push("/");
    }
  }, [user, isSuccess]);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const registerSubmitHandler = async (e) => {
    e.preventDefault();

    const res = await register({
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      role: inputs.role,
    });
    if (res.error) {
      toast.error("This account allready exists!");
    } else {
      loginSubmitHandler(e);
      toast.success("You have successfully registered.");
    }
  };
  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    const res = await login({
      email: inputs.email,
      password: inputs.password,
    });
    if (res.error) {
      toast.error("Wrong email or password!");
    } else {
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      toast.success("Welcome");
    }
  };

  return (
    <>
      <Transition
        show={showRegister}
        enter="transition-all duration-700"
        enterFrom="scale-0 opacity-0"
        enterTo="scale-1 opacity-100"
        leave="transition-all duration-1000"
        leaveFrom="scale-1 opacity-100"
        leaveTo="scale-0 opacity-0"
      >
        <form
          className="flex flex-col gap-6 p-5 my-10 absolute top-0 left-0 right-0 bottom-0"
          onSubmit={registerSubmitHandler}
        >
          <h1 className="font-bold text-2xl text-center">Register</h1>
          <div className="relative flex items-center rounded-full bg-gray-100">
            <FaUserAlt className="text-black/60 text-2xl absolute left-5 top-1/2 -translate-y-1/2" />
            <input
              className="focus:outline-none w-full text-lg font-semibold bg-gray-100 text-black/60 placeholder-black/40 p-4 pl-14 rounded-full"
              type="text"
              name="name"
              id="registerName"
              placeholder="Name"
              onChange={inputHandler}
              value={inputs.name}
              required
            />
          </div>
          <div className="relative flex items-center rounded-full bg-gray-100">
            <MdEmail className="text-black/60 text-2xl absolute left-5 top-1/2 -translate-y-1/2" />
            <input
              className="focus:outline-none w-full text-lg font-semibold bg-gray-100 text-black/60 placeholder-black/40 p-4 pl-14 rounded-full"
              type="email"
              name="email"
              id="registerEmail"
              placeholder="Email"
              onChange={inputHandler}
              value={inputs.email}
              required
            />
          </div>
          <div className="relative flex items-center rounded-full bg-gray-100">
            {!showPassword ? (
              <FaLock
                onClick={() => setShowPassword(!showPassword)}
                className="text-black/60 text-2xl absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            ) : (
              <FaUnlock
                onClick={() => setShowPassword(!showPassword)}
                className="text-black/60 text-2xl absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            )}

            <input
              minLength={6}
              className="focus:outline-none w-full text-lg font-semibold bg-gray-100 text-black/60 placeholder-black/40 p-4 pl-14 rounded-full"
              type={showPassword ? "text" : "password"}
              name="password"
              id="registerPassword"
              placeholder="Password"
              onChange={inputHandler}
              value={inputs.password}
              required
            />
          </div>
          <button
            type="button"
            className="lg:w-1/2 mx-auto hover:underline"
            onClick={() => setShowRegister(!showRegister)}
          >
            Already have an account? Sign in!
          </button>
          <Button className="bg-slate-400 w-1/3 mx-auto py-2">Submit</Button>
        </form>
      </Transition>
      <Transition
        show={!showRegister}
        enter="transition-all duration-700"
        enterFrom="scale-0 opacity-0"
        enterTo="scale-1 opacity-100"
        leave="transition-all duration-1000"
        leaveFrom="scale-1 opacity-100"
        leaveTo="scale-0 opacity-0"
      >
        <form
          className="flex flex-col gap-6 p-5 my-10 absolute top-0 left-0 right-0 bottom-0"
          onSubmit={loginSubmitHandler}
        >
          <h1 className="font-bold text-2xl text-center">Login</h1>
          <div className="relative rounded-full bg-gray-100">
            <MdEmail className="text-black/60 text-2xl absolute left-5 top-1/2 -translate-y-1/2" />
            <input
              className="focus:outline-none w-full text-lg font-semibold bg-gray-100 text-black/60 placeholder-black/40 p-4 pl-14 rounded-full"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={inputHandler}
              value={inputs.email}
              required
            />
          </div>
          <div className="relative flex items-center rounded-full bg-gray-100">
            {!showPassword ? (
              <FaLock
                onClick={() => setShowPassword(!showPassword)}
                className="text-black/60 text-2xl absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            ) : (
              <FaUnlock
                onClick={() => setShowPassword(!showPassword)}
                className="text-black/60 text-2xl absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            )}
            <input
              className="focus:outline-none w-full text-lg font-semibold bg-gray-100 text-black/60 placeholder-black/40 p-4 pl-14 rounded-full"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              onChange={inputHandler}
              value={inputs.password}
              required
            />
          </div>
          <NextLink
            className="text-center hover:underline"
            href="/forgotpassword"
          >
            Forgot Password?
          </NextLink>
          <button
            type="button"
            className="lg:w-1/2 mx-auto hover:underline"
            onClick={() => setShowRegister(!showRegister)}
          >
            Don`t you have account yet? Sign Up!
          </button>
          <Button className="bg-slate-400 w-1/3 mx-auto py-2">Submit</Button>
        </form>
      </Transition>
    </>
  );
}

export default SigninSignupForm;
