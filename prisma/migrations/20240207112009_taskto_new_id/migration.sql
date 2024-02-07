/*
  Warnings:

  - The primary key for the `TaskTo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TaskTo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TaskTo" DROP CONSTRAINT "TaskTo_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "TaskTo_pkey" PRIMARY KEY ("taskId", "userId");
