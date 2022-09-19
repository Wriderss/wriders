import { Dialog, Transition } from "@headlessui/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Image from "next/image";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { auth, storage } from "../../lib/firebase";
import { modalClose, modalOpen } from "../../slices/modalSlice";

export default function ProfileModal({ email }: any) {
  const [user] = useAuthState(auth);
  const isOpen = useAppSelector((state) => state.modal.ModalState);
  const dispatch = useDispatch();

  const ImagePickerRef = useRef<HTMLInputElement>(null);

  const [userDetails, setUserDetails] = useState<any>([]);
  const [newProfile, setNewProfile] = useState([]);
  const getUserDetails = async () => {
    const resp = await fetch("/api/userDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    const userDetails = await resp.json();
    setUserDetails(userDetails);
  };

  const [profileBio, setProfileBio] = useState<string>(userDetails?.bio);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    userDetails?.profilePhoto
  );

  const updateProfile = async () => {
    if (!selectedImage) {
      console.log("hello there.");
      const response = await fetch("/api/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: profileBio && profileBio,
          email: email,
        }),
      })
        .then(({ data }: any) => {
          toast.success("Referesh the pages ♻");
          dispatch(modalClose());
          setTimeout(() => {
            dispatch(modalClose());
          }, 7000);
          setNewProfile(data);
        })
        .catch((e) => {
          toast.error("Something went wrong.😞");
          dispatch(modalClose());
        });
    } else {
      const imageRef = ref(storage, `user/${user?.email}/profilePhoto`);
      if (selectedImage) {
        await uploadString(imageRef, String(selectedImage), "data_url");
      }

      const downloadUrl = await getDownloadURL(imageRef);
      const response = await fetch("/api/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profilePhoto: selectedImage && downloadUrl,
          bio: profileBio && profileBio,
          email: email,
        }),
      })
        .then(({ data }: any) => {
          toast.success("Referesh the pages ♻");
          dispatch(modalClose());
          setTimeout(() => {
            dispatch(modalClose());
          }, 7000);
          setNewProfile(data);
        })
        .catch((e) => {
          toast.error("Something went wrong.😞");
          dispatch(modalClose());
        });
    }
  };

  const addImageToBlog = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedImage(readerEvent.target?.result as string);
    };
  };
  useEffect(() => {
    getUserDetails();
  }, [user, newProfile]);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => dispatch(modalClose())}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <Toaster />
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold text-center leading-6 text-gray-900"
                  >
                    Edit your Profile 📝
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      type="file"
                      hidden
                      ref={ImagePickerRef}
                      onChange={(e) => addImageToBlog(e)}
                    />
                    <div className="h-[200px] w-[200px] mx-auto">
                      {selectedImage ? (
                        <img
                          src={selectedImage}
                          onClick={() => setSelectedImage(null)}
                          className="rounded-full object-contain border border-gray-900 w-full
                           h-full cursor-pointer "
                          alt="blog-image"
                        />
                      ) : (
                        <div
                          className="h-[200px] w-[200px] mx-auto"
                          onClick={() => ImagePickerRef.current?.click()}
                        >
                          <img
                            src={
                              userDetails?.profilePhoto
                                ? userDetails?.profilePhoto
                                : `https://avatars.dicebear.com/api/avataaars/${userDetails?.email}.svg`
                            }
                            alt="profile-photo"
                            className="rounded-full border border-gray-900 cursor-pointer "
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex space-y-2 flex-col">
                      <label className="text-lg leading-6 text-gray-900 font-semibold">
                        Bio
                      </label>
                      <textarea
                        placeholder="Type here.."
                        className="border border-gray-900 p-2 resize-none h-[100px]"
                        value={profileBio}
                        onChange={(e) => setProfileBio(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-secondary-color px-4 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-color focus-visible:ring-offset-2"
                      onClick={() => {
                        updateProfile();
                      }}
                    >
                      Update Profile
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
// 01145184000
