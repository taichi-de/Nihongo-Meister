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
//         const { searchTerm } = req.query;
//         const words = await prisma.dictionary.findMany({
//           where: { word: { contains: searchTerm } },
//         });
//         return res.status(200).json(words);
//       } catch (error) {
//         return res
//           .status(500)
//           .json({ error: "Failed to search in the dictionary." });
//       }
//     case "POST":
//       try {
//         const wordData = req.body;
//         const newWord = await prisma.dictionary.create({ data: wordData });
//         return res.status(201).json(newWord);
//       } catch (error) {
//         return res.status(500).json({ error: "Failed to add the word." });
//       }
//     // You can also add PUT and DELETE methods for updating and deleting words.
//     default:
//       return res.status(405).end(); // Method Not Allowed
//   }
// };
