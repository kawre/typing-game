-- CreateTable
CREATE TABLE "UserState" (
    "userId" INTEGER NOT NULL,
    "wpm" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL,
    "matchId" TEXT NOT NULL,

    CONSTRAINT "UserState_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "UserState" ADD CONSTRAINT "UserState_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
