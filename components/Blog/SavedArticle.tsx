import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import Blog from "./Blog";
import YourBlog from "./YourBlog";

type blog_type = {
  userName: string;
  avatar: string;
  heading: string;
  image: string;
  id: number;
};

const SavedArticle = () => {
  return (
    <div className="my-4">
      <h1 className="font-semibold text-xl">Saved Article</h1>
      <div className="flex  space-x-[2rem] my-2 items-center"></div>
    </div>
  );
};

export default SavedArticle;
