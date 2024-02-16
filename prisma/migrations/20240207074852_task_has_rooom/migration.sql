/*
  Warnings:

  - You are about to drop the column `roomId` on the `TaskFrom` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taskId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TaskFrom" DROP CONSTRAINT "TaskFrom_roomId_fkey";

-- DropIndex
DROP INDEX "TaskFrom_roomId_key";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "taskId" TEXT;

-- AlterTable
ALTER TABLE "TaskFrom" DROP COLUMN "roomId";

-- CreateIndex
CREATE UNIQUE INDEX "Room_taskId_key" ON "Room"("taskId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "TaskFrom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
