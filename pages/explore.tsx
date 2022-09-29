import { NextPage } from "next";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppSelector } from "../app/hooks";
import Sidebar from "../components/Sidebar";
import { auth } from "../lib/firebase";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import Loading from "../components/loading/Loading";
import Image from "next/image";
import { toast, Toaster } from "react-hot-toast";

type user_prop = {
  id: string;
  name: string;
  bio: string;
  email: string;
  profilePhoto: string;
  blog: [];
  follower: [];
  following: [];
};

const Explore: NextPage = () => {
  const mode = useAppSelector((state) => state.mode.ModeState);
  const [user] = useAuthState(auth);
  const email = user?.email;

  const getUserByEmail = async () => {
    const response = await fetch("/api/userDetails", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: user?.email }),
    });
    return response.json();
  };
  const { data: userDetails, isLoading } = useQuery(
    ["user", user?.email],
    getUserByEmail,
    { enabled: !!email }
  );
  const getAllUsers = async () => {
    const response = await fetch("/api/getAllUser", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    return response.json();
  };
  const { data: allUsers, isLoading: allUserLoading } = useQuery(
    ["all-user"],
    getAllUsers
  );
  console.log(allUsers);
  if (isLoading || allUserLoading) return <Loading />;
  return (
    <main className="flex">
      <Head>
        <title>Explore | Wride</title>
      </Head>
      <Sidebar />
      <div
        className={`flex-1 md:ml-[50px] ml-[12vw] min-h-screen md:w-full w-[90vw] overflow-y-hidden ${
          mode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <Header
          title="Explore"
          name={userDetails?.name}
          email={userDetails?.email}
          profilePhoto={userDetails?.profilePhoto}
        />

        <Toaster />
        <div className="w-[90%] flex flex-wrap justify-center gap-4  mx-auto my-4 p-2 ">
          {allUsers.map((user: user_prop) => (
            <div
              key={user.id}
              className="border border-black  w-[300px] p-2 flex flex-col text-center"
            >
              <Image
                src={
                  user.profilePhoto
                    ? user.profilePhoto
                    : `https://avatars.dicebear.com/api/avataaars/${user?.email}.svg`
                }
                height={150}
                width={150}
                className="object-contain rounded-full"
              />
              <h4 className="font-bold text-xl mt-1">{user.name}</h4>
              <span className="text-[12px] text-gray-600">{user.email}</span>
              <p className="font-semibold mx-2">
                {user.bio ? user.bio : "......"}
              </p>
              <span className="text-[14px] text-gray-900 my-1">
                Blog's written: {user.blog.length}
              </span>
              <div className="flex space-x-4 justify-center mb-2">
                <span className="text-gray-800 text-[14px]">
                  Followers:{user.follower?.length}
                </span>
                <span className="text-gray-800 text-[14px]">
                  Following:{user.following?.length}
                </span>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    toast.success("Coming soon too.", { icon: "ℹ" });
                  }}
                  className="bg-secondary-color  rounded-md p-2 text-white text-[14px] cursor-pointer"
                >
                  Check Profile
                </button>
                <button
                  onClick={() => {
                    toast.success("Coming soon too.", { icon: "ℹ" });
                  }}
                  className="bg-secondary-color rounded-md p-2 text-white text-[14px] cursor-pointer px-4"
                >
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Explore;
