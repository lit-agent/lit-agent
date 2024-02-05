/*
  Warnings:

  - A unique constraint covering the columns `[followedById,followingId]` on the table `UserFollow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserFollow_followedById_followingId_key" ON "UserFollow"("followedById", "followingId");
