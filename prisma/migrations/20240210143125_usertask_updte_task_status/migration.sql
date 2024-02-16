/*
  Warnings:

  - The `passed` column on the `UserTask` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserTask" DROP COLUMN "passed",
ADD COLUMN     "passed" BOOLEAN;

-- DropEnum
DROP TYPE "TripleStatus";
