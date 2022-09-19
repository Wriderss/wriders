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

type slug_type = {
  slug: string;
};

const blog = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState<any>([]);
  async function getDetails() {
    const response = await fetch("/api/blogDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug: slug }),
    });
    const data = await response.json();
    setBlog(data);
  }
  useEffect(() => {
    getDetails();
  }, [user, slug]);
  return (
    <div className="flex">
      <Toaster />
      <Head>
        <title>Wrider | {slug}</title>
      </Head>
      <Sidebar />
      <div className="md:ml-[50px] ml-[15vw] md:w-full  flex-1  w-[90vw]  ">
        <Header title={"Home"} />
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
              userId={blog.authorId}
              slug={slug}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default blog;
