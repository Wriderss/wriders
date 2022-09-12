import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import React from "react";

const CommentInput = () => {
  return (
    <form className="fixed  flex  bottom-3 w-[25%] ml-2 items-center  bg-white z-[999]">
      <input
        type="text"
        placeholder="Your Reply."
        className="p-1 px-2 text-[14px] bg-gray-200 w-full outline-none"
      />
      <PaperAirplaneIcon
        height={30}
        width={30}
        className="bg-secondary-color text-white p-2"
      />
    </form>
  );
};

export default CommentInput;
