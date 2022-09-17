import { prisma } from "../../prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from "../../interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  switch (req.method) {
    case "GET": {
      return getAllBlogs(req, res);
    }
    case "POST": {
      return addBlog(req, res);
    }
  }
}

async function getAllBlogs(req: NextApiRequest, res: NextApiResponse) {
  await prisma.blog
    .findMany({ include: { author: true } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(400).json({
        message: "Something went wrong",
        data: e.message,
        success: false,
      });
    });
}

async function addBlog(req: NextApiRequest, res: NextApiResponse) {
  const { slug, title, body, image, authorId } = req.body;

  await prisma.blog
    .create({
      data: {
        slug,
        title,
        body,
        image,
        authorId,
      },
    })
    .then((data) => {
      res
        .status(200)
        .json({ message: "Blog is created", data: data, success: true });
    })
    .catch((e) => {
      res.status(400).json({
        message: "Something went wrong",
        data: e.message,
        success: false,
      });
    });
}
