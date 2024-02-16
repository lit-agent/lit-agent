-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "toUserId" TEXT;

-- CreateTable
CREATE TABLE "UserMessage" (
    "userId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "isSender" BOOLEAN NOT NULL,
    "isReceiver" BOOLEAN NOT NULL,
    "isMentioned" BOOLEAN NOT NULL,
    "isQuoted" BOOLEAN NOT NULL,

    CONSTRAINT "UserMessage_pkey" PRIMARY KEY ("userId","messageId")
);

-- CreateTable
CREATE TABLE "_mention" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_mention_AB_unique" ON "_mention"("A", "B");

-- CreateIndex
CREATE INDEX "_mention_B_index" ON "_mention"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMessage" ADD CONSTRAINT "UserMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMessage" ADD CONSTRAINT "UserMessage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_mention" ADD CONSTRAINT "_mention_A_fkey" FOREIGN KEY ("A") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_mention" ADD CONSTRAINT "_mention_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
