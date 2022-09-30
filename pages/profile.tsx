import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProfileBar from "../components/Profile/ProfileBar";
import YourArticle from "../components/Blog/YourArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { useAppSelector } from "../app/hooks";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/loading/Loading";

const profile = () => {
  const mode = useAppSelector((state) => state.mode.ModeState);
  const [user] = useAuthState(auth);
  const email = user?.email;
  const fetchUserDataByEmail = async () => {
    const response = await fetch("/api/userDetails", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    return response.json();
  };
  const { data: userDetails, isLoading } = useQuery(
    ["userData", email],
    fetchUserDataByEmail,
    { enabled: !!email }
  );
  if (isLoading) return <Loading />;

  return (
    <div className="flex ">
      <Head>
        <title>Wride | {userDetails?.name}</title>
      </Head>

      <Sidebar />
      <div
        className={`md:ml-[50px] min-h-screen ml-[15vw] md:w-full  flex-1  w-[90vw]  ${
          mode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <Header
          title={"Profile"}
          name={userDetails?.name}
          email={userDetails?.email}
          profilePhoto={userDetails?.profilePhoto}
        />
        <div className={`ml-[4rem] w-[90%] mx-auto`}>
          <ProfileBar
            yourProfile={true}
            userEmail={userDetails?.email}
            profilePhoto={userDetails?.profilePhoto}
            userName={userDetails?.name}
            bio={userDetails?.bio}
            followers={userDetails?.follower?.length}
            following={userDetails?.following?.length}
            blog={userDetails?.blog?.length}
          />
          <YourArticle userBlogs={userDetails?.blog} />
        </div>
      </div>
    </div>
  );
};

export default profile;
