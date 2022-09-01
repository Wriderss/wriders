import {
  ArrowRightOnRectangleIcon,
  Cog8ToothIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";

const DropDownProfile = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative mr-4">
      <img
        id="avatarButton"
        onClick={() => setShow(!show)}
        type="button"
        data-dropdown-toggle="userDropdown"
        data-dropdown-placement="bottom-start"
        class="h-[30px] w-[30px]  rounded-full cursor-pointer"
        src="https://avatars.dicebear.com/api/human/user.svg"
        alt="User dropdown"
      />

      <div
        id="userDropdown"
        class={`${
          show ? "!absolute" : "hidden"
        }  -left-[130px] mr-4 z-10 w-44 mt-2 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
      >
        <div class="py-3 px-4 text-sm text-gray-900 dark:text-white">
          <div className="capitalize font-semibold">John doe</div>
          <div class="font-medium truncate">John@gmail.com</div>
        </div>
        <ul
          class="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="avatarButton"
        >
          <li>
            <a
              href="/"
              class="flex items-center space-x-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <Cog8ToothIcon className="h-5 w-5" />
              <span> Settings</span>
            </a>
          </li>
          <li>
            <a
              href="/"
              class="flex items-center space-x-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <CurrencyDollarIcon className="h-5 w-5" />
              <span>Earnings</span>
            </a>
          </li>
        </ul>
        <div class="py-1">
          <a
            href="/"
            onClick={() => signOut(auth)}
            class="flex items-center space-x-2 py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
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
