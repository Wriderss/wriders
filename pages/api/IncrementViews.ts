import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return IncrementViews(req, res);
    }
  }
}

async function IncrementViews(req: NextApiRequest, res: NextApiResponse) {
  const { email, blogId } = req.body;
  const blogViews = await prisma.view.findMany({
    where: {
      blogId,
    },
  });
  const AlreadyViewed = blogViews.filter((blog) => blog.email === email);
  console.log(AlreadyViewed);
  if (!AlreadyViewed.length) {
    await prisma.view
      .create({
        data: {
          blogId,
          email,
        },
      })
      .then((data) => res.status(200).json(data))
      .catch((e) => res.json(e.message));
  } else {
    res.json({ message: "Already viewed Blog." });
  }
}
