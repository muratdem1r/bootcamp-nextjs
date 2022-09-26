import { useState } from "react";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../services/authApi";
// Components
import Button from "../ui/Button";
import { FaUserAlt, FaLock, FaUnlock } from "react-icons/fa";
import { Transition } from "@headlessui/react";
import { MdEmail } from "react-icons/md";

function RegisterForm({
  inputs,
  inputHandler,
  isShow,
  setIsShow,
  loginSubmitHandler,
}) {
  const [register] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [mismatchedPass, setMismatchedPass] = useState(false);

  const registerSubmitHandler = async (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.passwordConfirm) {
      setMismatchedPass(true);
    } else {
      setMismatchedPass(false);
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
    }
  };

  return (
    <Transition
      show={isShow.register}
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
            className={`focus:outline-none w-full text-lg font-semibold bg-gray-100 text-black/60 placeholder-black/40 p-4 pl-14 rounded-full ${
              mismatchedPass && "border-2 border-red-500 focus:border-red-400"
            }`}
            type={showPassword ? "text" : "password"}
            name="password"
            id="registerPassword"
            placeholder="Password"
            onChange={inputHandler}
            value={inputs.password}
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
            className={`focus:outline-none w-full text-lg font-semibold bg-gray-100 text-black/60 placeholder-black/40 p-4 pl-14 rounded-full ${
              mismatchedPass && "border-2 border-red-500 focus:border-red-400"
            }`}
            type={showPassword ? "text" : "password"}
            name="passwordConfirm"
            id="registerPassword"
            placeholder="Confirm password"
            onChange={inputHandler}
            value={inputs.passwordConfirm}
            required
          />
        </div>
        {mismatchedPass && (
          <p className="text-red-600 font-bold">passwords must match.</p>
        )}
        <button
          type="button"
          className="hover:underline"
          onClick={() =>
            setIsShow({ register: !isShow.register, login: !isShow.login })
          }
        >
          Already have an account?
          <br />
          Sign in!
        </button>
        <Button className="bg-slate-400 w-1/3 mx-auto py-2">Submit</Button>
      </form>
    </Transition>
  );
}

export default RegisterForm;
