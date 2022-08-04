/*
  Warnings:

  - You are about to drop the column `matchId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_matchId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_matchId_fkey";

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "usersId" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "quoteId" SET DEFAULT 1;
DROP SEQUENCE "Match_id_seq";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "matchId";

-- DropTable
DROP TABLE "Room";
