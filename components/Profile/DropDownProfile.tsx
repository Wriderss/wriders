import {
  ArrowRightOnRectangleIcon,
  Cog8ToothIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";

const DropDownProfile = () => {
  const [user] = useAuthState(auth);
  const [show, setShow] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<any>([]);
  const email = user?.email;
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
    <div className="relative mr-4">
      {userDetails?.profilePhoto ? (
        <img
          id="avatarButton"
          onClick={() => setShow(!show)}
          data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          className="h-[30px] w-[30px]  rounded-full cursor-pointer"
          src={userDetails?.profilePhoto}
          alt="User dropdown"
        />
      ) : (
        <img
          id="avatarButton"
          onClick={() => setShow(!show)}
          data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          className="h-[30px] w-[30px]  rounded-full cursor-pointer"
          src={`https://avatars.dicebear.com/api/avataaars/${userDetails?.email}.svg`}
          alt="User dropdown"
        />
      )}

      <div
        id="userDropdown"
        className={`${
          show ? "!absolute" : "hidden"
        }  -left-[130px] mr-4 z-10 w-44 mt-2 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
      >
        <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
          <div className="capitalize font-semibold">{userDetails?.name}</div>
          <div className="font-medium truncate">{userDetails?.email}</div>
        </div>
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="avatarButton"
        >
          <li>
            <a
              href="/"
              className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <Cog8ToothIcon className="h-5 w-5" />
              <span> Settings</span>
            </a>
          </li>
          <li>
            <a
              href="/"
              className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <CurrencyDollarIcon className="h-5 w-5" />
              <span>Earnings</span>
            </a>
          </li>
        </ul>
        <div className="py-1">
          <a
            onClick={() => {
              signOut(auth);
            }}
            href="/"
            className="flex items-center space-x-2 py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span> Sign out</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DropDownProfile;
