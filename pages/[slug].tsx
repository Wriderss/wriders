import React, { useEffect, useState } from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import BlogHeader from "../components/Blog/BlogHeader";
import Header from "../components/Header";
import MainBlog from "../components/Blog/MainBlog";
import CommentSection from "../components/comments/CommentSection";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "../app/hooks";

type slug_type = {
  slug: string;
};

const blog = () => {
  const mode = useAppSelector((state) => state.mode.ModeState);
  const [user] = useAuthState(auth);
  const email = user?.email;
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState<any>([]);
  const [userDetails, setUserDetails] = useState<any>([]);
  async function getDetails() {
    if (!slug) return;
    const response = await fetch("/api/blogDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug: slug }),
    });
    const data = await response.json();
    console.log(data);
    setBlog(data);
  }
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

  const IncrementViews = async () => {
    const blogId = blog.id;
    if (!blogId) return;
    const response = await fetch("/api/IncrementViews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, blogId }),
    });
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    getDetails();
  }, [slug]);
  useEffect(() => {
    getUserDetails();
  }, [user]);
  useEffect(() => {
    if (blog.id && email) {
      IncrementViews();
    } else {
      return;
    }
  }, [blog]);
  if (!user) return <div>Loading...</div>;
  return (
    <div className="flex">
      <Toaster />
      <Head>
        <title>Wrider | {slug}</title>
      </Head>
      <Sidebar />
      <div
        className={`md:ml-[50px] ml-[15vw] md:w-full  flex-1  w-[90vw]  ${
          mode ? "bg-gray-900" : "bg-white"
        } `}
      >
        <Header
          title={"Home"}
          name={userDetails?.name}
          email={userDetails?.email}
          profilePhoto={userDetails?.profilePhoto}
        />
        <div className="ml-[4rem] w-[90%] mx-auto">
          <BlogHeader
            author={blog.author}
            title={blog.title}
            coverImage={blog.image}
            created_at={blog.created_at}
            body={blog.body}
          />
          <div className="flex justify-between mt-4">
            <MainBlog
              title={blog.title}
              body={blog.body}
              blogId={blog.id}
              userId={userDetails?.id}
              slug={slug}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default blog;
