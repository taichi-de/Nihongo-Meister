/*
  Warnings:

  - The values [ADJECTIVE,PRONOUN,PREPOSITION,CONJUNCTION,INTERJECTION,PARTICLE] on the enum `PartOfSpeech` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `category` on the `Vocabulary` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PartOfSpeech_new" AS ENUM ('NOUN', 'VERB', 'ADJEKTIV', 'ADVERB', 'PRONOMEN', 'PRAEPOSITION', 'KONJUNKTION', 'INTERJEKTION', 'PARTIKEL');
ALTER TABLE "Vocabulary" ALTER COLUMN "partOfSpeech" TYPE "PartOfSpeech_new" USING ("partOfSpeech"::text::"PartOfSpeech_new");
ALTER TYPE "PartOfSpeech" RENAME TO "PartOfSpeech_old";
ALTER TYPE "PartOfSpeech_new" RENAME TO "PartOfSpeech";
DROP TYPE "PartOfSpeech_old";
COMMIT;

-- AlterTable
ALTER TABLE "Vocabulary" DROP COLUMN "category";
