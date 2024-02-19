/*
  Warnings:

  - You are about to drop the column `wxid` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[wechat]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_wxid_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "wxid",
ADD COLUMN     "wechat" TEXT,
ADD COLUMN     "wechatVerified" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_wechat_key" ON "User"("wechat");
