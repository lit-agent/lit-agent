/*
  Warnings:

  - The primary key for the `Honor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `type` on the `Honor` table. All the data in the column will be lost.
  - Changed the type of `id` on the `Honor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Honor" DROP CONSTRAINT "Honor_pkey",
DROP COLUMN "type",
DROP COLUMN "id",
ADD COLUMN     "id" "HonorType" NOT NULL,
ADD CONSTRAINT "Honor_pkey" PRIMARY KEY ("id");
