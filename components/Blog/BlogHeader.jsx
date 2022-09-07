import React from "react";
import Image from "next/image";

const BlogHeader = () => {
  return (
    <div className="bg-[url('/background-profile.png')] flex items-center  h-[400px] w-full relative bg-no-repeat bg-cover">
      <div className=" justify-center  ml-4 flex flex-col ">
        <div className="-mt-[5rem] mx-auto z-[999]">
          <Image
            src="/user.jpg"
            height={150}
            width={150}
            alt="user-img"
            className="rounded-full object-contain "
          />
        </div>
        <div className="relative bg-secondary-color p-4 rounded-md shadow-md text-center -mt-[4rem] pt-[4rem]">
          <h1 className="text-white font-semibold  text-xl">
            Nature's Valley and it's preservance
          </h1>
          <div className="flex justify-around items-center w-[70%] mx-auto pt-2 text-white">
            <span>29 march 2022 </span>{" "}
            <span className="bg-white h-[20px] w-[1px] " />{" "}
            <span> 3 min read</span>
          </div>
          <p className="font-semibold text-white pt-2">- By John Doe</p>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
