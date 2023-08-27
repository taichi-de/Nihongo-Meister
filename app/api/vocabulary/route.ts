import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB connection failed");
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const vocabs = await prisma.vocabulary.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json({ message: "Success", vocabs }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   switch (req.method) {
//     case "GET":
//       try {
//         const vocabularies = await prisma.vocabulary.findMany();
//         return res.status(200).json(vocabularies);
//       } catch (error) {
//         return res.status(500).json({ error: "Failed to fetch vocabulary." });
//       }
//     case "POST":
//       // Add new vocabulary
//       try {
//         const vocabularyData = req.body;
//         const newVocab = await prisma.vocabulary.create({
//           data: vocabularyData,
//         });
//         return res.status(201).json(newVocab);
//       } catch (error) {
//         return res.status(500).json({ error: "Failed to add vocabulary." });
//       }
//     // PUT and DELETE methods can be added similarly
//     default:
//       return res.status(405).end(); // Method Not Allowed
//   }w
// };
