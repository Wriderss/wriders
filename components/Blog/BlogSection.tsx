import React from "react";
import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Blog from "./Blog";

type blog_title = {
  title: string;
};

type blog_type = {
  image: string;
  id: string;
  title: string;
  numberOfLikes: number;
  author: any | string[];
};

const BlogSection = ({ title }: blog_title) => {
  const [blogs, setBlogs] = useState<blog_type[]>([]);
  async function getBlogs() {
    const response = await fetch("/api/blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setBlogs(data);
    console.log(data);
  }
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <div className="w-[90%]  mx-auto my-4 p-2  ">
      <h1 className="text-3xl font-bold py-2">{title}</h1>
      <div className="grid  p-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1  h-max gap-4">
        {blogs.map((blog) => (
          <Blog
            username={blog.author.name}
            image={blog.image}
            key={blog.id}
            heading={blog.title}
            avatar={blog.author.profilePhoto}
            like={blog.numberOfLikes}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
