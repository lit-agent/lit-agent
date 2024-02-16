/*
  Warnings:

  - The values [broadcast,textChoices,imageChoices] on the enum `TaskType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `content` on the `TaskFrom` table. All the data in the column will be lost.
  - Added the required column `body` to the `TaskFrom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskType_new" AS ENUM ('Plain', 'TextChoices', 'ImageChoices');
ALTER TABLE "TaskFrom" ALTER COLUMN "type" TYPE "TaskType_new" USING ("type"::text::"TaskType_new");
ALTER TYPE "TaskType" RENAME TO "TaskType_old";
ALTER TYPE "TaskType_new" RENAME TO "TaskType";
DROP TYPE "TaskType_old";
COMMIT;

-- AlterTable
ALTER TABLE "TaskFrom" DROP COLUMN "content",
ADD COLUMN     "body" JSONB NOT NULL;
