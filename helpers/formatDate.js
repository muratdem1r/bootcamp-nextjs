const formatDate = (createdAt) => {
  return new Date(createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default formatDate;
