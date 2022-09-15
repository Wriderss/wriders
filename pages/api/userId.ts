import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";

type ResponseType = {
  data: any;
};
type request_type = {
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST": {
      return getUserId(req, res);
    }
  }
}

async function getUserId(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email }: request_type = req.body;
  const authorId = await prisma.user
    .findUnique({
      where: {
        email,
      },
      select: { id: true },
    })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((e) => {
      console.log(e.message);
    });
}
