/*
  Warnings:

  - You are about to drop the column `taskFromId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_taskFromId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "taskFromId",
DROP COLUMN "text",
DROP COLUMN "type",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "referId" TEXT;

-- DropEnum
DROP TYPE "MessageType";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "TaskFrom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_referId_fkey" FOREIGN KEY ("referId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
