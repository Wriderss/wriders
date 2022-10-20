import { useMutation } from "@tanstack/react-query";

export const AddEmailNotification = async (data: any) => {
  const response = await fetch("api/newsletter", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const AddEmailNotificationByID = () => {
  return useMutation(AddEmailNotification);
};
