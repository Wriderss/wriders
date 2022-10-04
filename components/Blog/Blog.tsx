import React from "react";
import {
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
  EllipsisHorizontalCircleIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import {
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useAppSelector } from "../../app/hooks";

type blog_type = {
  username: string;
  avatar: string;
  heading: string;
  image: string;
  slug: string;
  like: number;
  comments: any;
  views: number;
};

const Blog = ({
  username,
  avatar,
  heading,
  image,
  like,
  slug,
  comments,
  views,
}: blog_type) => {
  const router = useRouter();
  const mode = useAppSelector((state) => state.mode.ModeState);
  return (
    <div
      onClick={() => router.push(`/${slug}`)}
      className={`flex flex-col min-h-[300px]  cursor-pointer   p-2 shadow-lg rounded-md ${
        mode
          ? "bg-gray-800 hover:bg-gray-700 text-white"
          : "bg-white hover:bg-gray-100 text-gray-900"
      } `}
    >
      <div className="px-2">
        <h1 className="capitalize font-semibold text-lg">{heading}</h1>
      </div>
      <div
        className={`flex-1 flex relative h-[300px] lg:w-[350px] w-full bg-gray-500 items-center mx-auto justify-center`}
      >
        <Image priority src={image} alt={heading} layout="fill" />
      </div>
      <div className="flex justify-between items-center p-1">
        <div className="flex items-center space-x-2">
          <img src={avatar} alt={username} className="h-8 w-8  rounded-full" />
          <p className="text-[13px] font-semibold">{username}</p>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{like}</span>
            <HeartIcon height={20} width={20} />
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{comments.length}</span>
            <ChatBubbleBottomCenterTextIcon height={20} width={20} />
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{views}</span>
            <EyeIcon height={20} width={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
