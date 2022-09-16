import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "../Profile/Story";

type Profile = {
  id: any;
  avatar: string;
  userName: string;
};

type Story = {
  userName: string;
  avatar: string;
  id: any;
};

const Authors = () => {
  const [stories, setStories] = useState<Story[]>([]);
  useEffect(() => {
    const stories = [...Array(20)].map((_, i) => ({
      userName: faker.internet.userName(),
      avatar: faker.internet.avatar(),
      id: i,
    }));

    setStories(stories);
  }, []);
  return (
    <div className=" w-[90%] mx-auto  ">
      <h4 className="font-semibold text-xl">Shorts</h4>
      <div className="flex space-x-4 no-scrollbar p-6 bg-white mt-2 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
        <Story img={"/user.jpg"} username="You" />
        {stories.map((profile: Profile) => (
          <Story
            key={profile.id}
            img={profile?.avatar}
            username={profile.userName}
          />
        ))}
      </div>
    </div>
  );
};

export default Authors;
