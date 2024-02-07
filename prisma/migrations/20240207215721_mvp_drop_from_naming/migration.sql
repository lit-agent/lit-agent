/*
  Warnings:

  - You are about to drop the column `method` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the `ProductFrom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductTo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskFrom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskTo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `redeemType` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserTaskStatus" AS ENUM ('finished', 'goon', 'cancelled');

-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_productId_fkey";

-- DropForeignKey
ALTER TABLE "Honor" DROP CONSTRAINT "Honor_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_toUserId_fkey";

-- DropForeignKey
ALTER TABLE "ProductFrom" DROP CONSTRAINT "ProductFrom_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "ProductTo" DROP CONSTRAINT "ProductTo_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "ProductTo" DROP CONSTRAINT "ProductTo_toUserId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TaskFrom" DROP CONSTRAINT "TaskFrom_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "TaskFrom" DROP CONSTRAINT "TaskFrom_sentMessageId_fkey";

-- DropForeignKey
ALTER TABLE "TaskTo" DROP CONSTRAINT "TaskTo_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TaskTo" DROP CONSTRAINT "TaskTo_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserMessage" DROP CONSTRAINT "UserMessage_userId_fkey";

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "method",
ADD COLUMN     "redeemType" "RedeemType" NOT NULL;

-- DropTable
DROP TABLE "ProductFrom";

-- DropTable
DROP TABLE "ProductTo";

-- DropTable
DROP TABLE "TaskFrom";

-- DropTable
DROP TABLE "TaskTo";

-- DropEnum
DROP TYPE "TaskToStatus";

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "images" TEXT[],
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "sold" INTEGER NOT NULL DEFAULT 0,
    "isOnsite" BOOLEAN,
    "isSelfOperating" BOOLEAN,
    "isReturnable" BOOLEAN,
    "isReservationRequired" BOOLEAN,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "body" JSONB NOT NULL,
    "value" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "sentMessageId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProduct" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "isFavored" BOOLEAN NOT NULL DEFAULT false,
    "inCar" INTEGER NOT NULL DEFAULT 0,
    "bought" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTask" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "status" "UserTaskStatus" NOT NULL DEFAULT 'finished',
    "content" TEXT,

    CONSTRAINT "UserTask_pkey" PRIMARY KEY ("taskId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_sentMessageId_key" ON "Task"("sentMessageId");

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Honor" ADD CONSTRAINT "Honor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_sentMessageId_fkey" FOREIGN KEY ("sentMessageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMessage" ADD CONSTRAINT "UserMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProduct" ADD CONSTRAINT "UserProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProduct" ADD CONSTRAINT "UserProduct_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
