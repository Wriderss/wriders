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
      <div className="flex flex-1 justify-center h-[300px] w-[350px] bg-gray-200 relative">
        <Image
          src={image}
          alt={heading}
          className="object-contain "
          layout="fill"
        />
      </div>
    </div>
  );
};

export default YourBlog;
