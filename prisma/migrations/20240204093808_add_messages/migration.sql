/*
  Warnings:

  - You are about to drop the column `messageId` on the `TaskFrom` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskFrom" DROP CONSTRAINT "TaskFrom_messageId_fkey";

-- DropIndex
DROP INDEX "TaskFrom_messageId_key";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "taskFromId" TEXT;

-- AlterTable
ALTER TABLE "TaskFrom" DROP COLUMN "messageId";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_taskFromId_fkey" FOREIGN KEY ("taskFromId") REFERENCES "TaskFrom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
