import Image from "next/image";
import React from "react";
import {
  PencilSquareIcon,
  EyeIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const YourBlog = ({ heading, image, likes, slug }: any) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/${slug}`)}
      className="cursor-pointer hover:bg-gray-200 w-[350px] flex flex-col  min-h-[300px] rounded-md border "
    >
      <h1 className="p-2 font-semibold text-lg ">{heading}</h1>
      <div className="flex flex-1 justify-center ">
        <img src={image} alt={heading} className="object-contain w-full" />
      </div>
      {/* <div className="flex justify-end p-2 items-center space-x-2">
        <HeartIcon height={20} width={20} />
        <p className="font-semibold">{likes}</p>
      </div> */}
    </div>
  );
};

export default YourBlog;
