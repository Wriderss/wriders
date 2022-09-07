import React from "react";
import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Blog from "./Blog";

const BlogSection = ({ title }) => {
  const dispatch = useAppDispatch();
  const tabState = useAppSelector((state) => state.tab.tabName);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const blogs = [...Array(4)].map((_, i) => ({
      userName: faker.internet.userName(),
      avatar: faker.internet.avatar(),
      heading: faker.random.word(),
      image: faker.image.image(),
      id: i,
    }));

    setBlogs(blogs);
  }, []);
  return (
    <div className="w-[90%]  mx-auto my-4 p-2  bg-gray-100">
      <h1 className="text-2xl py-2">{title}</h1>
      <div className="grid border border-gray-500 p-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1  h-max gap-4">
        {blogs.map((blog) => (
          <Blog
            username={blog.userName}
            image={blog.image}
            key={blog.id}
            heading={blog.heading}
            avatar={blog.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
