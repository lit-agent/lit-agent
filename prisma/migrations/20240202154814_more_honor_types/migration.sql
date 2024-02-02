/*
  Warnings:

  - The values [good,hot] on the enum `HonorType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HonorType_new" AS ENUM ('NewUser', 'NewTask', 'GoodFriend', 'HotFriend', 'GoodFriendEver', 'HotFriendEver');
ALTER TABLE "Honor" ALTER COLUMN "type" TYPE "HonorType_new" USING ("type"::text::"HonorType_new");
ALTER TYPE "HonorType" RENAME TO "HonorType_old";
ALTER TYPE "HonorType_new" RENAME TO "HonorType";
DROP TYPE "HonorType_old";
COMMIT;
