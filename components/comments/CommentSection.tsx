import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
const CommentSection = () => {
  return (
    <div className="fixed top-[10rem] p-2 w-[30%] h-[625px] rounded-md shadow-md right-[4rem] z-[999] bg-gray-100 ">
      <div className="flex w-[90%] items-center mx-auto justify-between">
        <h1 className="text-lg  ">Comments</h1>
        <div className="flex items-center space-x-1 ">
          <span className="text-[17px]">All</span>
          <ChevronDownIcon height={20} width={20} />
        </div>
      </div>
      <div className="w-[90%] hide-scroll overflow-y-scroll pt-4 mx-auto mt-2 bg-white rounded-md shadow-lg h-[94%]">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <div className="w-full">
          <CommentInput />
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
