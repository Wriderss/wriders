import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return getBlog(req, res);
    }
  }
}

async function getBlog(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.body;
  await prisma.blog
    .findUnique({
      where: {
        slug,
      },
      include: { author: true, likes: true },
    })
    .then((data) => {
      res.status(200).json(data);
    });
}
