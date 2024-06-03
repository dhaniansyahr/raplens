/*
  Warnings:

  - A unique constraint covering the columns `[nis]` on the table `Siswa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nis` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Siswa" ADD COLUMN     "nis" TEXT NOT NULL,
ALTER COLUMN "tanggal_lahir" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Siswa_nis_key" ON "Siswa"("nis");
