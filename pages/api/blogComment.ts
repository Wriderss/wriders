import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return getComments(req, res);
    }
  }
}

async function getComments(req: NextApiRequest, res: NextApiResponse) {
  const { blogId } = req.body;
  await prisma?.comment
    .findMany({
      where: { blogId },
      include: { author: true },
      orderBy: { created_at: "desc" },
    })
    .then((data) => res.status(200).json(data))
    .catch((e) => res.status(500).json(e.message));
}
