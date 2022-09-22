import Head from "next/head";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProfileBar from "../components/Profile/ProfileBar";
import YourArticle from "../components/Blog/YourArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { useAppSelector } from "../app/hooks";

const profile = () => {
  const mode = useAppSelector((state) => state.mode.ModeState);
  const [user, loading, error] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState<any>([]);
  const email = user?.email;
  const getUserDetails = async () => {
    if (!email) return;
    const resp = await fetch("/api/userDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    const userDetails = await resp.json();
    setUserDetails(userDetails);
  };
  useEffect(() => {
    getUserDetails();
  }, [user]);
  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex ">
      <Head>
        <title>Wrider | John Doe</title>
      </Head>

      <Sidebar />
      <div
        className={`md:ml-[50px] ml-[15vw] md:w-full  flex-1  w-[90vw]  ${
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
            userEmail={userDetails?.email}
            profilePhoto={userDetails?.profilePhoto}
            userName={userDetails?.name}
            bio={userDetails?.bio}
            followers={userDetails?.follower?.length}
            following={userDetails?.following?.length}
            blog={userDetails?.blog?.length}
          />
          <YourArticle userBlogs={userDetails?.blog} />
        </div>
      </div>
    </div>
  );
};

export default profile;
