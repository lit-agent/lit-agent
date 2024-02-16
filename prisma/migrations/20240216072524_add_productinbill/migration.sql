/*
  Warnings:

  - The values [NotCreated,Created,Paid,Pay] on the enum `BillStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `paymentStatus` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `productCount` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `redeemType` on the `Bill` table. All the data in the column will be lost.
  - Added the required column `type` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BillType" AS ENUM ('currency', 'fire');

-- AlterEnum
BEGIN;
CREATE TYPE "BillStatus_new" AS ENUM ('NOT_PAID', 'PAID', 'REFUNDING', 'REFUNDED');
ALTER TABLE "Bill" ALTER COLUMN "status" TYPE "BillStatus_new" USING ("status"::text::"BillStatus_new");
ALTER TYPE "BillStatus" RENAME TO "BillStatus_old";
ALTER TYPE "BillStatus_new" RENAME TO "BillStatus";
DROP TYPE "BillStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_productId_fkey";

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "paymentStatus",
DROP COLUMN "price",
DROP COLUMN "productCount",
DROP COLUMN "productId",
DROP COLUMN "redeemType",
ADD COLUMN     "status" "BillStatus" NOT NULL DEFAULT 'PAID',
ADD COLUMN     "type" "BillType" NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "RedeemType";

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "value" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PAID',
    "userId" TEXT NOT NULL,
    "url" TEXT,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductInBill" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "prict" INTEGER NOT NULL,
    "billId" TEXT NOT NULL,

    CONSTRAINT "ProductInBill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInBill" ADD CONSTRAINT "ProductInBill_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInBill" ADD CONSTRAINT "ProductInBill_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
