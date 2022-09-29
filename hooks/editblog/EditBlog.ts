import { useMutation } from "@tanstack/react-query";

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
