import React from "react";

function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`text-white  hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[3px_3px_0_0] hover:shadow-black ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
