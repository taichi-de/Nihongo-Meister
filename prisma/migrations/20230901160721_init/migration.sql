/*
  Warnings:

  - The `sentences` column on the `ConversationExample` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `translations` column on the `ConversationExample` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `category` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the `Questions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_quizId_fkey";

-- AlterTable
ALTER TABLE "ConversationExample" DROP COLUMN "sentences",
ADD COLUMN     "sentences" TEXT[],
DROP COLUMN "translations",
ADD COLUMN     "translations" TEXT[];

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "category";

-- DropTable
DROP TABLE "Questions";

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "quizId" INTEGER NOT NULL,
    "questionType" "QuestionType" NOT NULL,
    "category" "Categories" NOT NULL,
    "question" TEXT NOT NULL,
    "answerOptions" TEXT[],
    "correctAnswer" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
