/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, wordId } = req.body;

  try {
    const savedWord = await prisma.user.update({
      where: { id: userId },
      data: {
        savedWords: {
          connect: { id: wordId },
        },
      },
    });

    return res.status(200).json(savedWord);
  } catch (error) {
    return res.status(500).json({ error: "Failed to save the word" });
  }
};
