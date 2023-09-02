-- AlterTable
ALTER TABLE "ConversationExample" ALTER COLUMN "sentences" SET NOT NULL,
ALTER COLUMN "sentences" SET DATA TYPE TEXT,
ALTER COLUMN "translations" SET NOT NULL,
ALTER COLUMN "translations" SET DATA TYPE TEXT;
