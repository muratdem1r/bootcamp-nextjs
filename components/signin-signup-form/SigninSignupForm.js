import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { setCurrentUser } from "../../store/slices/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetLoggedinUserQuery } from "../../services/authApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../services/authApi";

// Components
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

function SigninSignupForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const currentUser = useSelector((state) => state.currentUser.user);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "user",
  });

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const [token, setToken] = useState(skipToken);

  const [isShow, setIsShow] = useState({
    register: false,
    login: true,
  });

  const { data: user, isSuccess } = useGetLoggedinUserQuery(token);

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

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCurrentUser({ user: user.data }));
      router.push("/");
    }
  }, [user, isSuccess]);

  return (
    <>
      <RegisterForm
        inputs={inputs}
        inputHandler={inputHandler}
        isShow={isShow}
        setIsShow={setIsShow}
        loginSubmitHandler={loginSubmitHandler}
      />
      <LoginForm
        inputs={inputs}
        inputHandler={inputHandler}
        isShow={isShow}
        setIsShow={setIsShow}
        setToken={setToken}
        loginSubmitHandler={loginSubmitHandler}
      />
    </>
  );
}

export default SigninSignupForm;
