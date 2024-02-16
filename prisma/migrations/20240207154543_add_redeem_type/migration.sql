/*
  Warnings:

  - Added the required column `method` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productCount` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RedeemType" AS ENUM ('currency', 'fire');

-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "method" "RedeemType" NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "productCount" INTEGER NOT NULL;
