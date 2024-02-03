/*
  Warnings:

  - You are about to drop the column `description` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `detail` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `isOnsite` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `isReservationRequired` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `isReturnable` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `isSelfOperating` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `issuerId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `_favor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_finished` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_todo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserProductActionType" AS ENUM ('on', 'off', 'pause', 'resume', 'favor', 'unfavor', 'clickCashBuy', 'clickVirtualBuy', 'buy', 'cancelBuy');

-- CreateEnum
CREATE TYPE "UserTaskActionType" AS ENUM ('on', 'off', 'pause', 'continue', 'comment', 'modifyComment', 'deleteComment', 'favorComment', 'replyComment', 'favorTask', 'unfavorTAsk');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('broadcast', 'textChoices', 'imageChoices');

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_issuerId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_roomId_fkey";

-- DropForeignKey
ALTER TABLE "_favor" DROP CONSTRAINT "_favor_A_fkey";

-- DropForeignKey
ALTER TABLE "_favor" DROP CONSTRAINT "_favor_B_fkey";

-- DropForeignKey
ALTER TABLE "_finished" DROP CONSTRAINT "_finished_A_fkey";

-- DropForeignKey
ALTER TABLE "_finished" DROP CONSTRAINT "_finished_B_fkey";

-- DropForeignKey
ALTER TABLE "_todo" DROP CONSTRAINT "_todo_A_fkey";

-- DropForeignKey
ALTER TABLE "_todo" DROP CONSTRAINT "_todo_B_fkey";

-- DropIndex
DROP INDEX "Task_roomId_key";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "description",
DROP COLUMN "detail",
DROP COLUMN "images",
DROP COLUMN "isOnsite",
DROP COLUMN "isReservationRequired",
DROP COLUMN "isReturnable",
DROP COLUMN "isSelfOperating",
DROP COLUMN "issuerId",
DROP COLUMN "price",
DROP COLUMN "roomId",
DROP COLUMN "title",
DROP COLUMN "total",
ADD COLUMN     "type" "TaskType" NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_favor";

-- DropTable
DROP TABLE "_finished";

-- DropTable
DROP TABLE "_todo";

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "images" TEXT[],
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "isOnsite" BOOLEAN,
    "isSelfOperating" BOOLEAN,
    "isReturnable" BOOLEAN,
    "isReservationRequired" BOOLEAN,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProduct" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "action" "UserProductActionType" NOT NULL,

    CONSTRAINT "UserProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTask" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "action" "UserTaskActionType" NOT NULL,

    CONSTRAINT "UserTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TaskToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToUser_AB_unique" ON "_ProductToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToUser_B_index" ON "_ProductToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TaskToUser_AB_unique" ON "_TaskToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskToUser_B_index" ON "_TaskToUser"("B");

-- AddForeignKey
ALTER TABLE "UserProduct" ADD CONSTRAINT "UserProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProduct" ADD CONSTRAINT "UserProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToUser" ADD CONSTRAINT "_ProductToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToUser" ADD CONSTRAINT "_ProductToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUser" ADD CONSTRAINT "_TaskToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUser" ADD CONSTRAINT "_TaskToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
