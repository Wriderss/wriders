import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return getAllPostById(req, res);
    }
  }
}

async function getAllPostById(req: NextApiRequest, res: NextApiResponse) {
  const { email, userId } = req.body;
  await prisma?.newsletter
    .findMany({
      where: {
        email,
        userId,
      },
    })
    .then((data) => res.status(200).json(data))
    .catch((e) => res.status(500).json(e.message));
}
