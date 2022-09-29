import { useMutation } from "@tanstack/react-query";
import { ref, uploadString } from "firebase/storage";
import { storage } from "../../lib/firebase";

export const updateBlog = async (data: any) => {
  const response = await fetch("/api/updateBlog", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateBlogBySlug = () => {
  return useMutation(updateBlog);
};
