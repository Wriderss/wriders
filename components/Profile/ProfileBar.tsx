import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../lib/firebase";
import { modalOpen } from "../../slices/modalSlice";
import ProfileModal from "./updateProfileModal";

type profileType = {
  userEmail: string;
  profilePhoto: string;
  userName: string;
  bio: string;
  followers: number;
  following: number;
  blog: number;
};

const ProfileBar = ({
  userEmail,
  profilePhoto,
  userName,
  bio,
  followers,
  following,
  blog,
}: profileType) => {
  const dispatch = useDispatch();
  return (
    <div>
      <ProfileModal email={userEmail} profilePhoto={profilePhoto} bio={bio} />
      <div className="bg-[url('/background-profile.png')] h-[250px] w-full relative bg-no-repeat bg-cover">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
      </div>
      <div className="w-full bg-gray-100 flex space-x-[4rem] mx-auto space-center ">
        <div className="-mt-[80px]  w-[30%] border-r border-black  text-center">
          <Image
            priority
            src={
              profilePhoto
                ? profilePhoto
                : `https://avatars.dicebear.com/api/avataaars/${userEmail}.svg`
            }
            height={160}
            width={160}
            className="object-contain rounded-full"
          />
          <div className="flex p-2 px-4 flex-col space-y-2 text-center">
            <h1 className="font-bold text-xl">{userName}</h1>
            <p className="text-[15px]  text-center">{bio}</p>
            <button
              onClick={() => dispatch(modalOpen())}
              className="bg-secondary-color my-2 text-white  w-max rounded-md cursor-pointer flex mx-auto p-2"
            >
              Edit Profile
            </button>
          </div>
        </div>
        <div className="flex-1 w-[70%]  px-4 items-center flex justify-around ">
          <div className="flex flex-col  items-center space-y-2">
            <h1 className="text-3xl font-bold ">{followers}</h1>
            <span>Followers</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-3xl font-bold">{following}</h1>
            <span>Following</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-3xl font-bold">{blog}</h1>
            <span>Uploaded Articles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
