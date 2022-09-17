import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from "../../interfaces";
import { prisma } from "../../prisma/prisma";

type request_type = {
  profilePhoto: string;
  bio: string;
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return updateUserProfile(req, res);
    }
  }
}

async function updateUserProfile(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { profilePhoto, bio, email }: request_type = req.body;
  await prisma.user
    .update({
      where: {
        email,
      },
      data: {
        bio,
        profilePhoto,
      },
    })
    .then((data) => {
      res
        .status(200)
        .json({ message: "User is updated", data: data, success: true });
    })
    .catch((e) => {
      res
        .status(400)
        .json({ message: "Something went wrong", data: e, success: false });
    });
}
