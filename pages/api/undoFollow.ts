import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return deleteFollows(req, res);
    }
  }
}

async function deleteFollows(req: NextApiRequest, res: NextApiResponse) {
  const { followingId, followerId } = req.body;
  await prisma?.follows
    .delete({
      where: {
        followerId_followingId: {
          followingId: followingId,
          followerId: followerId,
        },
      },
    })
    .then((data) => res.status(200).json(data));
}
