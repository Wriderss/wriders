import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col text-center items-center justify-center py-2">
      <Head>
        <title>Wrider</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-8xl my-2 font-bold ">Wrider</h1>
        <p className="my-2 font-semibold text-xl  text-blue-500">
          This web application is still in production.🕐🕐
        </p>
        <span className="text-xl ">
          Some of the page you can visit in meantime to see the production. 🚀🚀
        </span>
        <div className="flex space-x-2  my-6">
          <Link href="/login">
            <span className="cursor-pointer font-semibold border-r-2 px-6 border-black hover:text-blue-500">
              Login
            </span>
          </Link>
          <Link href="/register">
            <span className="cursor-pointer font-semibold border-r-2 px-6 border-black hover:text-blue-500">
              Register
            </span>
          </Link>
          <Link href="/dashboard">
            <span className="cursor-pointer font-semibold border-r-2 px-6 border-black hover:text-blue-500">
              Dashboard
            </span>
          </Link>
          <Link href="/profile">
            <span className="cursor-pointer font-semibold border-r-2 px-6 border-black hover:text-blue-500">
              Profile
            </span>
          </Link>
          <Link href="/blog">
            <span className="cursor-pointer font-semibold border-r-2 px-6 border-black hover:text-blue-500">
              Blog
            </span>
          </Link>
          <Link href="/blog">
            <span className="cursor-pointer font-semibold  border-black hover:text-blue-500">
              Blog writting page.
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
