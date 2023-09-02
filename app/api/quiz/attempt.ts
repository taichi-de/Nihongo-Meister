/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, quizId, answers } = req.body;

  try {
    // Here, you'd have logic to check answers, calculate score etc.
    // For brevity, I'm demonstrating storing the attempt.
    const attempt = await prisma.attempt.create({
      data: {
        userId: userId,
        quizId: quizId,
        answers: answers, // Assuming this is an array or similar data structure
        // score: calculatedScore
      },
    });

    return res.status(200).json(attempt);
  } catch (error) {
    return res.status(500).json({ error: "Failed to save the quiz attempt." });
  }
};
