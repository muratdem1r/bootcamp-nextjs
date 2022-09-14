function BootcampItem({ bootcamp }) {
  const date = new Date(bootcamp.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex justify-between gap-10">
      <p>{bootcamp._id}</p>
      <p>{bootcamp.name}</p>
      <p>{date}</p>
      <p>{bootcamp.user}</p>
    </div>
  );
}

export default BootcampItem;
