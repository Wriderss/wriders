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
  const { userId, blogId } = req.body;
  await prisma.like
    .findFirst({
      where: { OR: [userId, blogId] },
    })
    .then((data) => {
      res.status(200).json({ data, success: true });
    })
    .catch((e) => {
      res.status(400).json({ data: e.message, success: false });
    });
}
