import { useMutation } from "@tanstack/react-query";

export const followUser = async (data: any) => {
  const response = await fetch("/api/followUser", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const followUserByUserId = () => {
  return useMutation(followUser);
};
