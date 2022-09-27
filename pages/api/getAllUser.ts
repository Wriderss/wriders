import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      return getAllUsers(req, res);
    }
  }
}

async function getAllUsers(req: NextApiRequest, res: NextApiResponse) {
  await prisma.user
    .findMany({
      include: { blog: true, follower: true, following: true },
      orderBy: {
        blog: {
          _count: "desc",
        },
      },
    })
    .then((data) => res.status(200).json(data))
    .catch((e) => res.json(e.message));
}
