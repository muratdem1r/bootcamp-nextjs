import React from "react";

function Card({ children, className }) {
  return (
    <div
      className={`shadow-md grid items-start gap-y-5 p-5 rounded ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
