-- CreateEnum
CREATE TYPE "TaskChoiceType" AS ENUM ('Text', 'Image');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "taskChoiceId" TEXT;

-- CreateTable
CREATE TABLE "TaskChoice" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "TaskChoiceType" NOT NULL,
    "content" TEXT NOT NULL,
    "taskFromId" TEXT,

    CONSTRAINT "TaskChoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_taskChoiceId_fkey" FOREIGN KEY ("taskChoiceId") REFERENCES "TaskChoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskChoice" ADD CONSTRAINT "TaskChoice_taskFromId_fkey" FOREIGN KEY ("taskFromId") REFERENCES "TaskFrom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
