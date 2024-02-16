/*
  Warnings:

  - The primary key for the `ProductInBill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProductInBill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductInBill" DROP CONSTRAINT "ProductInBill_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ProductInBill_pkey" PRIMARY KEY ("billId", "productId");
