// Components
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen dark:bg-black/90 dark:text-white">
      <Navbar />
      <main className="w-11/12 my-12 mx-auto max-w-7xl">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
