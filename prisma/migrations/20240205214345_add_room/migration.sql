/*
  Warnings:

  - You are about to drop the column `channelId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `followId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Follow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_to` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followedById_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followingId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_followId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_taskId_fkey";

-- DropForeignKey
ALTER TABLE "_to" DROP CONSTRAINT "_to_A_fkey";

-- DropForeignKey
ALTER TABLE "_to" DROP CONSTRAINT "_to_B_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "channelId",
DROP COLUMN "followId",
DROP COLUMN "taskId",
ADD COLUMN     "roomId" TEXT;

-- DropTable
DROP TABLE "Follow";

-- DropTable
DROP TABLE "_to";

-- CreateTable
CREATE TABLE "UserDirection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "isFans" BOOLEAN NOT NULL DEFAULT false,
    "isBlocking" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserDirection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "taskId" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoomToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDirection_fromUserId_toUserId_key" ON "UserDirection"("fromUserId", "toUserId");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToUser_AB_unique" ON "_RoomToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToUser_B_index" ON "_RoomToUser"("B");

-- AddForeignKey
ALTER TABLE "UserDirection" ADD CONSTRAINT "UserDirection_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDirection" ADD CONSTRAINT "UserDirection_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "TaskFrom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToUser" ADD CONSTRAINT "_RoomToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToUser" ADD CONSTRAINT "_RoomToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
