import React from "react";
import Image from "next/image";

function LoadingSpinner() {
  return (
    <Image src="/Settings.gif" alt="loading" width="64" height="64"></Image>
  );
}

export default LoadingSpinner;
