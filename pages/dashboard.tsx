import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import BlogSection from "../components/Blog/BlogSection";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import Login from "./login";
import { Toaster } from "react-hot-toast";
import Loading from "../components/loading/Loading";
import { useAppSelector } from "../app/hooks";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const mode = useAppSelector((state) => state.mode.ModeState);
  const fetchUserData = async () => {
    const resposne = await fetch("/api/userDetails", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email: user?.email }),
    });
    return resposne.json();
  };
  const {
    data: userDetails,
    status,
    isLoading,
  } = useQuery(["userData"], fetchUserData);

  if (isLoading) return <Loading />;

  if (!user) {
    return <Login />;
  }

  return (
    <main className="flex">
      <Head>
        <title>Wride | Dashboard</title>
      </Head>
      {/* Sidebar */}
      <Sidebar />
      <Toaster />
      {/* Main-content */}
      <div
        className={`flex-1 md:ml-[50px] ml-[12vw] min-h-screen md:w-full w-[90vw] overflow-y-hidden ${
          mode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <Header
          title="Home"
          name={userDetails?.name}
          email={userDetails?.email}
          profilePhoto={userDetails?.profilePhoto}
        />
        <BlogSection title={"Top  Articles"} fetchDataType={"top"} />
        <BlogSection title={"Latest Article"} fetchDataType={"latest"} />
      </div>
    </main>
  );
};

export default Dashboard;
