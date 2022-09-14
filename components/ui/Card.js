import React from "react";

function Card({ children, className }) {
  return (
    <div className={`shadow-md rounded flex flex-col h-full ${className}`}>
      {children}
    </div>
  );
}

export default Card;
