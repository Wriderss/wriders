import Head from "next/head";
import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProfileBar from "../components/Profile/ProfileBar";
import YourArticle from "../components/Blog/YourArticle";
import SavedArticle from "../components/Blog/SavedArticle";

const profile = () => {
  return (
    <div className="flex ">
      <Head>
        <title>Wrider | John Doe</title>
      </Head>

      <Sidebar />
      <div className="md:ml-[50px] ml-[15vw] md:w-full  flex-1  w-[90vw]  ">
        <Header title={"Profile"} />
        <div className="ml-[4rem] w-[90%] mx-auto">
          <ProfileBar />
          <YourArticle />
        </div>
      </div>
    </div>
  );
};

export default profile;
