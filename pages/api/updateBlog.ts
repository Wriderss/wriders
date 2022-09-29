import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return updateBlogBySlug(req, res);
    }
  }
}

async function updateBlogBySlug(req: NextApiRequest, res: NextApiResponse) {
  const { slug, title, body, image } = req.body;
  await prisma.blog
    .update({
      where: {
        slug,
      },
      data: {
        title: title,
        body: body,
        image: image,
      },
    })
    .then((data) => res.status(200).json(data))
    .catch((e) => res.status(500).json(e.message));
}
