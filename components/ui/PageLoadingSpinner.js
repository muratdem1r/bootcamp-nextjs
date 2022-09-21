import React from "react";
import Image from "next/image";

function PagePageLoadingSpinner() {
  return (
    <div className="p fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent">
      <Image src="/Rocket.gif" alt="loading" width="64" height="64"></Image>
    </div>
  );
}

export default PagePageLoadingSpinner;
