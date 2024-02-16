-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_toUserId_fkey";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
