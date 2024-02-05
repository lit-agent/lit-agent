/*
  Warnings:

  - You are about to drop the column `folloingId` on the `UserFollow` table. All the data in the column will be lost.
  - Added the required column `followingId` to the `UserFollow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserFollow" DROP CONSTRAINT "UserFollow_folloingId_fkey";

-- AlterTable
ALTER TABLE "UserFollow" DROP COLUMN "folloingId",
ADD COLUMN     "followingId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
