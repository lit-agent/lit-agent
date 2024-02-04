/*
  Warnings:

  - You are about to drop the column `roomId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RoomToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `channelId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_roomId_fkey";

-- DropForeignKey
ALTER TABLE "_RoomToUser" DROP CONSTRAINT "_RoomToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoomToUser" DROP CONSTRAINT "_RoomToUser_B_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "roomId",
ADD COLUMN     "channelId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "_RoomToUser";
