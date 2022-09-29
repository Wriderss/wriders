import React, { useEffect, useState } from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import BlogHeader from "../components/Blog/BlogHeader";
import Header from "../components/Header";
import MainBlog from "../components/Blog/MainBlog";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "../app/hooks";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/loading/Loading";
import { PencilIcon } from "@heroicons/react/24/solid";

const blog = () => {
  const mode = useAppSelector((state) => state.mode.ModeState);
  const [user] = useAuthState(auth);
  const email = user?.email;
  const router = useRouter();
  const { slug } = router.query;
  const [isAuthor, setIsAuthor] = useState<boolean>(false);

  const [userDetails, setUserDetails] = useState<any>([]);

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
    enabled: !!slug,
  });
  const fetchUserDataByEmail = async () => {
    const response = await fetch("/api/userDetails", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    return response.json();
  };
  const { data: userDetails, isLoading: userLoading } = useQuery(
    ["userData", email],
    fetchUserDataByEmail,
    { enabled: !!email }
  );

  const IncrementViews = async () => {
    const blogId = blog?.id;
    const response = await fetch("/api/IncrementViews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, blogId }),
    });
    return response.json();
  };

  const { data: blog, isLoading } = useQuery(["BlogData"], fetchBlog, {
    enabled: !!slug,
  });
  console.log(blog);


  const { data: IncrementedViews } = useQuery(
    ["increment-views", email, blog],
    IncrementViews,
    { enabled: !!blog }
  );
  useEffect(() => {
    checkingAuthor();
  }, [blog, userDetails]);

  // Checking for user's is the author or not
  function checkingAuthor() {
    if (blog?.author.id == userDetails?.id) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }
  }
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
        {isAuthor && (
          <div
            onClick={() =>
              router.push({ pathname: "/editblog", query: { slug } })
            }
            className="fixed right-20 bottom-10 z-50 cursor-pointer w-max h-max rounded-full bg-secondary-color p-2"
          >
            <PencilIcon height={20} width={20} color="white" />
          </div>
        )}
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
          <div className="flex relative justify-between mt-4">
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
