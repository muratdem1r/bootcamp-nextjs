import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { skipToken } from "@reduxjs/toolkit/dist/query/react";

// Store
import { wrapper } from "../store/store";
import { setCurrentUser } from "../store/slices/currentUserSlice";

// Services
import { useGetLoggedinUserQuery } from "../services/authApi";

// Components
import Layout from "../components/layout/Layout";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  const [token, setToken] = useState(skipToken);

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLoggedinUserQuery(token);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken === null) return;
    setToken(localToken);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCurrentUser({ user: user.data }));
    }
  }, [user, isSuccess]);

  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
