/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const quizzes = await prisma.quiz.findMany();
        return res.status(200).json(quizzes);
      } catch (error) {
        return res.status(500).json({ error: "Failed to fetch quizzes." });
      }
    // You can add POST, PUT, DELETE methods similarly for CRUD operations
    default:
      return res.status(405).end(); // Method Not Allowed
  }
};
