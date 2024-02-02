/*
  Warnings:

  - You are about to drop the column `balance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_bought` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_tobuy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_bought" DROP CONSTRAINT "_bought_A_fkey";

-- DropForeignKey
ALTER TABLE "_bought" DROP CONSTRAINT "_bought_B_fkey";

-- DropForeignKey
ALTER TABLE "_tobuy" DROP CONSTRAINT "_tobuy_A_fkey";

-- DropForeignKey
ALTER TABLE "_tobuy" DROP CONSTRAINT "_tobuy_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "balance",
ADD COLUMN     "currentBalance" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "historyBalance" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "_bought";

-- DropTable
DROP TABLE "_tobuy";

-- CreateTable
CREATE TABLE "_todo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_finished" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_todo_AB_unique" ON "_todo"("A", "B");

-- CreateIndex
CREATE INDEX "_todo_B_index" ON "_todo"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_finished_AB_unique" ON "_finished"("A", "B");

-- CreateIndex
CREATE INDEX "_finished_B_index" ON "_finished"("B");

-- AddForeignKey
ALTER TABLE "_todo" ADD CONSTRAINT "_todo_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_todo" ADD CONSTRAINT "_todo_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_finished" ADD CONSTRAINT "_finished_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_finished" ADD CONSTRAINT "_finished_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
