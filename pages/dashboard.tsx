import React from "react";
import Header from "../components/Header";
import Authors from "../components/Author/Authors";
import OtherBlog from "../components/Blog/OtherBlog";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import BlogSection from "../components/Blog/BlogSection";

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
        <Header title="Home" />
        <Authors />
        <BlogSection title={"Top 10 Articles"} />
        <BlogSection title={"Recommended for you"} />
        <BlogSection title={"Latest Article"} />
        <OtherBlog />
      </div>
    </main>
  );
};

export default Dashboard;
