-- CreateEnum
CREATE TYPE "TripleStatus" AS ENUM ('default', 'true', 'false');

-- AlterTable
ALTER TABLE "UserTask" ADD COLUMN     "passed" "TripleStatus" NOT NULL DEFAULT 'default';
