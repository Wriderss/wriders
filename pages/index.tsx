import { onAuthStateChanged } from "firebase/auth";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/loading/Loading";
import { auth } from "../lib/firebase";
import Dashboard from "./dashboard";
import Login from "./login";

const Home = () => {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Login />;
  }

  return <Dashboard />;
};

export default Home;
