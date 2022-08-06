/*
  Warnings:

  - You are about to drop the `UserState` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserState" DROP CONSTRAINT "UserState_matchId_fkey";

-- DropTable
DROP TABLE "UserState";

-- CreateTable
CREATE TABLE "Results" (
    "userId" INTEGER NOT NULL,
    "wpm" INTEGER NOT NULL,
    "matchId" TEXT NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
