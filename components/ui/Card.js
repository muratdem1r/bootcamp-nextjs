import React from "react";

function Card({ children }) {
  return (
    <div className="bg-slate-300 shadow-md grid items-start gap-y-5 p-5 rounded">
      {children}
    </div>
  );
}

export default Card;
