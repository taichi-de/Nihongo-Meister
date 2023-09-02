/*
  Warnings:

  - You are about to drop the column `content` on the `ConversationExample` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the `DictionaryEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuizQuestions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('Wort', 'Gespraech');

-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('Begruessung', 'Vorstellung', 'Einkaufen', 'Reisen', 'Freizeit', 'Beziehungen', 'Arbeit', 'Gesundheit', 'Wetter', 'Kultur', 'Sonstiges');

-- DropForeignKey
ALTER TABLE "QuizQuestions" DROP CONSTRAINT "QuizQuestions_quizId_fkey";

-- AlterTable
ALTER TABLE "ConversationExample" DROP COLUMN "content",
ADD COLUMN     "sentences" TEXT[],
ADD COLUMN     "translations" TEXT[];

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "name",
ADD COLUMN     "category" "Categories" NOT NULL;

-- DropTable
DROP TABLE "DictionaryEntry";

-- DropTable
DROP TABLE "QuizQuestions";

-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "quizId" INTEGER NOT NULL,
    "questionType" "QuestionType" NOT NULL,
    "question" TEXT NOT NULL,
    "answerOptions" TEXT[],
    "correctAnswer" TEXT NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
