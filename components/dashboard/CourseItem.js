function CourseItem({ course }) {
  const date = new Date(course.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="flex justify-between gap-10">
      <p>{course._id}</p>
      <p>{course.title}</p>
      <p>{date}</p>
      <p>{course.user}</p>
      <p>{course.bootcamp.name}</p>
    </div>
  );
}

export default CourseItem;
