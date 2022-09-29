import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import moment from "moment";

const BlogHeader = ({ author, title, coverImage, created_at, body }: any) => {
  const [user] = useAuthState(auth);
  const readingTime = () => {
    const wpm = 225;
    const words = body?.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time;
  };
  console.log(coverImage);
  return (
    <div
      className={` flex items-center  h-max min-h-[400px] bg-gray-500 bg-fixed w-full  relative bg-no-repeat bg-cover`}
    >
      <Image src={coverImage} layout="fill" />

      <div className=" justify-center min-w-[400px] max-w-[400px] my-[3rem]  ml-4 flex flex-col ">
        <div className=" mx-auto z-[999]">
          <Image
            priority
            src={
              author?.profilePhoto
                ? author?.profilePhoto
                : `https://avatars.dicebear.com/api/avataaars/${user?.email}.svg`
            }
            height={100}
            width={100}
            alt="user-img"
            className="rounded-full object-contain "
          />
        </div>
        <div className="relative bg-secondary-color  p-4 rounded-md shadow-md text-center -mt-[4rem] pt-[4rem]">
          <h1 className="text-white font-semibold uppercase  text-xl">
            {title}
          </h1>
          <div className="flex justify-around capitalize  items-center w-[70%] mx-auto pt-2 text-white">
            {created_at && <span>{moment(created_at).fromNow()}</span>}
            <span className="bg-white h-[20px] w-[1px] " />{" "}
            {readingTime() && <span>{readingTime()} min read</span>}
          </div>
          <p className="font-semibold text-white pt-2">- By {author?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
