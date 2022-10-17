import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { auth, storage } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuid } from "uuid";
import { useQuery } from "@tanstack/react-query";
import sendMailNotification from "../components/Email/sendMail";

const writtingpage = () => {
  const [user] = useAuthState(auth);
  const [ArticleHeading, SetArticleHeading] = useState("");
  const ImagePickerRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ArticleBody, SetArticleBody] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const slug = ArticleHeading.replaceAll(" ", "-").replaceAll("?", "");
  const [loading, setLoading] = useState<boolean>(false);

  const addImageToBlog = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedImage(readerEvent.target?.result as string);
    };
  };
  const addTags = (e: any) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    if (tags.length >= 5) return;
    setTags([...tags, value]);
    setTagInput("");
  };
  const removeTag = (index: any) => {
    setTags(tags.filter((element, i) => i !== index));
  };
  const fetchUserData = async () => {
    const resposne = await fetch("/api/userDetails", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email: user?.email }),
    });
    return resposne.json();
  };
  const {
    data: userDetails,
    status,
    isLoading,
  } = useQuery(["userData"], fetchUserData);
  const handleBlogSubmit = async () => {
    if (loading) return;
    setLoading(true);
    const email = user?.email;
    const imageRef = ref(storage, `blogs/${slug}/image`);
    await uploadString(imageRef, String(selectedImage), "data_url")
      .then(async () => {
        const responseEmail = await fetch("/api/userId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const { data } = await responseEmail.json();
        const downloadUrl = await getDownloadURL(imageRef);
        const response = await fetch("/api/blog/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slug: slug + uuid(),
            title: ArticleHeading,
            body: ArticleBody,
            image: downloadUrl,
            authorId: data.id,
          }),
        });

        sendMailNotification(data.id);

        setLoading(false);
        SetArticleBody("");
        SetArticleHeading("");
        setSelectedImage(null);
        toast.success("Blog is Created", { icon: "✅" });
      })
      .catch((e) => toast.error("Something went wrong"));
  };

  return (
    <div className="flex">
      <Head>
        <title>Wrider | Writting page</title>
      </Head>

      <Sidebar />
      <div className="flex-1 md:ml-[50px] ml-[12vw] md:w-full w-[90vw] overflow-y-hidden">
        <Toaster />
        <Header
          title={"Blog"}
          name={userDetails?.name}
          email={userDetails?.email}
          profilePhoto={userDetails?.profilePhoto}
        />

        <div className="ml-[4rem] w-[90%] mx-auto border-2 border-gray-200  my-2">
          <div className="p-4">
            <div className="flex justify-between items-center space-x-2">
              <input
                type="file"
                hidden
                ref={ImagePickerRef}
                onChange={(e) => addImageToBlog(e)}
              />
              {loading ? (
                <span className="font-bold text-xl">Publishing 🚀</span>
              ) : (
                <span className="font-bold text-xl">{ArticleHeading}</span>
              )}
              <button
                onClick={handleBlogSubmit}
                className="bg-secondary-color text-white text-[14px] py-2 px-4 rounded-sm"
              >
                Publish
              </button>
            </div>
            {selectedImage ? (
              <img
                src={selectedImage}
                onClick={() => setSelectedImage(null)}
                className="my-2 object-contain cursor-pointer h-[400px] w-full"
                alt="blog-image"
              />
            ) : (
              <div
                className="bg-gray-300 w-full h-[400px] my-2 flex flex-col space-y-4 cursor-pointer justify-center items-center"
                onClick={() => ImagePickerRef.current?.click()}
              >
                <img
                  src={"/image-gallery-dark.png"}
                  alt="image"
                  className="object-contain w-[200px] h-[200px]"
                />
                <h1 className="text-xl cursor-pointer">
                  Please select an Image with landscape ratio.
                </h1>
              </div>
            )}
            {/* <div className="border-b flex space-x-2 border-black w-full my-2 p-2">
              {tags.map((tag, i) => (
                <div
                  key={i}
                  className="flex flex-wrap group space-x-1 items-center text-[15px] bg-secondary-color text-white w-max p-2 rounded-md"
                >
                  <span className="capitalize">{tag}</span>
                  <XMarkIcon
                    height={20}
                    width={20}
                    className="cursor-pointer hover:bg-white hover:text-secondary-color rounded-full p-1"
                    onClick={() => removeTag(i)}
                  />
                </div>
              ))}
              <input
                type="text"
                placeholder="type your tags..(Only 4-5 tags are applicable)."
                className="text-[15px] outline-none flex-1"
                onKeyDown={addTags}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
            </div> */}
            <input
              type="text"
              className=" border-b border-black capitalize focus:border-b-2 focus:border-blue-500 w-full my-4 text-4xl outline-none"
              placeholder="Title of the Post "
              value={ArticleHeading}
              onChange={(e) => SetArticleHeading(e.target.value)}
            />

            <textarea
              name="blog-content"
              id="blog-content"
              cols={100}
              value={ArticleBody}
              placeholder="Tell your story.."
              onChange={(e) => SetArticleBody(e.target.value)}
              className="w-full border resize-none border-gray-500 focus:border-blue-500 focus:border-2 rounded-sm outline-none py-2 px-4 h-[550px]"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default writtingpage;
