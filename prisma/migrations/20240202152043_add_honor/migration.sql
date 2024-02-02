-- CreateEnum
CREATE TYPE "HonorType" AS ENUM ('good', 'hot');

-- CreateTable
CREATE TABLE "Honor" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "HonorType" NOT NULL,

    CONSTRAINT "Honor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Honor" ADD CONSTRAINT "Honor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
