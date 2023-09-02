/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const conversations = await prisma.conversation.findMany();
        return res.status(200).json(conversations);
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Failed to fetch conversations." });
      }
    // You can add POST, PUT, DELETE methods similarly for CRUD operations
    default:
      return res.status(405).end(); // Method Not Allowed
  }
};
