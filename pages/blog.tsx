import React from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import BlogHeader from "../components/BlogHeader";
import Header from "../components/Header";
import MainBlog from "../components/MainBlog";
import CommentSection from "../components/CommentSection";

const blog = () => {
  return (
    <div className="flex">
      <Head>
        <title>Wrider | Nature Valley</title>
      </Head>
      <Sidebar />
      <div className="md:ml-[50px] ml-[15vw] md:w-full  flex-1  w-[90vw]  ">
        <Header title={"Home"} />
        <div className="ml-[4rem] w-[90%] mx-auto">
          <BlogHeader />
          <div className="flex justify-between mt-4">
            <MainBlog />
            <div className="w-[40%]">
              <CommentSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default blog;
