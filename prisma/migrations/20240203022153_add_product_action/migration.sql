/*
  Warnings:

  - You are about to drop the `UserProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `UserTask` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserTaskStatus" AS ENUM ('on', 'off', 'paused', 'goon', 'finished', 'cancelled');

-- DropForeignKey
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_userId_fkey";

-- AlterTable
ALTER TABLE "UserTask" ADD COLUMN     "status" "UserTaskStatus" NOT NULL;

-- DropTable
DROP TABLE "UserProduct";

-- CreateTable
CREATE TABLE "UserProductBill" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "UserProductBill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProductAction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "actionType" "UserProductActionType" NOT NULL,

    CONSTRAINT "UserProductAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserProductBill" ADD CONSTRAINT "UserProductBill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProductBill" ADD CONSTRAINT "UserProductBill_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProductAction" ADD CONSTRAINT "UserProductAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProductAction" ADD CONSTRAINT "UserProductAction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
