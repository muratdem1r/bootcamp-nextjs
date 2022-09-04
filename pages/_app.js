import Layout from "../components/layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import Router from "next/router";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { wrapper } from "../store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCurrentUser } from "../features/auth/authSlice";

function MyApp({ Component, pageProps }) {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

  useEffect(() => {
    const loggedInUser = async () => {
      const token = localStorage.getItem("token");

      if (token === null) return;

      try {
        const resCurrentUser = await axios.get(
          process.env.NEXT_PUBLIC_HOST + "/api/v1/auth/me",
          { headers: { Authorization: "Bearer " + token } }
        );

        dispatch(setCurrentUser(resCurrentUser.data.data));
      } catch (error) {
        localStorage.clear("token");
        console.log(error);
      }
    };

    loggedInUser();
  }, []);

  return (
    <Layout>
      {loading && <LoadingSpinner />}
      {!loading && <Component {...pageProps} />}
      <ToastContainer />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
