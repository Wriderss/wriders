import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return followUserById(req, res);
    }
    case "GET": {
      return allFollowData(req, res);
    }
  }
}

async function allFollowData(req: NextApiRequest, res: NextApiResponse) {
  await prisma.follows
    .findMany({})
    .then((data) => res.status(200).json(data))
    .catch((e) => res.json(e.message));
}

async function followUserById(req: NextApiRequest, res: NextApiResponse) {
  // FollowingId is the person we are going to follow and userId is our Id just to make an association between both of them.
  const { followingId, followerId } = req.body;
  await prisma?.follows
    .create({
      data: {
        followingId,
        followerId,
      },
    })
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    })
    .catch((e) => res.json(e.message));
}
