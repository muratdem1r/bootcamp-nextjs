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

function SigninSignupForm() {
  const router = useRouter();
  const dispatch = useDispatch();

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
      <form
        className="flex flex-col gap-5 p-5 shadow my-5"
        onSubmit={registerSubmitHandler}
      >
        <h1 className="font-bold">Register</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            className="border"
            type="text"
            name="name"
            id="registerName"
            onChange={inputHandler}
            value={inputs.name}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="border"
            type="email"
            name="email"
            id="registerEmail"
            onChange={inputHandler}
            value={inputs.email}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            minLength={6}
            className="border"
            type="password"
            name="password"
            id="registerPassword"
            onChange={inputHandler}
            value={inputs.password}
            required
          />
        </div>
        <Button className="bg-slate-400 w-1/3 mx-auto py-2">Submit</Button>
      </form>
      <form
        className="flex flex-col gap-5 p-5 shadow my-10"
        onSubmit={loginSubmitHandler}
      >
        <h1 className="font-bold">Login</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="border"
            type="email"
            name="email"
            id="email"
            onChange={inputHandler}
            value={inputs.email}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="border"
            type="password"
            name="password"
            id="password"
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
        <Button className="bg-slate-400 w-1/3 mx-auto py-2">Submit</Button>
      </form>
    </>
  );
}

export default SigninSignupForm;
