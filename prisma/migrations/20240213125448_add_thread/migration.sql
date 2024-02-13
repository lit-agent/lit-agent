-- CreateEnum
CREATE TYPE "ThreadStatus" AS ENUM ('running', 'finished', 'cancelled');

-- CreateTable
CREATE TABLE "Thread" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "ThreadStatus" NOT NULL DEFAULT 'running',
    "data" JSONB NOT NULL,

    CONSTRAINT "Thread_pkey" PRIMARY KEY ("id")
);
