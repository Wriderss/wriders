import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import YourBlog from "./YourBlog";

const YourArticle = () => {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [userDetails, setUserDetails] = useState<string[]>([]);
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
    <div className="my-4">
      <h1 className="font-semibold text-3xl my-4">Your Article</h1>
      <div className="flex flex-wrap gap-4  items-center">
        {userDetails?.blog?.map((blog: any) => (
          <YourBlog
            heading={blog.title}
            image={blog.image}
            likes={blog.numberOfLikes}
          />
        ))}
      </div>
    </div>
  );
};

export default YourArticle;
