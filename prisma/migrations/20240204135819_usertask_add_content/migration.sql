/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `TaskTo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskTo" ADD COLUMN     "content" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'finished';

-- DropTable
DROP TABLE "Post";

-- DropEnum
DROP TYPE "PosterSource";
