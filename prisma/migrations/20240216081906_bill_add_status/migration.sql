/*
  Warnings:

  - You are about to drop the column `paymentStatus` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `redeemType` on the `Bill` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BillStatus_" AS ENUM ('PAYING', 'PAID', 'REFUNDED', 'REFUNDING');

-- CreateEnum
CREATE TYPE "BillType" AS ENUM ('CASH', 'FIRE');

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "paymentStatus",
DROP COLUMN "redeemType",
ADD COLUMN     "status" "BillStatus_" NOT NULL DEFAULT 'PAID',
ADD COLUMN     "type" "BillType" NOT NULL DEFAULT 'FIRE';

-- DropEnum
DROP TYPE "BillStatus";

-- DropEnum
DROP TYPE "RedeemType";
