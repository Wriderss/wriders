import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return addEmailforNotification(req, res);
    }
  }
}

async function addEmailforNotification(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, email } = req.body;
  await prisma.newsletter
    .create({
      data: {
        userId,
        email,
      },
    })
    .then((data) => res.status(200).json(data))
    .catch((e) => res.status(500).json(e.message));
}
