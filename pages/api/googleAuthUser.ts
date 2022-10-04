import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return addGoogleAuthUser(req, res);
    }
  }
}

async function addGoogleAuthUser(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, profilePhoto } = req.body;
  await prisma.user
    .create({
      data: {
        name,
        email,
        profilePhoto,
      },
    })
    .then((data) => res.status(200).json(data))
    .catch((e) => res.status(500).json(e.message));
}
