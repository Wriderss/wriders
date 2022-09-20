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
  return (
    <div
      style={{ backgroundImage: `url(${coverImage})` }}
      className={` flex items-center  h-[400px] bg-fixed w-full relative bg-no-repeat bg-cover`}
    >
      <div className=" justify-center min-w-[400px]  ml-4 flex flex-col ">
        <div className="-mt-[5rem] mx-auto z-[999]">
          <Image
            src={
              author?.profilePhoto
                ? author?.profilePhoto
                : `https://avatars.dicebear.com/api/avataaars/${user?.email}.svg`
            }
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
