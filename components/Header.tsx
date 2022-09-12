import React from "react";
import {
  BookmarkIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import DropDownProfile from "./Profile/DropDownProfile";

const Header = ({ title }: any) => {
  return (
    <header className="flex items-center space-x-[3rem] w-[95%] mx-auto p-4 px-[2rem] justify-between">
      <div>
        <h4 className="font-semibold text-3xl ">{title}</h4>
      </div>
      <div className="flex flex-1 mx-[2rem]  space-x-3">
        <div className="hidden lg:flex flex-1 items-center space-x-2 bg-gray-200 rounded-md px-4 py-1 shadow-md">
          <MagnifyingGlassIcon height={20} width={20} />
          <input
            type="text"
            className="bg-transparent flex-1 w-[80%] outline-none"
            placeholder="Search Articles"
          />
        </div>
        <button className="bg-secondary-color text-white p-2 rounded-md  ">
          <PencilIcon height={20} width={20} />
        </button>
      </div>
      <div className="flex space-x-2 mr-4 items-center">
        <BookmarkIcon
          className="text-gray-600 hidden md:inline-flex p-2 rounded-xl hover:rounded-3xl hover:bg-secondary-color hover:text-white transition-all ease-in cursor-pointer"
          height={40}
          width={40}
        />
        <MoonIcon
          className="text-gray-600 p-2 hidden md:inline-flex rounded-xl hover:rounded-3xl hover:bg-secondary-color hover:text-white transition-all ease-in cursor-pointer"
          height={40}
          width={40}
        />
        <DropDownProfile />
      </div>
    </header>
  );
};

export default Header;
