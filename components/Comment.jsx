import React from "react";
import Image from "next/image";

const Comment = () => {
  return (
    <div className="px-2  ">
      <div className="flex items-center space-x-2">
        <Image
          src="/user-2.jpg"
          alt="user"
          height={30}
          width={30}
          className="rounded-full"
        />
        <div className="flex flex-col flex-1">
          <p className="text-[14px]">Skylar Johnson</p>
          <span className="text-[12px] text-gray-700">July 23,2022</span>
        </div>
        <span className="text-[12px]">2:30 p.m.</span>
      </div>
      <p className="text-[15px] mt-[5px] w-[95%] mx-auto">
        Nicely written...! I recently did some research on the same topic, check
        out my article
      </p>
      <div className="w-[95%] pb-4 border-b border-gray-800 mt-[2px] flex justify-between items-center mx-auto">
        <span className="text-[13px] text-gray-500 cursor-pointer hover:underline">
          Reply
        </span>
      </div>
    </div>
  );
};

export default Comment;
