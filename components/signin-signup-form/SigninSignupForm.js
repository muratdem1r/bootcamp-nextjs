import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Button from "../ui/Button";

function SigninSignupForm() {
  const router = useRouter();

  const [registerInputs, setRegisterInputs] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loginInputs, setloginInputs] = useState({
    email: "",
    password: "",
  });

  const registerInputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegisterInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const loginInputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setloginInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const registerSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_HOST + "/api/v1/auth/register",
        {
          name: registerInputs.name,
          email: registerInputs.email,
          password: registerInputs.password,
          role: registerInputs.role,
        }
      );

      toast.success("You have successfully registered.");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("This account allready exists!");
    }
  };
  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_HOST + "/api/v1/auth/login",
        {
          email: loginInputs.email,
          password: loginInputs.password,
        }
      );
      toast.success("You have successfully logged in.");
      const resCurrentUser = await axios.get(
        process.env.NEXT_PUBLIC_HOST + "/api/v1/auth/me",
        { headers: { Authorization: "Bearer " + res.data.token } }
      );
      console.log(resCurrentUser);
      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Wrong email or password!");
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
            type="name"
            name="name"
            id="registerName"
            onChange={registerInputHandler}
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
            onChange={registerInputHandler}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="border"
            type="password"
            name="password"
            id="registerPassword"
            onChange={registerInputHandler}
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
            onChange={loginInputHandler}
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
            onChange={loginInputHandler}
            required
          />
        </div>
        <Button className="bg-slate-400 w-1/3 mx-auto py-2">Submit</Button>
      </form>
    </>
  );
}

export default SigninSignupForm;
