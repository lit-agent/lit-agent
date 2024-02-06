/*
  Warnings:

  - You are about to drop the `UserDirection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserDirection" DROP CONSTRAINT "UserDirection_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "UserDirection" DROP CONSTRAINT "UserDirection_toUserId_fkey";

-- DropTable
DROP TABLE "UserDirection";

-- CreateTable
CREATE TABLE "UserRelation" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "isFans" BOOLEAN NOT NULL DEFAULT false,
    "isBlocking" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserRelation_pkey" PRIMARY KEY ("fromUserId","toUserId")
);

-- AddForeignKey
ALTER TABLE "UserRelation" ADD CONSTRAINT "UserRelation_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRelation" ADD CONSTRAINT "UserRelation_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
