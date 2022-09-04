import Layout from "../components/layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import Router from "next/router";
import { useState } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { wrapper } from "../store";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

  return (
    <Layout>
      {loading && <LoadingSpinner />}
      {!loading && <Component {...pageProps} />}
      <ToastContainer />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
