import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return getAllNotifications(req, res);
    }
  }
}

async function getAllNotifications(req: NextApiRequest, res: NextApiResponse) {
  const { authorId } = req.body;
  await prisma.blog
    .findMany({
      where: {
        authorId,
      },
      select: {
        slug: true,
        title: true,
        image: true,
        comment: {
          select: {
            author: true,
            body: true,
          },
        },
        likes: {
          select: {
            user: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    })
    .then((data) => res.status(200).json(data))
    .catch((e) => res.status(500).json(e));
}
