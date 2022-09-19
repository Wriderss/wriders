import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return checkBlogLike(req, res);
    }
  }
}

async function checkBlogLike(req: NextApiRequest, res: NextApiResponse) {
  const { blogId, userId } = req.body;
  await prisma.like
    .findMany({
      where: {
        blogId: blogId,
        userId: userId,
      },
    })

    .then((data) => res.status(200).json({ success: true, data }))
    .catch((e) => res.status(500).json({ success: false }));
}
