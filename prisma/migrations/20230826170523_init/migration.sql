/*
  Warnings:

  - Added the required column `inJapanese` to the `Vocabulary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentence` to the `Vocabulary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentenceTranslation` to the `Vocabulary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vocabulary" ADD COLUMN     "inJapanese" TEXT NOT NULL,
ADD COLUMN     "sentence" TEXT NOT NULL,
ADD COLUMN     "sentenceTranslation" TEXT NOT NULL;
