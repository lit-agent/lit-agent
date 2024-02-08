/*
  Warnings:

  - You are about to drop the column `sentMessageId` on the `Task` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taskId]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_sentMessageId_fkey";

-- DropIndex
DROP INDEX "Task_sentMessageId_key";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "taskId" TEXT;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "sentMessageId",
ADD COLUMN     "platform" TEXT DEFAULT '不孤岛',
ADD COLUMN     "purpose" TEXT,
ADD COLUMN     "target" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Message_taskId_key" ON "Message"("taskId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
