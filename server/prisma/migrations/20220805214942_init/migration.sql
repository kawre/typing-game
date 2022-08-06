/*
  Warnings:

  - The primary key for the `Results` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Results" DROP CONSTRAINT "Results_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Results_pkey" PRIMARY KEY ("id");
