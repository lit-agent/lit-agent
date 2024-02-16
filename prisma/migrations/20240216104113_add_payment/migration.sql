/*
  Warnings:

  - A unique constraint covering the columns `[billId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Bill" ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "billId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_billId_key" ON "Payment"("billId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
