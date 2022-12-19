import Image from "next/image";
import React from "react";

const WelcomePage = () => {
  return (
    <div>
      <div className="w-[90%] m-auto">
        <h1 className="font-bold text-6xl p-2">Wride</h1>
      </div>

      <div className="flex  min-h-[90vh] items-center w-[90%] mx-auto space-x-[2rem]">
        <div>
          <h1 className="text-8xl font-bold">
            Socail Media that makes you smarter.
          </h1>
          <button className="bg-secondary-color p-2 text-2xl text-white px-[2rem] my-4 rounded-md">
            Log In
          </button>
        </div>
        <Image
          src="/welcome-1.jpg"
          height="650px"
          width="900px"
          className="rounded-lg"
        />
      </div>
      <div className="w-[90%] min-h-[50vh] m-auto flex items-center flex-col space-y-4 ">
        <h1 className="text-6xl font-semibold text-center w-[70%] mx-auto my-[2rem]">
          <span className="font-bold">Wride</span> is a startup looking to
          change the way social media works.
        </h1>
        <p className="text-2xl w-[80%] text-center  mx-auto my-[3rem]">
          Social Media is super addictive today. Statistics show that an
          average, person will spent 4 years of thier life scrolling through
          mindless TikTok's and Reels. We at Wride aim to create an unaddictive
          social media platform where readers and writers can share thier
          powerful thoughts that can create inmeasurable value to the whole
          world!
        </p>
      </div>
      <div className="w-[90%] min-h-[90vh] flex justify-between mt-[3rem] items-center space-x-[4rem] m-auto my-2">
        <div>
          {" "}
          <h1 className="text-6xl w-[90%] font-bold mb-[3rem]">
            Become Smarter
          </h1>
          <p className="text-2xl my-[2rem]">
            Read exciting articles where you can learn about intresting
          </p>
          <p className="font-semibold text-2xl">
            Kinnectric can also connect you to people outside your usual circle.
          </p>
        </div>
        <Image
          src="/welcome-1.jpg"
          height="450px"
          width="600px"
          className="rounded-lg"
        />
      </div>
      <div className="w-[90%] min-h-[90vh] flex justify-between mt-[3rem] items-center space-x-[3rem] m-auto my-2">
        <Image
          src="/welcome-1.jpg"
          height="500px"
          width="700px"
          className="rounded-lg flex-1"
        />
        <div>
          {" "}
          <h1 className="text-6xl w-[90%] font-bold mb-[3rem]">
            Monetize your content
          </h1>
          <p className="text-2xl my-[2rem]">
            Wriders can write whatever they want to and earn money based on the
            views they get!
          </p>
          <p className="font-semibold text-2xl my-[2rem]">
            We aim to create communities with people of similiar intrest's to
            enable social learning.
          </p>
          <p className="font-bold text-2xl">Lets improve your focus!</p>
        </div>
      </div>
      <div className="w-[90%] min-h-[90vh] flex justify-between mt-[3rem] items-center space-x-[4rem] m-auto my-2">
        <div>
          {" "}
          <h1 className="text-6xl w-[90%] font-bold mb-[3rem]">
            Build Your Social Base
          </h1>
          <p className="text-2xl my-[2rem]">
            Kinnectric introduces you to articles and blogs that interest you.
          </p>
          <p className="font-semibold text-2xl w-[90%]">
            You can read ANY of these articles for free to meet new people where
            you can engage, and create connections.
          </p>
        </div>
        <Image
          src="/welcome-1.jpg"
          height="450px"
          width="700px"
          className="rounded-lg flex-1"
        />
      </div>
      <div className="flex justify-between w-[90%]  mb-[2rem] mx-auto">
        <h1 className="font-bold text-6xl">Wride</h1>
        <div className="h-max w-max  p-4">
          <h1 className="text-secondary-color font-bold text-7xl ">Connect</h1>
          <div className="flex flex-col  space-y-2  mt-[1rem] ">
            <p className="text-xl font-semibold">647-510-9071</p>
            <p className="text-xl font-semibold">385 Morrish Road</p>
            <p className="text-xl font-semibold">aryarsh33@gmail.com</p>
          </div>
          <div className=" flex h-max  space-x-[1rem] my-[1rem] mt-[1rem]">
            <div>
              <Image
                src="/twitter.svg"
                alt="twitter-logo"
                height={40}
                width={40}
              />
            </div>
            <div>
              <Image
                src="/twitter.svg"
                alt="twitter-logo"
                height={40}
                width={40}
              />
            </div>
            <div>
              <Image
                src="/twitter.svg"
                alt="twitter-logo"
                height={40}
                width={40}
              />
            </div>
            <div>
              <Image
                src="/twitter.svg"
                alt="twitter-logo"
                height={40}
                width={40}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
