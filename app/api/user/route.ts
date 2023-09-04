// /* eslint-disable import/no-anonymous-default-export */
// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const { userId, newLevel } = req.body;

//   try {
//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: { level: newLevel },
//     });

//     return res.status(200).json(updatedUser);
//   } catch (error) {
//     return res.status(500).json({ error: "Failed to update user level" });
//   }
// };
