import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import Dashboard from "./dashboard";
import Login from "./login";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  if (user) {
    return <Dashboard />;
  }
  if (!user) {
    return <Login />;
  }
  if (loading) {
    return <h1>Loading..</h1>;
  }
  if (error) {
    alert("Something went wrong");
  }
};

export default Home;
