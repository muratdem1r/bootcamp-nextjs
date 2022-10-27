import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { skipToken } from "@reduxjs/toolkit/dist/query/react";

// Store
import { wrapper } from "../store/store";
import { setCurrentUser } from "../store/slices/currentUserSlice";
import { switchDarkMode } from "../store/slices/darkModeSlice";

// Services
import { useGetLoggedinUserQuery } from "../services/authApi";

// Components
import Layout from "../components/layout/Layout";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "../components/ui/ScrollToTop";

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [token, setToken] = useState(skipToken);

  const { data: user, isSuccess } = useGetLoggedinUserQuery(token);

  useEffect(() => {
    console.log("welcome");
    const darkMode = localStorage.getItem("darkMode");

    if (darkMode === "dark") {
      dispatch(switchDarkMode());
    }

    const localToken = localStorage.getItem("token");
    if (localToken === null) return;
    setToken(localToken);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log("success");
      dispatch(setCurrentUser({ user: user?.data }));
    } else {
      dispatch(setCurrentUser({ user: null }));
    }
  }, [user]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
      <ScrollToTop />
    </div>
  );
}

export default wrapper.withRedux(MyApp);
