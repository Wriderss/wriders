import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { ShareIcon } from "@heroicons/react/24/solid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import Link from "next/link";
import CommentSection from "../comments/CommentSection";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { changeCommentState } from "../../slices/commentSlice";
import CommentModal from "../comments/commentModal";

const MainBlog = ({ title, body, slug, userId, blogId }: any) => {
  const [liked, setLiked] = useState<boolean>(false);
  const commentState = useAppSelector(
    (state) => state.commentState.CommentState
  );
  const mode = useAppSelector((state) => state.mode.ModeState);
  const dispatch = useAppDispatch();
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
    if (userLiked.length >= 1) {
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
      {commentState && <CommentModal userId={userId} blogId={blogId} />}
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
      <div
        className={`fixed z-50 flex space-x-1 left-[45%] bottom-10 items-center ${
          mode ? "bg-gray-800" : "bg-gray-200"
        } rounded-lg shadow-lg `}
      >
        <HandThumbUpIcon
          onClick={() => {
            if (liked) toast.success("You already liked this post.");
            else {
              handleLike();
            }
          }}
          height={37}
          width={37}
          cursor="pointer"
          className={` p-2 rounded-md ${
            liked
              ? "bg-red-500 hover:bg-red-400 text-white"
              : "bg-gray-200 hover:bg-gray-300 "
          }`}
        />
        <ChatBubbleBottomCenterIcon
          onClick={() => dispatch(changeCommentState())}
          height={37}
          width={37}
          cursor="pointer"
          className={`${
            mode ? "hover:bg-gray-700" : "bg-gray-300"
          } p-2 rounded-md `}
        />
        <Link href={`whatsapp://send?text=https://wriders.vercel.app/${slug}`}>
          <ShareIcon
            height={37}
            width={37}
            cursor="pointer"
            className={`${
              mode ? "hover:bg-gray-700" : "bg-gray-300"
            } p-2 rounded-md `}
          />
        </Link>
      </div>
    </div>
  );
};

export default MainBlog;
