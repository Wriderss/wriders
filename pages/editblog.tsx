import { useMutation, useQuery } from "@tanstack/react-query";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast, { Toaster } from "react-hot-toast";
import { useAppSelector } from "../app/hooks";
import Header from "../components/Header";
import Loading from "../components/loading/Loading";
import Sidebar from "../components/Sidebar";
import { updateBlogBySlug } from "../hooks/editblog/EditBlog";
import { auth, storage } from "../lib/firebase";

const EditBlog = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const email = user?.email;
  const { slug, blog } = router.query;
  const fetchBlogDataBySlug = async () => {
    const response = await fetch("/api/blogDetails", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ slug: slug }),
    });
    return response.json();
  };
  const { data: blogData, isLoading: blogDataLoading } = useQuery(
    ["blog-data"],
    fetchBlogDataBySlug,
    { enabled: !!slug }
  );
  const ImagePickerRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ArticleBody, setArticleBody] = useState<any>("");
  const [ArticleHeading, setArticleHeading] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const {
    mutate,
    isLoading: loadingUpdatedData,
    isSuccess,
  } = updateBlogBySlug();

  const addImageToBlog = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedImage(readerEvent.target?.result as string);
    };
  };

  const fetchUserDataByEmail = async () => {
    const response = await fetch("/api/userDetails", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    return response.json();
  };
  const mode = useAppSelector((state) => state.mode.ModeState);
  const { data: userDetails, isLoading: userDataLoading }: any = useQuery(
    ["user-data", email],
    fetchUserDataByEmail,
    { enabled: !!email }
  );

  const updateBlogWithImage = async () => {
    if (loading) return;
    setLoading(true);
    const imageRef = ref(storage, `blogs/${slug}/image`);
    await uploadString(imageRef, String(selectedImage), "data_url")
      .then(async () => {
        console.log("here uploading image");
        const downloadImageUrl = await getDownloadURL(imageRef);
        mutate({
          slug,
          title: ArticleHeading,
          body: ArticleBody,
          image: downloadImageUrl,
        });
        console.log(downloadImageUrl);
        console.log("running");
        toast.success("Blog Updated.");
        setLoading(false);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    setArticleBody(blogData?.body);
    setArticleHeading(blogData?.title);
    setSelectedImage(blogData?.image);
  }, [blogData]);
  useEffect(() => {
    if (!slug) router.push("/");
  }, []);
  useEffect(() => {
    if (isSuccess) router.push(`/${slug}`);
  }, [isSuccess]);
  if (blogDataLoading) return <Loading />;
  return (
    <main className="flex">
      <Toaster />
      <Head>
        <title>Edit blog | Wride</title>
      </Head>
      <Sidebar />
      <div
        className={`md:ml-[50px] ml-[15vw] md:w-full  flex-1  w-[90vw]  ${
          mode ? "bg-gray-900" : "bg-white"
        } `}
      >
        <Header
          title={"Home"}
          name={userDetails?.name}
          email={userDetails?.email}
          profilePhoto={userDetails?.profilePhoto}
        />
        <div className="ml-[4rem] w-[90%] mx-auto border-2 border-gray-200 my-2">
          <div className="p-4">
            <div className="flex justify-between items-center space-x-2">
              <input
                type="file"
                hidden
                ref={ImagePickerRef}
                onChange={(e) => addImageToBlog(e)}
              />
              {loadingUpdatedData || loading ? (
                <>
                  <span className="font-bold text-xl">Publishing 🚀</span>
                </>
              ) : (
                <>
                  <span className="font-bold text-xl">{ArticleHeading}</span>
                </>
              )}
              <button
                onClick={() => {
                  if (selectedImage !== blogData.image) {
                    updateBlogWithImage();
                  } else {
                    mutate({
                      slug,
                      title: ArticleHeading,
                      body: ArticleBody,
                      image: selectedImage,
                    });
                    toast.success("Blog Updated");
                  }
                }}
                className="bg-secondary-color text-white text-[14px] py-2 px-4 rounded-sm"
              >
                Update your blog.
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
            <input
              type="text"
              className="border-b border-black capitalize focus:border-b-2 focus:border-blue-500 w-full my-4 text-4xl outline-none"
              placeholder="Title of the Post"
              value={ArticleHeading}
              onChange={(e) => setArticleHeading(e.target.value)}
            />
            <textarea
              name="blog-content"
              id="blog-content"
              cols={100}
              value={ArticleBody}
              placeholder="Tell your Story.."
              onChange={(e) => setArticleBody(e.target.value)}
              className="w-full border resize-none border-gray500 focus:border-blue-500 focus:border-2 rounded-sm outline-none py-2 px-4 h-[550px]"
            ></textarea>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditBlog;
