-- DropForeignKey
ALTER TABLE "UserMessage" DROP CONSTRAINT "UserMessage_messageId_fkey";

-- DropForeignKey
ALTER TABLE "UserRelation" DROP CONSTRAINT "UserRelation_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "UserRelation" DROP CONSTRAINT "UserRelation_toUserId_fkey";

-- AddForeignKey
ALTER TABLE "UserMessage" ADD CONSTRAINT "UserMessage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRelation" ADD CONSTRAINT "UserRelation_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRelation" ADD CONSTRAINT "UserRelation_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
