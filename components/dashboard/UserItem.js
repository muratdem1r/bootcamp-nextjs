import React from "react";

function UserItem({ user }) {
  const date = new Date(user.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex justify-between gap-10">
      <p>{user._id}</p>
      <p>{user.role}</p>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{date}</p>
    </div>
  );
}

export default UserItem;
