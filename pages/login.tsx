import React, { useState } from "react";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Head from "next/head";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        toast.success("Login Successful");
        setEmail("");
        setPassword("");
      })
      .catch((e) => {
        console.log(e.message);
        toast.error("Something went wrong");
      });
    router.push("/");
  };
  return (
    <div>
      <Head>
        <title>Wrider | Login</title>
      </Head>
      <main className="flex w-screen h-screen ">
        <Toaster />
        <div className="flex-1 bg-primary-color flex flex-col items-center pt-[6rem]">
          <div className="mt-[2rem] text-left w-[80%] flex flex-col justify-center mx-auto">
            <div className="flex flex-col space-y-2 w-[70%] justify-center mx-auto">
              <h2 className="font-extrabold text-[30px]  ">Welcome Back!</h2>
              <img src="/line.svg" alt="line" className="w-max " />
            </div>
            <div className="mt-[2rem]">
              <form
                action=""
                className="flex flex-col space-y-4 w-[70%] justify-center mx-auto "
              >
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="username"
                    className="uppercase text-[#868686] "
                  >
                    Email
                  </label>
                  <div
                    className="flex items-center w-[100%] space-x-2 
                 bg-white rounded-md p-2"
                  >
                    <UserIcon height={20} width={20} />
                    <input
                      type="text"
                      placeholder="user@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent flex-1 outline-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="username"
                    className="uppercase text-[#868686]"
                  >
                    Password
                  </label>
                  <div
                    className="flex items-center w-[100%] space-x-2 
                 bg-white rounded-md p-2"
                  >
                    <LockClosedIcon height={20} width={20} />
                    <input
                      type="password"
                      placeholder="*******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-transparent outline-none flex-1"
                    />
                  </div>
                </div>
                <p
                  onClick={() => {
                    if (email === "") {
                      alert("Email is required.");
                    } else {
                      sendPasswordResetEmail(auth, email)
                        .then(() => {
                          alert(`Email sent to ${email}`);
                          setEmail("");
                        })
                        .catch((e) => {
                          console.log(e.message);
                        });
                    }
                  }}
                  className="text-[#171717] text-[15px] text-right cursor-pointer hover:underline"
                >
                  Forget Password?
                </p>
                <button
                  onClick={(e) => {
                    if (email === "" || password === "") {
                      e.preventDefault();
                      alert("All fields are required.");
                    } else {
                      e.preventDefault();
                      handleLogin();
                    }
                  }}
                  className="bg-secondary-color cursor-pointer text-white px-[4rem] text-lg py-2 text-center mx-auto rounded-md w-max"
                >
                  Login
                </button>
                <div className="flex justify-center">
                  <p className="text-[#868686]">
                    You don't have an account?{" "}
                    <span className="capitalize font-semibold text-[#7C644C] cursor-pointer hover:underline">
                      <Link href={"/register"}>Register</Link>
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <img
          src="/login.png"
          alt="login"
          className="object-contain hidden lg:inline-flex"
        />
      </main>
    </div>
  );
};

export default Login;
