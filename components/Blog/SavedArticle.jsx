import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import Blog from "./Blog";
import YourBlog from "./YourBlog";

const SavedArticle = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const blogs = [...Array(3)].map((_, i) => ({
      userName: faker.internet.userName(),
      avatar: faker.internet.avatar(),
      body: faker.lorem.lines(2),
      heading: faker.random.word(),
      tag: "Nature",
      image: faker.image.image(),
      id: i,
    }));

    setBlogs(blogs);
  }, []);
  return (
    <div className="my-4">
      <h1 className="font-semibold text-xl">Saved Article</h1>
      <div className="flex  space-x-[2rem] my-2 items-center">
        {blogs.map((blog) => (
          <Blog
            username={blog.userName}
            image={blog.image}
            key={blog.id}
            heading={blog.heading}
            tag={blog.tag}
            avatar={blog.avatar}
            body={blog.body}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedArticle;
