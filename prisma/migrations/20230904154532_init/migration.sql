/*
  Warnings:

  - The values [Begruessung,Einkaufen,Gesundheit,Wetter,Kultur] on the enum `Categories` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `UserVocabulary` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Categories_new" AS ENUM ('Vorstellung', 'Reisen', 'Freizeit', 'Beziehungen', 'Arbeit', 'Sonstiges');
ALTER TYPE "Categories" RENAME TO "Categories_old";
ALTER TYPE "Categories_new" RENAME TO "Categories";
DROP TYPE "Categories_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "UserVocabulary" DROP CONSTRAINT "UserVocabulary_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserVocabulary" DROP CONSTRAINT "UserVocabulary_vocabId_fkey";

-- DropTable
DROP TABLE "UserVocabulary";

-- CreateTable
CREATE TABLE "Bookmarks" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "vocabId" INTEGER NOT NULL,
    "lastStudied" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "frequency" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Bookmarks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bookmarks" ADD CONSTRAINT "Bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmarks" ADD CONSTRAINT "Bookmarks_vocabId_fkey" FOREIGN KEY ("vocabId") REFERENCES "Vocabulary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
