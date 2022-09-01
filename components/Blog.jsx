import React from "react";
import {
  BookmarkIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/solid";
const Blog = ({ username, avatar, body, heading, tag, image }) => {
  return (
    <div className="flex cursor-default flex-col items-center  h-max  justify-center ">
      <img src={image} alt={heading} className="rounded-md object-contain" />
      <div className="flex flex-col space-y-4">
        <span className="bg-gray-300 cursor-pointer w-max rounded-md p-2 text-[12px] mt-2 ">
          {tag}
        </span>
        <div>
          <h4 className="font-semibold text-xl uppercase">{heading}</h4>
          <p className="text-[12px]">{body}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <img src={avatar} alt={username} className="h-7 w-7 rounded-full" />
            <p>{username}</p>
          </div>
          <div className="flex space-x-2">
            <BookmarkIcon className="h-[40px] cursor-pointer w-[40px] hover:bg-secondary-color hover:text-white p-2 rounded-full" />
            <EllipsisHorizontalCircleIcon className="h-[40px] cursor-pointer w-[40px] hover:bg-secondary-color hover:text-white p-2 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
