/*
  Warnings:

  - You are about to drop the column `action` on the `UserTask` table. All the data in the column will be lost.
  - You are about to drop the `UserProductAction` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UserActionType" ADD VALUE 'create';
ALTER TYPE "UserActionType" ADD VALUE 'pause';
ALTER TYPE "UserActionType" ADD VALUE 'continue';
ALTER TYPE "UserActionType" ADD VALUE 'cancel';
ALTER TYPE "UserActionType" ADD VALUE 'approve';
ALTER TYPE "UserActionType" ADD VALUE 'reject';
ALTER TYPE "UserActionType" ADD VALUE 'accept';
ALTER TYPE "UserActionType" ADD VALUE 'submit';
ALTER TYPE "UserActionType" ADD VALUE 'favor';
ALTER TYPE "UserActionType" ADD VALUE 'unfavor';
ALTER TYPE "UserActionType" ADD VALUE 'payByCash';
ALTER TYPE "UserActionType" ADD VALUE 'payByFire';

-- DropForeignKey
ALTER TABLE "UserProductAction" DROP CONSTRAINT "UserProductAction_productId_fkey";

-- DropForeignKey
ALTER TABLE "UserProductAction" DROP CONSTRAINT "UserProductAction_userId_fkey";

-- AlterTable
ALTER TABLE "UserAction" ADD COLUMN     "productBillId" TEXT,
ADD COLUMN     "productRelationId" TEXT,
ADD COLUMN     "taskId" TEXT;

-- AlterTable
ALTER TABLE "UserTask" DROP COLUMN "action";

-- DropTable
DROP TABLE "UserProductAction";

-- CreateTable
CREATE TABLE "UserProductRelation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "actionType" "UserProductActionType" NOT NULL,

    CONSTRAINT "UserProductRelation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAction" ADD CONSTRAINT "UserAction_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "UserTask"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAction" ADD CONSTRAINT "UserAction_productBillId_fkey" FOREIGN KEY ("productBillId") REFERENCES "UserProductBill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAction" ADD CONSTRAINT "UserAction_productRelationId_fkey" FOREIGN KEY ("productRelationId") REFERENCES "UserProductRelation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProductRelation" ADD CONSTRAINT "UserProductRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProductRelation" ADD CONSTRAINT "UserProductRelation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
