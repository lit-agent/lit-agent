-- DropForeignKey
ALTER TABLE "TaskFrom" DROP CONSTRAINT "TaskFrom_roomId_fkey";

-- AlterTable
ALTER TABLE "TaskFrom" ALTER COLUMN "roomId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TaskFrom" ADD CONSTRAINT "TaskFrom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
