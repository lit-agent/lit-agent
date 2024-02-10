/*
  Warnings:

  - You are about to drop the column `toUserId` on the `UserProduct` table. All the data in the column will be lost.
  - Added the required column `userId` to the `UserProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_toUserId_fkey";

-- AlterTable
ALTER TABLE "UserProduct" DROP COLUMN "toUserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserProduct" ADD CONSTRAINT "UserProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
