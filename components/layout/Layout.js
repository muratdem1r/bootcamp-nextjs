// Components
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="w-11/12 my-12 mx-auto max-w-7xl">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
