import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../lib/firebase";
import { modalOpen } from "../../slices/modalSlice";
import ProfileModal from "./updateProfileModal";

const ProfileBar = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [userDetails, setUserDetails] = useState<any>([]);
  const getUserDetails = async () => {
    const resp = await fetch("/api/userDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    const userDetails = await resp.json();
    setUserDetails(userDetails);
  };

  useEffect(() => {
    getUserDetails();
  }, [user]);
  return (
    <div>
      <ProfileModal email={email} />
      <div className="bg-[url('/background-profile.png')] h-[250px] w-full relative bg-no-repeat bg-cover">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
      </div>
      <div className="w-full bg-gray-100 flex space-x-[4rem] mx-auto space-center ">
        <div className="-mt-[80px]  w-[30%] border-r border-black  text-center">
          <Image
            src={
              userDetails?.profilePhoto
                ? userDetails?.profilePhoto
                : `https://avatars.dicebear.com/api/avataaars/${user?.email}.svg`
            }
            height={160}
            width={160}
            className="object-contain rounded-full"
          />
          <div className="flex p-2 px-4 flex-col space-y-2 text-center">
            <h1 className="font-bold text-xl">{userDetails?.name}</h1>
            <p className="text-[15px]  text-center">{userDetails?.bio}</p>
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
            <h1 className="text-3xl font-bold ">
              {userDetails?.follower?.length}
            </h1>
            <span>Followers</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-3xl font-bold">
              {userDetails?.following?.length}
            </h1>
            <span>Following</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-3xl font-bold">{userDetails?.blog?.length}</h1>
            <span>Uploaded Articles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
