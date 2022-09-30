import { useRouter } from "next/router";
import React from "react";

const UserProfile = () => {
  const router = useRouter();
  const { user } = router.query;
  return <div>UserProfile userId : {user}</div>;
};

export default UserProfile;
