/*
  Warnings:

  - You are about to drop the column `ddl` on the `TaskFrom` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `TaskFrom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskFrom" DROP COLUMN "ddl",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
