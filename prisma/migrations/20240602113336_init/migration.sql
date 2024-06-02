-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ORANG_TUA', 'GURU');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ORANG_TUA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Siswa" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "tempat_lahir" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL,
    "alamat" TEXT NOT NULL,
    "agama" TEXT NOT NULL,
    "nama_ayah" TEXT NOT NULL,
    "nama_ibu" TEXT NOT NULL,
    "pekerjaan_ayah" TEXT NOT NULL,
    "pekerjaan_ibu" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Siswa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Siswa_nisn_key" ON "Siswa"("nisn");
