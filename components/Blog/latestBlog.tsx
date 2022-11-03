import React from "react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Blog from "./Blog";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";

type blogSection_type = {
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

const LatestBlogSection = ({ title, fetchDataType }: blogSection_type) => {
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
  }
  useEffect(() => {
    getBlogs();
  }, [user]);
  return (
    <div className="md:w-[90%]  w-[95%] mx-auto my-4  ">
      <h1
        className={`${
          mode ? "text-white" : "text-gray-900"
        } text-3xl font-bold `}
      >
        {title}
      </h1>
      <div className="grid  py-4  xl:grid-cols-3 md:grid-cols-2 grid-cols-1  h-max xl:gap-4 gap-2">
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
    </div>
  );
};

export default LatestBlogSection;
