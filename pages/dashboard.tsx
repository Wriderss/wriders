import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import BlogSection from "../components/Blog/BlogSection";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import Login from "./login";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [userDetails, setUserDetails] = useState<any>([]);

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
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    <main className="flex">
      <Head>
        <title>Wrider | Dashboard</title>
      </Head>
      {/* Sidebar */}
      <Sidebar />
      {/* Main-content */}
      <div className="flex-1 md:ml-[50px] ml-[12vw] md:w-full w-[90vw] overflow-y-hidden">
        <Header
          title="Home"
          name={userDetails?.name}
          email={userDetails?.email}
          profilePhoto={userDetails?.profilePhoto}
        />
        <BlogSection title={"Latest Article"} />
      </div>
    </main>
  );
};

export default Dashboard;
