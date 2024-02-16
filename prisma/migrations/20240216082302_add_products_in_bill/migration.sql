/*
  Warnings:

  - You are about to drop the column `price` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `productCount` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Bill` table. All the data in the column will be lost.
  - Added the required column `value` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_productId_fkey";

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "price",
DROP COLUMN "productCount",
DROP COLUMN "productId",
ADD COLUMN     "value" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ProductInBill" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "billId" TEXT NOT NULL,

    CONSTRAINT "ProductInBill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductInBill" ADD CONSTRAINT "ProductInBill_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInBill" ADD CONSTRAINT "ProductInBill_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
