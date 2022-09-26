import { useState } from "react";

// Components
import Button from "../ui/Button";
import NextLink from "../ui/NextLink";
import { FaLock, FaUnlock } from "react-icons/fa";
import { Transition } from "@headlessui/react";
import { MdEmail } from "react-icons/md";
function LoginForm({
  inputs,
  inputHandler,
  isShow,
  setIsShow,
  loginSubmitHandler,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Transition
      show={isShow.login}
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
          className="hover:underline"
          onClick={() =>
            setIsShow({ register: !isShow.register, login: !isShow.login })
          }
        >
          Don`t you have account yet?
          <br />
          Sign Up!
        </button>
        <Button className="bg-slate-400 w-1/3 mx-auto py-2">Submit</Button>
      </form>
    </Transition>
  );
}

export default LoginForm;
