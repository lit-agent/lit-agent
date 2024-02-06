/*
  Warnings:

  - You are about to drop the column `taskId` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the `TaskChoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TaskChoiceToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[roomId]` on the table `TaskFrom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomId` to the `TaskFrom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TaskChoice" DROP CONSTRAINT "TaskChoice_taskFromId_fkey";

-- DropForeignKey
ALTER TABLE "_TaskChoiceToUser" DROP CONSTRAINT "_TaskChoiceToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskChoiceToUser" DROP CONSTRAINT "_TaskChoiceToUser_B_fkey";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "taskId";

-- AlterTable
ALTER TABLE "TaskFrom" ADD COLUMN     "roomId" TEXT NOT NULL;

-- DropTable
DROP TABLE "TaskChoice";

-- DropTable
DROP TABLE "_TaskChoiceToUser";

-- DropEnum
DROP TYPE "TaskChoiceType";

-- CreateIndex
CREATE UNIQUE INDEX "TaskFrom_roomId_key" ON "TaskFrom"("roomId");

-- AddForeignKey
ALTER TABLE "TaskFrom" ADD CONSTRAINT "TaskFrom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
