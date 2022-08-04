/*
  Warnings:

  - You are about to drop the column `configId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "configId",
ALTER COLUMN "isOnline" SET DEFAULT false;
