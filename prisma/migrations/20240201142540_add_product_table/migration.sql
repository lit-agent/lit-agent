-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('room', 'product');

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "type" "MessageType" NOT NULL DEFAULT 'room';

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "issuerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "isOnsite" BOOLEAN,
    "isSelfOperating" BOOLEAN,
    "isReturnable" BOOLEAN,
    "isReservationRequired" BOOLEAN,
    "surplus" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_redeem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_favor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_tobuy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_bought" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_redeem_AB_unique" ON "_redeem"("A", "B");

-- CreateIndex
CREATE INDEX "_redeem_B_index" ON "_redeem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_favor_AB_unique" ON "_favor"("A", "B");

-- CreateIndex
CREATE INDEX "_favor_B_index" ON "_favor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_tobuy_AB_unique" ON "_tobuy"("A", "B");

-- CreateIndex
CREATE INDEX "_tobuy_B_index" ON "_tobuy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_bought_AB_unique" ON "_bought"("A", "B");

-- CreateIndex
CREATE INDEX "_bought_B_index" ON "_bought"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_issuerId_fkey" FOREIGN KEY ("issuerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_redeem" ADD CONSTRAINT "_redeem_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_redeem" ADD CONSTRAINT "_redeem_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favor" ADD CONSTRAINT "_favor_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favor" ADD CONSTRAINT "_favor_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tobuy" ADD CONSTRAINT "_tobuy_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tobuy" ADD CONSTRAINT "_tobuy_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_bought" ADD CONSTRAINT "_bought_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_bought" ADD CONSTRAINT "_bought_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
