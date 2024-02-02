/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_issuerId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_roomId_fkey";

-- DropForeignKey
ALTER TABLE "_bought" DROP CONSTRAINT "_bought_A_fkey";

-- DropForeignKey
ALTER TABLE "_favor" DROP CONSTRAINT "_favor_A_fkey";

-- DropForeignKey
ALTER TABLE "_tobuy" DROP CONSTRAINT "_tobuy_A_fkey";

-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "issuerId" TEXT NOT NULL,
    "images" TEXT[],
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "isOnsite" BOOLEAN,
    "isSelfOperating" BOOLEAN,
    "isReturnable" BOOLEAN,
    "isReservationRequired" BOOLEAN,
    "surplus" INTEGER NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_roomId_key" ON "Task"("roomId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_issuerId_fkey" FOREIGN KEY ("issuerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favor" ADD CONSTRAINT "_favor_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tobuy" ADD CONSTRAINT "_tobuy_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_bought" ADD CONSTRAINT "_bought_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
