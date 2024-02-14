/*
  Warnings:

  - You are about to alter the column `price` on the `Bill` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- CreateEnum
CREATE TYPE "BillStatus" AS ENUM ('NotCreated', 'Created', 'Paid', 'Pay');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('CREATING', 'CREATED', 'PAID', 'PAY_CANCELED', 'REFUNDED', 'PARTIAL_REFUNDED', 'CANCELED', 'PAY_ERROR');

-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PAID',
ALTER COLUMN "productId" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "productCount" DROP NOT NULL;
