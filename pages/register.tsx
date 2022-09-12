import React, { MouseEvent, useState } from "react";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Head from "next/head";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../lib/firebase";
import { ResponseType } from "../interfaces";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        updateProfile(user.user, { displayName: username });
      })
      .catch((e) => {
        alert(e.message);
        console.log(e);
      });
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ email, name: username }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { message, data, success } = await response.json();
    console.log(data);
    alert(message);
  };
  return (
    <div>
      <Head>
        <title>Wrider | Register Account</title>
      </Head>
      <main className="flex w-screen h-screen ">
        <div className="flex-1 bg-primary-color flex flex-col items-center pt-[6rem]">
          <div className="mt-[2rem] text-left w-[80%] flex flex-col justify-center mx-auto">
            <div className="flex flex-col space-y-2 w-[70%] justify-center mx-auto">
              <h2 className="font-extrabold text-[30px]  ">
                Create an Account
              </h2>
              <img src="/line.svg" alt="line" className="w-max" />
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
                    user name
                  </label>
                  <div
                    className="flex items-center w-[100%] space-x-2 
                 bg-white rounded-md p-2"
                  >
                    <UserIcon height={20} width={20} />
                    <input
                      type="text"
                      placeholder="user"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-transparent flex-1 outline-none"
                    />
                  </div>
                </div>
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

                <button
                  onClick={(e) => {
                    if (username === "" || password === "" || email === "") {
                      e.preventDefault();
                      alert("Fill all fields");
                    } else {
                      e.preventDefault();
                      handleRegister();
                    }
                  }}
                  className="bg-secondary-color cursor-pointer text-white px-[4rem] text-lg py-2 text-center mx-auto rounded-md w-max"
                >
                  Register
                </button>

                <div className="flex justify-center">
                  <p className="text-[#868686]">
                    Already have an Account?{" "}
                    <span className="capitalize font-semibold text-[#7C644C] cursor-pointer hover:underline">
                      <Link href={"/login"}>Log in </Link>
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

export default Register;
