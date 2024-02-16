/*
  Warnings:

  - You are about to drop the column `type` on the `TaskFrom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TaskFrom" DROP COLUMN "type";

-- DropEnum
DROP TYPE "TaskType";
