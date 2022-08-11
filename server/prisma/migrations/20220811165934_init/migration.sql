/*
  Warnings:

  - A unique constraint covering the columns `[historyId]` on the table `Results` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Results" ADD COLUMN     "historyId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "history" JSONB[],

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Results_historyId_key" ON "Results"("historyId");

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
