/*
  Warnings:

  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `quoteId` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[matchId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `matchId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_quoteId_fkey";

-- AlterTable
ALTER TABLE "Room" DROP CONSTRAINT "Room_pkey",
DROP COLUMN "id",
DROP COLUMN "quoteId",
ADD COLUMN     "matchId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "matchId" INTEGER;

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "quoteId" INTEGER NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_matchId_key" ON "Room"("matchId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
