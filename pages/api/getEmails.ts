import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return getAllEmailsById(req, res);
    }
  }
}

async function getAllEmailsById(req: NextApiRequest, res: NextApiResponse) {
  const { authorId } = req.body;
  await prisma.user
    .findUnique({
      where: {
        id: authorId,
      },
      select: {
        newsletter: {
          select: { email: true },
        },
      },
    })
    .then((data) => res.status(200).json(data))
    .catch((e) => res.status(500).json(e.message));
}
