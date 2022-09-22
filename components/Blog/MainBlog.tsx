import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { ShareIcon } from "@heroicons/react/24/solid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import Link from "next/link";
import CommentSection from "../comments/CommentSection";
import toast from "react-hot-toast";
import { useAppSelector } from "../../app/hooks";

const MainBlog = ({ title, body, slug, userId, blogId }: any) => {
  const [liked, setLiked] = useState<boolean>(false);
  const mode = useAppSelector((state) => state.mode.ModeState);
  const [newLiked, setNewLiked] = useState([]);
  const checkingLike = async () => {
    const checkLike = await fetch("/api/checkLike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId, blogId }),
    });
    const { data } = await checkLike.json();
    const userLiked = data.filter((like: any) => like.userId === userId);
    if (userLiked.length === 1) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };
  useEffect(() => {
    checkingLike();
  }, [blogId, userId, newLiked]);
  const handleLike = async () => {
    const response = await fetch("/api/hitLike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId, blogId }),
    });
    const data = await response.json();
    setNewLiked(data);
  };
  return (
    <div
      className={`w-full mb-[2rem] ${mode ? "text-white" : "text-gray-900"}`}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <svg
            width="70"
            height="24"
            viewBox="0 0 70 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.339746 12L9 20.6603L17.6603 12L9 3.33975L0.339746 12ZM69.0607 13.0607C69.6464 12.4749 69.6464 11.5251 69.0607 10.9393L59.5147 1.3934C58.9289 0.807611 57.9792 0.807611 57.3934 1.3934C56.8076 1.97919 56.8076 2.92893 57.3934 3.51472L65.8787 12L57.3934 20.4853C56.8076 21.0711 56.8076 22.0208 57.3934 22.6066C57.9792 23.1924 58.9289 23.1924 59.5147 22.6066L69.0607 13.0607ZM9 13.5H68V10.5H9V13.5Z"
              fill={mode ? "white" : "black"}
            />
          </svg>
        </div>
        <h1 className="font-bold capitalize text-3xl">{title}</h1>
      </div>
      <div className="mt-4 w-[97%] mx-auto whitespace-pre-line">{body}</div>
      <div className="flex  my-[2rem] space-x-4 justify-center">
        <div
          onClick={() => {
            if (liked) toast.success("You already liked this post.");
            else {
              handleLike();
            }
          }}
          className={`flex space-x-4 p-2 cursor-pointer  bg-gray-200 rounded-md items-center ${
            liked
              ? "bg-red-500 hover:bg-red-400 text-white"
              : "bg-gray-200 hover:bg-gray-300 "
          }`}
        >
          <HandThumbUpIcon height={30} width={30} />
          <span className="font-semibold">{liked ? "Liked" : "Like"} </span>
        </div>
        <Link href={`whatsapp://send?text=https://wriders.vercel.app/${slug}`}>
          <div className="flex space-x-4 p-2 cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-md items-center">
            <ShareIcon height={30} width={30} color="black" />
            <span className={`font-semibold text-gray-900`}>Share</span>
          </div>
        </Link>
      </div>
      <CommentSection blogId={blogId} userId={userId} />
    </div>
  );
};

export default MainBlog;
