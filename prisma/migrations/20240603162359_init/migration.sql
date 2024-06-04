/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Siswa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Siswa_nis_key";

-- DropIndex
DROP INDEX "Siswa_nisn_key";

-- DropIndex
DROP INDEX "User_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "Siswa_id_key" ON "Siswa"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
