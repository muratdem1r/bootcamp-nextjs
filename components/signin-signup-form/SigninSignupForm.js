import React from "react";
import Button from "../ui/Button";

function SigninSignupForm() {
  const registerSubmitHandler = (e) => {
    e.preventDefault();
  };
  const loginSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        className="flex flex-col gap-5 p-5 shadow my-5"
        onSubmit={registerSubmitHandler}
      >
        <h1 className="font-bold">Register</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input className="border" type="email" name="email" id="email" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="border"
            type="password"
            name="password"
            id="password"
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
          <input className="border" type="email" name="email" id="email" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="border"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <Button className="bg-slate-400 w-1/3 mx-auto py-2">Submit</Button>
      </form>
    </>
  );
}

export default SigninSignupForm;
