import Image from "next/image";
import React from "react";

const ProfileBar = () => {
  return (
    <div>
      <div className="bg-[url('/background-profile.png')] h-[250px] w-full relative bg-no-repeat bg-cover">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
      </div>
      <div className="w-full bg-gray-100 flex space-x-[4rem] mx-auto space-center ">
        <div className="-mt-[80px]  w-[30%] border-r border-black  text-center">
          <Image
            src="/user.jpg"
            height={160}
            width={160}
            className="object-contain rounded-full"
          />
          <div className="flex p-2 px-4 flex-col space-y-2 text-center">
            <h1 className="font-bold text-xl">John Doe</h1>
            <p className="text-[15px]  text-center">
              Working on tech, love reading,learning . love to blog and explore
              all stuff
            </p>
            <button className="bg-secondary-color my-2 text-white  w-max rounded-md cursor-pointer flex mx-auto p-2">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="flex-1 w-[70%]  px-4 items-center flex justify-around ">
          <div className="flex flex-col  items-center space-y-2">
            <h1 className="text-3xl font-bold ">689</h1>
            <span>Followers</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-3xl font-bold">200</h1>
            <span>Following</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-3xl font-bold">18</h1>
            <span>Uploaded Articles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
