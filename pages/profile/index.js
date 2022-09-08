import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import Profile from "../../components/profile/Profile";

function ProfilePage() {
  const router = useRouter();
  const currentUser = useSelector((state) => state.currentUser.user);

  useEffect(() => {
    if (!currentUser) router.push("/");
  }, [currentUser]);

  return currentUser && <Profile />;
}

export default ProfilePage;
