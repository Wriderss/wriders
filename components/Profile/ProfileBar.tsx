import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { followUserByUserId } from "../../hooks/user/followUser";
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
  yourProfile: boolean;
  yourId?: string;
};

const ProfileBar = ({
  userEmail,
  profilePhoto,
  userName,
  bio,
  followers,
  following,
  blog,
  yourProfile,
  yourId,
}: profileType) => {
  const dispatch = useDispatch();
  const { mutate, isLoading } = followUserByUserId();
  const mode = useAppSelector((state) => state.mode.ModeState);
  return (
    <div className="border border-gray-500 ">
      <ProfileModal email={userEmail} profilePhoto={profilePhoto} bio={bio} />
      <div className="bg-[url('/background-profile.png')] h-[250px] w-full relative bg-no-repeat bg-cover">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
      </div>
      <div
        className={`w-full bg-gray-100 flex  mx-auto space-center  ${
          mode ? "bg-gray-900 text-white " : "bg-white"
        }`}
      >
        <div
          className={`-mt-[80px]  w-[30%] border-r border-gray-500  text-center ${
            mode ? "bg-gray-900" : "bg-white"
          }`}
        >
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
            {yourProfile ? (
              <button
                onClick={() => dispatch(modalOpen())}
                className="bg-secondary-color my-2 text-white  w-max rounded-md cursor-pointer flex mx-auto p-2"
              >
                Edit Profile
              </button>
            ) : (
              // <button
              //   onClick={() =>
              //     mutate({
              //       followingId: userEmail,
              //       followerId: yourId,
              //     })
              //   }
              //   className="bg-secondary-color my-2 text-white  w-max rounded-md cursor-pointer flex mx-auto p-2"
              // >
              //   Follow
              // </button>
              <div></div>
            )}
          </div>
        </div>
        <div
          className={`flex-1 w-[70%]  px-4 items-center flex justify-around  ${
            mode ? "bg-gray-900" : "bg-white"
          }`}
        >
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
