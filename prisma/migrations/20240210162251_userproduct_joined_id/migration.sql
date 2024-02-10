/*
  Warnings:

  - The primary key for the `UserProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserProduct_pkey" PRIMARY KEY ("userId", "productId");
