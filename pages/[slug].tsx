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
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/loading/Loading";
import Login from "./login";

type slug_type = {
  slug: string;
};

const blog = () => {
  const mode = useAppSelector((state) => state.mode.ModeState);
  const [user] = useAuthState(auth);
  const email = user?.email;
  const router = useRouter();
  const { slug } = router.query;
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
  };

  useEffect(() => {
    getUserDetails();
  }, [user]);

  const fetchBlog = async () => {
    const response = await fetch("/api/blogDetails", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ slug: slug }),
    });
    return response.json();
  };
  const { data: blog, isLoading } = useQuery(["BlogData"], fetchBlog, {
    enabled: router.isReady,
  });
  console.log(blog);

  useEffect(() => {
    if (blog?.id && email) {
      IncrementViews();
    } else {
      return;
    }
  }, [blog]);
  if (!user) return <Loading />;
  if (isLoading) return <Loading />;
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
            author={blog?.author}
            title={blog?.title}
            coverImage={blog?.image}
            created_at={blog?.created_at}
            body={blog?.body}
          />
          <div className="flex justify-between mt-4">
            <MainBlog
              title={blog?.title}
              body={blog?.body}
              blogId={blog?.id}
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
