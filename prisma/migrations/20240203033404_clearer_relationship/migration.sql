/*
  Warnings:

  - You are about to drop the column `productBillId` on the `UserAction` table. All the data in the column will be lost.
  - You are about to drop the column `productRelationId` on the `UserAction` table. All the data in the column will be lost.
  - You are about to drop the `UserProductBill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProductRelation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserAction" DROP CONSTRAINT "UserAction_productBillId_fkey";

-- DropForeignKey
ALTER TABLE "UserAction" DROP CONSTRAINT "UserAction_productRelationId_fkey";

-- DropForeignKey
ALTER TABLE "UserAction" DROP CONSTRAINT "UserAction_taskId_fkey";

-- DropForeignKey
ALTER TABLE "UserProductBill" DROP CONSTRAINT "UserProductBill_productId_fkey";

-- DropForeignKey
ALTER TABLE "UserProductBill" DROP CONSTRAINT "UserProductBill_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserProductRelation" DROP CONSTRAINT "UserProductRelation_productId_fkey";

-- DropForeignKey
ALTER TABLE "UserProductRelation" DROP CONSTRAINT "UserProductRelation_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserTask" DROP CONSTRAINT "UserTask_taskId_fkey";

-- DropForeignKey
ALTER TABLE "UserTask" DROP CONSTRAINT "UserTask_userId_fkey";

-- AlterTable
ALTER TABLE "UserAction" DROP COLUMN "productBillId",
DROP COLUMN "productRelationId",
ADD COLUMN     "billId" TEXT,
ADD COLUMN     "prductId" TEXT;

-- DropTable
DROP TABLE "UserProductBill";

-- DropTable
DROP TABLE "UserProductRelation";

-- DropTable
DROP TABLE "UserTask";

-- DropEnum
DROP TYPE "UserProductActionType";

-- CreateTable
CREATE TABLE "Bill" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Product" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "isFavored" BOOLEAN NOT NULL DEFAULT false,
    "inCar" INTEGER NOT NULL DEFAULT 0,
    "bought" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Task" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "status" "UserTaskStatus" NOT NULL,

    CONSTRAINT "User_Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAction" ADD CONSTRAINT "UserAction_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "User_Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAction" ADD CONSTRAINT "UserAction_prductId_fkey" FOREIGN KEY ("prductId") REFERENCES "User_Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAction" ADD CONSTRAINT "UserAction_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Product" ADD CONSTRAINT "User_Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Product" ADD CONSTRAINT "User_Product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Task" ADD CONSTRAINT "User_Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Task" ADD CONSTRAINT "User_Task_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
