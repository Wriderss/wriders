import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import Image from "next/image";
import moment from "moment";
import toast from "react-hot-toast";

type commentType = {
  blogId: string;
};

const CommentSection = ({ blogId }: commentType) => {
  const [commentInput, setCommentInput] = useState<string>("");
  const [userDetails, setUserDetails] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const [user] = useAuthState(auth);
  const email = user?.email;
  const handleComment = async () => {
    const response = await fetch("/api/submitComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorId: userDetails.id,
        blogId,
        body: commentInput,
      }),
    })
      .then(() => {
        setCommentInput("");
        toast.success("Comment Added Successfully.");
      })
      .catch((e) => {
        setCommentInput("");
        toast.error("Something went wrong");
        console.log(e.message);
      });
  };
  const getUserDetails = async () => {
    const resp = await fetch("/api/userDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    const userDetails = await resp.json();
    setUserDetails(userDetails);
  };
  const getAllComments = async () => {
    const response = await fetch("/api/blogComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blogId }),
    });
    const Allcomments = await response.json();
    setComments(Allcomments);
  };
  useEffect(() => {
    getUserDetails();
  }, [user]);
  useEffect(() => {
    if (!blogId) return;
    else {
      getAllComments();
    }
  }, [user, blogId, commentInput]);
  return (
    <div className="my-4">
      <h1 className="text-2xl font-semibold">Comments</h1>
      <div className="w-4/5  flex flex-col space-y-2">
        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          cols={100}
          placeholder="Write your thoughts on this blog"
          className="resize-none  border border-gray-500 outline-none my-4 rounded-md p-2 h-[100px]"
        />
        <button
          onClick={() => {
            if (commentInput === "") return;
            handleComment();
          }}
          className="bg-secondary-color w-max ml-auto text-white px-4 py-2 rounded-md "
        >
          Submit Comment
        </button>
      </div>
      <div>
        {comments.map((comment: any) => (
          <div
            key={comment.id}
            className="flex flex-col mb-4 space-x-2 border-b border-gray-500 w-[80%]"
          >
            <div className="flex space-x-2 items-center">
              <Image
                src={
                  comment.author?.profilePhoto
                    ? comment.author?.profilePhoto
                    : `https://avatars.dicebear.com/api/avataaars/${comment.author?.email}.svg`
                }
                alt={comment.author.name}
                height={40}
                width={40}
                className="rounded-full border border-gray-500"
              />
              <div className="cursor-pointer">
                <p className="text-sm font-semibold">{comment.author.name}</p>
                <span className="text-[12px]">
                  {moment(comment.created_at).fromNow()}
                </span>
              </div>
            </div>
            <div className="w-[80%]  pl-10">
              <p className="pb-2">{comment.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
