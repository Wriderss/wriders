import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import YourBlog from "./YourBlog";

type blog_type = {
  heading: string;
  image: string;
  views: number;
  id: number;
};

const YourArticle = () => {
  const [blogs, setBlogs] = useState<blog_type[]>([]);
  useEffect(() => {
    const blogs = [...Array(3)].map((_, i) => ({
      heading: faker.random.word(),
      image: faker.image.image(),
      views: faker.datatype.number(1000),
      id: i,
    }));

    setBlogs(blogs);
  }, []);
  return (
    <div className="my-4">
      <h1 className="font-semibold text-xl">Your Article</h1>
      <div className="flex  space-x-[2rem] my-2 items-center">
        {blogs.map((blog) => (
          <YourBlog
            heading={blog.heading}
            image={blog.image}
            views={blog.views}
            key={blog.id}
          />
        ))}
      </div>
    </div>
  );
};

export default YourArticle;
