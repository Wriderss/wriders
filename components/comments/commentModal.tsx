import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { auth } from "../../lib/firebase";
import Image from "next/image";
import moment from "moment";
import toast from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useAppDispatch } from "../../app/hooks";
import { changeCommentState } from "../../slices/commentSlice";

type commentType = {
  blogId: string;
  userId: string;
};

const CommentModal = ({ blogId, userId }: commentType) => {
  const commentState = useSelector(
    (state: RootState) => state.commentState.CommentState
  );
  const dispatch = useAppDispatch();
  const [commentInput, setCommentInput] = useState<string>("");
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
        authorId: userId,
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

  const getAllComments = async () => {
    if (!blogId) return;
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
    getAllComments();
  }, [blogId, commentInput]);
  return (
    <div className="fixed top-[4.4rem] right-0  flex flex-col justify-center items-center h-screen bg-gray-100  w-[35%]">
      <div className="flex justify-between mt-4 w-full px-4  items-center">
        <h1 className="text-3xl  font-semibold">Comments</h1>
        <XMarkIcon
          onClick={() => dispatch(changeCommentState())}
          height={40}
          width={40}
          className="hover:bg-gray-200 rounded-md p-2"
        />
      </div>
      <div className="w-[90%]   flex flex-col space-y-2">
        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          cols={100}
          placeholder="Write your thoughts on this blog"
          className="resize-none   bg-gray-200 outline-none my-4 rounded-md p-2 h-[100px]"
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
      <div className="overflow-y-scroll mb-[5rem] flex-1 hide-scroll">
        {comments.map((comment: any) => (
          <div
            key={comment.id}
            className="flex flex-col mx-auto mb-4 space-x-2 border-b border-gray-500 w-[80%]"
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

export default CommentModal;
