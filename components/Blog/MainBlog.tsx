import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { ShareIcon } from "@heroicons/react/24/solid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import Link from "next/link";
import CommentSection from "../comments/CommentSection";
import toast from "react-hot-toast";

const MainBlog = ({ title, body, slug, userId, blogId }: any) => {
  const [liked, setLiked] = useState<boolean>(false);
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
    <div className="w-full mb-[2rem]">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Image src="/arrow.svg" alt="arrow" height={30} width={60} />
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
            <ShareIcon height={30} width={30} />
            <span className="font-semibold">Share</span>
          </div>
        </Link>
      </div>
      <CommentSection blogId={blogId} userId={userId} />
    </div>
  );
};

export default MainBlog;
