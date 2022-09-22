// import { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "../../prisma/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   switch (req.method) {
//     case "POST": {
//       return IncrementViews(req, res);
//     }
//   }
// }

// async function IncrementViews(req: NextApiRequest, res: NextApiResponse) {
//   const { email, blogId } = req.body;
//   const allBlogViews = await prisma.views.findMany({
//     where: {
//       blogId,
//     },
//   });
//   console.log(allBlogViews);
//   const alreadyLiked = allBlogViews.filter((view) => view.email === email);
//   if (alreadyLiked) return;
//   else {
//     const response = await prisma.views
//       .create({
//         data: {
//           email,
//           blogId,
//         },
//       })
//       .then((data) => res.status(200).json(data))
//       .catch((e) => res.json(e.message));
//   }
// }
