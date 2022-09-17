import React from "react";
import {
  BookmarkIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";

type blog_type = {
  username: string;
  avatar: string;
  heading: string;
  image: string;
  like: number;
};

const Blog = ({ username, avatar, heading, image, like }: blog_type) => {
  return (
    <div className="flex flex-col min-h-[300px] cursor-pointer hover:bg-gray-100  bg-white py-2 shadow-lg rounded-md">
      <div className="px-2">
        <h1 className="capitalize font-semibold text-lg">{heading}</h1>
      </div>
      <div className="flex-1 flex   justify-center">
        <img src={image} alt={heading} />
      </div>
      <div className="flex justify-between items-center p-1">
        <div className="flex items-center space-x-2">
          <img src={avatar} alt={username} className="h-8 w-8  rounded-full" />
          <p className="text-[13px] font-semibold">{username}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{like}</span>
          <HeartIcon height={20} width={20} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
