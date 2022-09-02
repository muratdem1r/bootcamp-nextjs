import React from "react";
import Image from "next/image";

function BootcampDetail({ bootcamp, reviews }) {
  const photo = "/" + bootcamp.photo;
  console.log(reviews);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(bootcamp.createdAt).toLocaleDateString(
    "en-US",
    options
  );

  return (
    <>
      <div className="grid">
        <h1>{bootcamp.name}</h1>
        <h1>{bootcamp.averageCost}</h1>
        <h1>{bootcamp.description}</h1>
        <h1>{bootcamp.email}</h1>
        <h1>{bootcamp.phone}</h1>
        <h1>{bootcamp.website}</h1>
        <h1>{bootcamp.jobAssistance.toString()}</h1>
        <h1>{bootcamp.jobGuarantee.toString()}</h1>
        <h1>{bootcamp.housing.toString()}</h1>
        <h1>{date}</h1>
        <Image src={photo} alt={bootcamp.name} width={1920} height={1280} />
        <ul>
          {bootcamp.careers.map((career, i) => {
            return <li key={i}>{career}</li>;
          })}
        </ul>
      </div>
    </>
  );
}

export default BootcampDetail;
