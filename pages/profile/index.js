import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function ProfilePage() {
  const router = useRouter();
  const currentUser = useSelector((state) => state.currentUser.user);

  useEffect(() => {
    if (!currentUser) router.push("/");
  }, [currentUser]);

  return (
    currentUser && (
      <div>
        <p>{currentUser.data.name}</p>
        <p>{currentUser.data.email}</p>
      </div>
    )
  );
}

export default ProfilePage;
