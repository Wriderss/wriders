import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import YourBlog from "./YourBlog";

type blogType = {
  title: string;
  image: string;
  numberOfLikes: number;
  slug: string;
  likes: any;
};

const YourArticle = () => {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [userDetails, setUserDetails] = useState<blogType[]>([]);
  const getUserDetails = async () => {
    const resp = await fetch("/api/userDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    const userData = await resp.json();
    setUserDetails(userData?.blog);
  };

  useEffect(() => {
    getUserDetails();
  }, [user]);
  return (
    <div className="my-4">
      <h1 className="font-semibold text-3xl my-4">Your Article</h1>
      <div className="flex flex-wrap gap-4  items-center">
        {userDetails.map((blog) => (
          <YourBlog heading={blog.title} image={blog.image} slug={blog.slug} />
        ))}
      </div>
    </div>
  );
};

export default YourArticle;
