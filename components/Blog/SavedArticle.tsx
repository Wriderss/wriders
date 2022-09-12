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
  const [blogs, setBlogs] = useState<blog_type[]>([]);
  useEffect(() => {
    const blogs = [...Array(3)].map((_, i) => ({
      userName: faker.internet.userName(),
      avatar: faker.internet.avatar(),
      heading: faker.random.word(),
      image: faker.image.image(),
      id: i,
    }));

    setBlogs(blogs);
  }, []);
  return (
    <div className="my-4">
      <h1 className="font-semibold text-xl">Saved Article</h1>
      <div className="flex  space-x-[2rem] my-2 items-center">
        {blogs.map(({ userName, image, id, heading, avatar }) => (
          <Blog
            username={userName}
            image={image}
            key={id}
            heading={heading}
            avatar={avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedArticle;
