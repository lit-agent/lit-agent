-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_fromUserId_fkey";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
