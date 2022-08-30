import Link from "next/link";
import { Fragment } from "react";

function HomePage() {
  return (
    <Fragment>
      <Link href="/courses/Deneme">Deneme</Link>
      <h1 className="text-3xl font-bold underline text-center">Hello world!</h1>
    </Fragment>
  );
}

export default HomePage;
