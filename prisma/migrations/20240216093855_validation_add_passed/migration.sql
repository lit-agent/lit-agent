/*
  Warnings:

  - Added the required column `passed` to the `Validation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Validation" ADD COLUMN     "passed" BOOLEAN NOT NULL;
