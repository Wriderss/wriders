import React from "react";
import Header from "../components/Header";
import Authors from "../components/Authors";
import PersonalisedBlog from "../components/PersonalisedBlog";
import OtherBlog from "../components/OtherBlog";
import Head from "next/head";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <main className="flex">
      <Head>
        <title>Wrider | Dashboard</title>
      </Head>
      {/* Sidebar */}
      <Sidebar />
      {/* Main-content */}
      <div className="flex-1 md:ml-[50px] ml-[12vw] md:w-full w-[90vw] overflow-y-hidden">
        <Header />
        <Authors />
        <PersonalisedBlog />
        <OtherBlog />
      </div>
    </main>
  );
};

export default Dashboard;
