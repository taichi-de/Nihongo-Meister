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
    const { userId, newLevel } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { level: newLevel },
    });

    return NextResponse.json(
      { message: "Success", updatedUser },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
