import React from "react";
import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Blog from "./Blog";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import blog from "../../pages/[slug]";

type blog_title = {
  title: string;
  fetchDataType: string;
  userId?: string;
};

type blog_type = {
  image: string;
  id: string;
  title: string;
  numberOfLikes: number;
  slug: string;
  author: any | string[];
  likes: any | string[];
  comment: any;
  views: [];
};

const BlogSection = ({ title, fetchDataType, userId }: blog_title) => {
  const mode = useAppSelector((state) => state.mode.ModeState);
  const [user] = useAuthState(auth);
  const [blogs, setBlogs] = useState<blog_type[]>([]);
  async function getBlogs() {
    if (fetchDataType === "top") {
      const response = await fetch("/api/blog/topBlog", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setBlogs(data);
    }
    if (fetchDataType === "latest") {
      const response = await fetch("/api/blog/blogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setBlogs(data);
    }
    if (fetchDataType === "Recommended") {
      const response = await fetch("/api/blog/recommendBlogs", {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // setBlogs(data.follower);
      setBlogs(data?.following[0]?.follower.blog);
      console.log(data?.following[0]?.follower.blog);
    }
  }
  useEffect(() => {
    getBlogs();
  }, [user]);
  return (
    <div className="md:w-[90%]  w-[95%] mx-auto my-4 p-2  ">
      <h1
        className={`${
          mode ? "text-white" : "text-gray-900"
        } text-3xl font-bold `}
      >
        {title}
      </h1>
      {fetchDataType === "Recommended" ? (
        <div
          className={`flex  space-x-[2rem] overflow-x-scroll hide-scroll my-2 border border-gray-200 py-4 px-2  ${
            mode ? "bg-gray-700 border-gray-600" : "bg-gray-200"
          }`}
        >
          {blog.length === 0 ? (
            <div className=" my-4 min-h-[300px] flex justify-center items-center w-max mx-auto">
              <h1 className=" text-2xl font-semibold">
                Follow your favourite writer to make them feature here 🌟🌟
              </h1>
            </div>
          ) : (
            <>
              {blogs?.map((blog) => (
                <Blog
                  username={blog.author.name}
                  image={blog.image}
                  key={blog.id}
                  heading={blog.title}
                  avatar={
                    blog.author.profilePhoto
                      ? blog.author.profilePhoto
                      : `https://avatars.dicebear.com/api/avataaars/${user?.email}.svg`
                  }
                  like={blog.likes.length}
                  slug={blog.slug}
                  comments={blog.comment}
                  views={blog.views.length}
                />
              ))}
            </>
          )}
        </div>
      ) : (
        <div
          className={`flex space-x-[2rem] overflow-x-scroll hide-scroll my-2 border border-gray-100 py-4 px-2  ${
            mode ? "bg-gray-700 border-gray-600" : "bg-gray-200"
          }`}
        >
          {blogs.map((blog) => (
            <Blog
              username={blog.author.name}
              image={blog.image}
              key={blog.id}
              heading={blog.title}
              avatar={
                blog.author.profilePhoto
                  ? blog.author.profilePhoto
                  : `https://avatars.dicebear.com/api/avataaars/${user?.email}.svg`
              }
              like={blog.likes.length}
              slug={blog.slug}
              comments={blog.comment}
              views={blog.views.length}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogSection;
