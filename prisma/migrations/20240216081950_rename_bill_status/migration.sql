/*
  Warnings:

  - The `status` column on the `Bill` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BillStatus" AS ENUM ('PAYING', 'PAID', 'REFUNDED', 'REFUNDING');

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "status",
ADD COLUMN     "status" "BillStatus" NOT NULL DEFAULT 'PAID';

-- DropEnum
DROP TYPE "BillStatus_";
