import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return hitLike(req, res);
    }
  }
}

async function hitLike(req: NextApiRequest, res: NextApiResponse) {
  const { userId, blogId } = req.body;
  await prisma.like
    .create({
      data: {
        userId,
        blogId,
      },
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(400).json(e.message);
    });
}
