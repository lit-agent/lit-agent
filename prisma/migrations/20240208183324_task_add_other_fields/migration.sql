-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "description" TEXT,
ADD COLUMN     "detail" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Untitled';
