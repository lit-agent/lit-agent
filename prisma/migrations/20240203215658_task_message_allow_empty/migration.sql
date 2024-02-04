-- DropForeignKey
ALTER TABLE "TaskFrom" DROP CONSTRAINT "TaskFrom_messageId_fkey";

-- AlterTable
ALTER TABLE "TaskFrom" ALTER COLUMN "messageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TaskFrom" ADD CONSTRAINT "TaskFrom_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
