import React from "react";
import Image from "next/image";

function LoadingSpinner({ className }) {
  return (
    <div className={className}>
      <Image src="/Settings.gif" alt="loading" width="64" height="64"></Image>
    </div>
  );
}

export default LoadingSpinner;
