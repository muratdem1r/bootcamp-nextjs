import React from "react";
import BootcampItem from "./BootcampItem";

function BootcampList({ bootcamps }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
      {bootcamps.map((bootcamp) => {
        return <BootcampItem key={bootcamp.id} bootcamp={bootcamp} />;
      })}
    </div>
  );
}

export default BootcampList;
