/*
  Warnings:

  - You are about to drop the column `currentBalance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `historyBalance` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "currentBalance",
DROP COLUMN "historyBalance",
ADD COLUMN     "balance" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "currentEarnedFire" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalEarnedFire" INTEGER NOT NULL DEFAULT 0;
