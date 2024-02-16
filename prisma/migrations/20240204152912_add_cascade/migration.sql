/*
  Warnings:

  - You are about to drop the column `taskChoiceId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_taskFromId_fkey";

-- DropForeignKey
ALTER TABLE "TaskChoice" DROP CONSTRAINT "TaskChoice_taskFromId_fkey";

-- DropForeignKey
ALTER TABLE "TaskFrom" DROP CONSTRAINT "TaskFrom_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "TaskTo" DROP CONSTRAINT "TaskTo_taskId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_taskChoiceId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "taskChoiceId";

-- CreateTable
CREATE TABLE "_TaskChoiceToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TaskChoiceToUser_AB_unique" ON "_TaskChoiceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskChoiceToUser_B_index" ON "_TaskChoiceToUser"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_taskFromId_fkey" FOREIGN KEY ("taskFromId") REFERENCES "TaskFrom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskChoice" ADD CONSTRAINT "TaskChoice_taskFromId_fkey" FOREIGN KEY ("taskFromId") REFERENCES "TaskFrom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskFrom" ADD CONSTRAINT "TaskFrom_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskTo" ADD CONSTRAINT "TaskTo_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "TaskFrom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskChoiceToUser" ADD CONSTRAINT "_TaskChoiceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "TaskChoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskChoiceToUser" ADD CONSTRAINT "_TaskChoiceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
