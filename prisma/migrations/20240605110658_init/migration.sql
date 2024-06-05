/*
  Warnings:

  - You are about to drop the column `siswaId` on the `Kelas` table. All the data in the column will be lost.
  - You are about to drop the column `siswaId` on the `Semester` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Kelas" DROP CONSTRAINT "Kelas_siswaId_fkey";

-- DropForeignKey
ALTER TABLE "Semester" DROP CONSTRAINT "Semester_siswaId_fkey";

-- AlterTable
ALTER TABLE "Kelas" DROP COLUMN "siswaId";

-- AlterTable
ALTER TABLE "Semester" DROP COLUMN "siswaId";

-- AlterTable
ALTER TABLE "Siswa" ADD COLUMN     "kelasId" TEXT,
ADD COLUMN     "semesterId" TEXT;

-- AddForeignKey
ALTER TABLE "Siswa" ADD CONSTRAINT "Siswa_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Siswa" ADD CONSTRAINT "Siswa_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE SET NULL ON UPDATE CASCADE;
