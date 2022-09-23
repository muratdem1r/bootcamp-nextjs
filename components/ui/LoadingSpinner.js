import React from "react";
import Image from "next/image";

function LoadingSpinner({ className }) {
  return (
    <div
      className={`${className} bg-[url('/Settings.gif')] dark:bg-[url('/Settings-dark.gif')] w-16 h-16`}
    ></div>
  );
}

export default LoadingSpinner;
