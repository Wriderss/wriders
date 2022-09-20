import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import YourBlog from "./YourBlog";

const YourArticle = ({ userBlogs }: any) => {
  return (
    <div className="my-4">
      <h1 className="font-semibold text-3xl my-4">Your Article</h1>
      {userBlogs && (
        <div className="flex flex-wrap gap-4  items-center">
          {userBlogs.map((blog: any) => (
            <YourBlog
              heading={blog.title}
              image={blog.image}
              slug={blog.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default YourArticle;
