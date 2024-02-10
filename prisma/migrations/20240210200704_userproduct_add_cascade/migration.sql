-- DropForeignKey
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserProduct" ADD CONSTRAINT "UserProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProduct" ADD CONSTRAINT "UserProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
