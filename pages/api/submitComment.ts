import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return addComment(req, res);
    }
    case "GET": {
      return getAllComments(req, res);
    }
  }
}

async function addComment(req: NextApiRequest, res: NextApiResponse) {
  const { authorId, blogId, body } = req.body;
  await prisma?.comment
    .create({
      data: {
        authorId,
        blogId,
        body,
      },
    })
    .then((data) => res.status(200).json(data))
    .catch((e) => res.status(400).json(e.message));
}

async function getAllComments(req: NextApiRequest, res: NextApiResponse) {
  await prisma?.comment
    .findMany()
    .then((data) => res.status(200).json(data))
    .catch((e) => res.status(400).json(e.message));
}
