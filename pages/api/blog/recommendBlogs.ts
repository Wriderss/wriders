import { prisma } from "../../../prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from "../../../interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  switch (req.method) {
    case "POST": {
      return getRecommendedBlogs(req, res);
    }
  }
}

async function getRecommendedBlogs(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;

  await prisma.user
    .findUnique({
      where: {
        id: userId,
      },
      select: {
        following: {
          select: {
            follower: {
              select: {
                blog: {
                  include: {
                    author: true,
                    likes: true,
                    views: true,
                    comment: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    .then((data) => res.status(200).json(data))
    .catch((e) => res.status(500).json(e.message));
}
