/*
  Warnings:

  - A unique constraint covering the columns `[sentMessageId]` on the table `TaskFrom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sentMessageId` to the `TaskFrom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "channelId" TEXT;

-- AlterTable
ALTER TABLE "TaskFrom" ADD COLUMN     "sentMessageId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TaskFrom_sentMessageId_key" ON "TaskFrom"("sentMessageId");

-- AddForeignKey
ALTER TABLE "TaskFrom" ADD CONSTRAINT "TaskFrom_sentMessageId_fkey" FOREIGN KEY ("sentMessageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
