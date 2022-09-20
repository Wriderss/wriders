import React from "react";
import {
  HomeIcon,
  BellIcon,
  HashtagIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  BookmarkIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import toast from "react-hot-toast";

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="flex fixed top-0 left-0  flex-col justify-between p-4 h-screen md:w-max :w-[10vw] bg-secondary-color">
      <div className="flex-1 flex flex-col items-center space-y-[1rem] mt-4">
        <HomeIcon
          onClick={() => router.push("/")}
          height={40}
          width={40}
          color={"white"}
          className="menu-item"
        />
        <BellIcon
          onClick={() => toast.success("Coming Soon too..", { icon: "🔜" })}
          height={40}
          width={40}
          color={"white"}
          className="menu-item"
        />
        <HashtagIcon
          onClick={() => toast.success("Coming Soon too..", { icon: "🔜" })}
          height={40}
          width={40}
          color={"white"}
          className="menu-item"
        />
        <UserIcon
          onClick={() => router.push("/profile")}
          height={40}
          width={40}
          color={"white"}
          className="menu-item"
        />
        <BookmarkIcon
          onClick={() => toast.success("Coming Soon too..", { icon: "🔜" })}
          className="menu-item md:hidden"
          color={"white"}
          height={40}
          width={40}
        />
        <MoonIcon
          onClick={() => toast.success("Coming Soon too..", { icon: "🔜" })}
          className="menu-item md:hidden"
          color={"white"}
          height={40}
          width={40}
        />
      </div>
      <div className="flex flex-col items-center">
        <ArrowRightOnRectangleIcon
          onClick={() => {
            signOut(auth);
          }}
          height={40}
          width={40}
          color={"white"}
          className="menu-item"
        />
      </div>
    </div>
  );
};

export default Sidebar;
