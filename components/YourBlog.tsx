import Image from "next/image";
import React from "react";
import { PencilSquareIcon, EyeIcon } from "@heroicons/react/24/solid";

const YourBlog = ({ heading, image, views }: any) => {
  return (
    <div className="w-[350px] border border-gray-300 rounded-md shadow-md py-2">
      <h1 className="font-semibold text-xl uppercase px-2">{heading}</h1>
      <img src={image} alt={heading} height={"300px"} width={"400px"} />
      <div className="flex mt-2 px-2 space-y-2 justify-between">
        <div className="flex items-center space-x-2 ">
          <PencilSquareIcon height={20} width={20} />
          <span>Edit Article</span>
        </div>
        <div className="flex items-center space-x-2">
          <EyeIcon height={20} width={20} />
          <span>{views}</span>
        </div>
      </div>
    </div>
  );
};

export default YourBlog;
