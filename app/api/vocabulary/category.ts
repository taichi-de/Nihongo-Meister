/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { category } = req.query;

  try {
    const vocabByCategory = await prisma.vocabulary.findMany({
      where: { category: category },
    });

    return res.status(200).json(vocabByCategory);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch vocabulary by category" });
  }
};
