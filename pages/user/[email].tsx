import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppSelector } from "../../app/hooks";
import YourArticle from "../../components/Blog/YourArticle";
import Header from "../../components/Header";
import Loading from "../../components/loading/Loading";
import ProfileBar from "../../components/Profile/ProfileBar";
import Sidebar from "../../components/Sidebar";
import { auth } from "../../lib/firebase";

const UserProfile = () => {
  const router = useRouter();
  const { email } = router.query;
  const [user] = useAuthState(auth);
  const userEmail = user?.email;
  const mode = useAppSelector((state) => state.mode.ModeState);

  const userDetailsByEmail = async () => {
    const response = await fetch("/api/userDetails", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email: email }),
    });
    return response.json();
  };
  const { data: profileUserDetails, isLoading: userLoading } = useQuery(
    ["userData", email],
    userDetailsByEmail,
    { enabled: !!email }
  );
  const fetchUserDataByEmail = async () => {
    const response = await fetch("/api/userDetails", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }),
    });
    return response.json();
  };
  const { data: userDetails, isLoading } = useQuery(
    ["userData", userEmail],
    fetchUserDataByEmail,
    { enabled: !!userEmail }
  );
  if (userLoading) return <Loading />;
  return (
    <div className="flex">
      <Head>
        <title>Wride | {profileUserDetails.name}</title>
      </Head>
      <Sidebar />
      <div
        className={`md:ml-[50px] min-h-screen ml-[15vw] md:w-full  flex-1  w-[90vw]  ${
          mode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <Header
          title={"Profile"}
          name={userDetails?.name}
          email={userDetails?.email}
          profilePhoto={userDetails?.profilePhoto}
        />
        <div className={`ml-[4rem] w-[90%] mx-auto`}>
          <ProfileBar
            yourProfile={userEmail === profileUserDetails.email ? true : false}
            yourId={userDetails?.id}
            userEmail={profileUserDetails?.email}
            profilePhoto={profileUserDetails?.profilePhoto}
            userName={profileUserDetails?.name}
            bio={profileUserDetails?.bio}
            followers={profileUserDetails?.follower?.length}
            following={profileUserDetails?.following?.length}
            blog={profileUserDetails?.blog?.length}
          />
          <YourArticle userBlogs={profileUserDetails?.blog} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
