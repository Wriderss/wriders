import React from "react";
import Image from "next/image";

const BlogHeader = ({ author, title, coverImage }: any) => {
  return (
    <div
      style={{ backgroundImage: `url(${coverImage})` }}
      className={` flex items-center  h-[400px] bg-fixed w-full relative bg-no-repeat bg-cover`}
    >
      <div className=" justify-center min-w-[400px]  ml-4 flex flex-col ">
        <div className="-mt-[5rem] mx-auto z-[999]">
          <Image
            src={author?.profilePhoto}
            height={150}
            width={150}
            alt="user-img"
            className="rounded-full object-contain "
          />
        </div>
        <div className="relative bg-secondary-color  p-4 rounded-md shadow-md text-center -mt-[4rem] pt-[4rem]">
          <h1 className="text-white font-semibold uppercase  text-2xl">
            {title}
          </h1>
          <div className="flex justify-around  items-center w-[70%] mx-auto pt-2 text-white">
            <span>29 march 2022 </span>{" "}
            <span className="bg-white h-[20px] w-[1px] " />{" "}
            <span> 3 min read</span>
          </div>
          <p className="font-semibold text-white pt-2">- By {author?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
