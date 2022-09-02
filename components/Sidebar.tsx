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

const Sidebar = () => {
  return (
    <div className="flex fixed top-0 left-0  flex-col justify-between p-4 h-screen md:w-max :w-[10vw] bg-secondary-color">
      <div className="flex-1 flex flex-col items-center space-y-[1rem] mt-4">
        <HomeIcon
          height={40}
          width={40}
          color={"white"}
          className="menu-item"
        />
        <BellIcon
          height={40}
          width={40}
          color={"white"}
          className="menu-item"
        />
        <HashtagIcon
          height={40}
          width={40}
          color={"white"}
          className="menu-item"
        />
        <UserIcon
          height={40}
          width={40}
          color={"white"}
          className="menu-item"
        />
        <BookmarkIcon
          className="menu-item md:hidden"
          color={"white"}
          height={40}
          width={40}
        />
        <MoonIcon
          className="menu-item md:hidden"
          color={"white"}
          height={40}
          width={40}
        />
      </div>
      <div className="flex flex-col items-center">
        <ArrowRightOnRectangleIcon
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
