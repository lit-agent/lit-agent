/*
  Warnings:

  - You are about to drop the `_redeem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_redeem" DROP CONSTRAINT "_redeem_A_fkey";

-- DropForeignKey
ALTER TABLE "_redeem" DROP CONSTRAINT "_redeem_B_fkey";

-- DropTable
DROP TABLE "_redeem";
