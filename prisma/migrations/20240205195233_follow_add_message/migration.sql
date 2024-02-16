/*
  Warnings:

  - You are about to drop the `UserFollow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserFollow" DROP CONSTRAINT "UserFollow_followedById_fkey";

-- DropForeignKey
ALTER TABLE "UserFollow" DROP CONSTRAINT "UserFollow_followingId_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "followId" TEXT;

-- DropTable
DROP TABLE "UserFollow";

-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "followedById" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followedById_followingId_key" ON "Follow"("followedById", "followingId");

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followedById_fkey" FOREIGN KEY ("followedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_followId_fkey" FOREIGN KEY ("followId") REFERENCES "Follow"("id") ON DELETE SET NULL ON UPDATE CASCADE;
