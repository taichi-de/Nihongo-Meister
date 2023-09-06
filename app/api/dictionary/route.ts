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
