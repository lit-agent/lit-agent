-- CreateTable
CREATE TABLE "Validation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Validation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValidationItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "index" INTEGER NOT NULL,
    "answer" JSONB NOT NULL,
    "validationId" TEXT NOT NULL,

    CONSTRAINT "ValidationItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Validation" ADD CONSTRAINT "Validation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValidationItem" ADD CONSTRAINT "ValidationItem_validationId_fkey" FOREIGN KEY ("validationId") REFERENCES "Validation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
