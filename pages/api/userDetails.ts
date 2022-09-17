import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return getUser(req, res);
    }
  }
}

async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  const user = await prisma.user
    .findUnique({
      where: {
        email,
      },
      include: {
        blog: true,
        follower: true,
        following: true,
      },
    })
    .then((data: any) => {
      res.status(200).json(data);
    });
}
