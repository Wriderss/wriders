import { HeartIcon } from "@heroicons/react/24/solid";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { auth } from "../lib/firebase";

type UserResponse = {
  name: string;
  email: string;
  profilePhoto: string;
};

const NotificationPage: NextPage = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<any>([]);
  const [userUpdates, setUserUpdates] = useState<any>([]);
  const getUserDetails = async () => {
    if (!user?.email) return;
    const resp = await fetch("/api/userDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    });

    const userDetails = await resp.json();
    setUserDetails(userDetails);
  };
  const getUserUpdates = async () => {
    if (userDetails.length === 0) return;
    const response = await fetch("api/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authorId: userDetails?.id }),
    });
    const data = await response.json();
    setUserUpdates(data);
    console.log(data);
  };
  useEffect(() => {
    getUserDetails();
  }, [user]);
  useEffect(() => {
    getUserUpdates();
  }, [userDetails]);
  if (loading) return <h1>Loading</h1>;
  return (
    <main className="flex">
      <Head>
        <title>Wride | Notification Page</title>
      </Head>
      <Sidebar />
      <Toaster />
      <div className="flex-1 md:ml-[50px] ml-[12vw] md:w-full w-[90vw] overflow-y-hidden">
        <Header
          title="Notifications"
          name={userDetails?.name}
          email={userDetails?.email}
          profilePhoto={userDetails?.profilePhoto}
        />
        <div className="w-[90%]  mx-auto my-4 p-2 ">
          {userUpdates.map((updates: any, index: number) => (
            <div
              key={index}
              onClick={() => router.push(`/${updates.slug}`)}
              className="h-auto cursor-pointer flex space-x-4 bg-gray-100 items-center p-2 w-full hover:bg-gray-200 rounded-md"
            >
              <div className="relative h-[200px] w-[250px] ">
                <Image
                  priority
                  src={updates.image}
                  alt={updates.title}
                  layout="fill"
                  className="object-contain"
                />
              </div>
              <div className=" flex-1 ">
                <h1 className="font-semibold text-xl">{updates.title}</h1>
                <div className="flex items-center space-x-2">
                  <div className="flex  items-center">
                    <span className="font-semibold">
                      {updates.likes.length}
                    </span>
                    <HeartIcon height={30} width={30} color="red" />
                  </div>
                  <div className="flex items-center flex-1 space-x-2">
                    {updates.likes.map(({ user, userId }: any) => (
                      <Image
                        src={user.profilePhoto}
                        alt={user.name}
                        height={30}
                        width={30}
                        className="rounded-full cursor-pointer p-[2rem]"
                      />
                    ))}
                  </div>
                </div>
                <div className="my-2">
                  <h2 className="font-semibold ">Comments</h2>
                  {updates.comment.map(({ author, body }: any) => (
                    <div key={author.id} className="flex flex-col my-2 ">
                      <div className="flex items-center space-x-1">
                        <Image
                          src={
                            author.profilePhoto
                              ? author.profilePhoto
                              : `https://avatars.dicebear.com/api/avataaars/${author.email}.svg`
                          }
                          alt={author.name}
                          height={30}
                          width={30}
                          className="rounded-full border border-gray-500"
                        />
                        <span className="text-[13px] ">{author.name}</span>
                      </div>
                      <div className="ml-8">
                        <p className="text-[15px]">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default NotificationPage;
