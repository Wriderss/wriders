import React from "react";
import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Blog from "./Blog";
import {
  changeTabToFollowing,
  changeTabToRecommended,
} from "../slices/tabSlice";

const PersonalisedBlog = () => {
  const dispatch = useAppDispatch();
  const tabState = useAppSelector((state) => state.tab.tabName);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const blogs = [...Array(6)].map((_, i) => ({
      userName: faker.internet.userName(),
      avatar: faker.internet.avatar(),
      body: faker.lorem.lines(2),
      heading: faker.random.word(),
      tag: "Nature",
      image: faker.image.image(),
      id: i,
    }));

    setBlogs(blogs);
  }, []);
  return (
    <div className="w-[90%] mx-auto my-4">
      <div className="flex w-max space-x-3  items-center mb-4 p-1 rounded-md bg-gray-300 ">
        <div
          onClick={() => dispatch(changeTabToFollowing())}
          className={`${
            tabState === "following" && "active-tab"
          } cursor-pointer `}
        >
          <h4 className="p-2 font-semibold">Following</h4>
        </div>
        <div
          onClick={() => dispatch(changeTabToRecommended())}
          className={`${
            tabState === "recommended" && "active-tab"
          } cursor-pointer `}
        >
          <h4 className="p-2 font-semibold">Recommended</h4>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  h-max gap-4">
        {blogs.map((blog) => (
          <Blog
            username={blog.userName}
            image={blog.image}
            key={blog.id}
            heading={blog.heading}
            tag={blog.tag}
            avatar={blog.avatar}
            body={blog.body}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonalisedBlog;
