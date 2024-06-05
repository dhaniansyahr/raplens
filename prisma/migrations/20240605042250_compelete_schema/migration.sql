/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_id_key";

-- CreateTable
CREATE TABLE "Kelas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "siswaId" TEXT,

    CONSTRAINT "Kelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Semester" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "siswaId" TEXT,

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kehadiran" (
    "id" TEXT NOT NULL,
    "siswaId" TEXT NOT NULL,
    "kelasId" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "hadir" INTEGER NOT NULL,
    "sakit" INTEGER NOT NULL,
    "izin" INTEGER NOT NULL,
    "alpa" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kehadiran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Akademik" (
    "id" TEXT NOT NULL,
    "siswaId" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "matematikaId" TEXT,
    "bahasaIndonesiaId" TEXT,
    "ipaId" TEXT,
    "ipsId" TEXT,
    "seniBudayaId" TEXT,
    "kelasId" TEXT,

    CONSTRAINT "Akademik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matematika" (
    "id" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "uas" INTEGER NOT NULL,
    "uts" INTEGER NOT NULL,
    "tugas_1" INTEGER NOT NULL,
    "tugas_2" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Matematika_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BahasaIndonesia" (
    "id" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "uas" INTEGER NOT NULL,
    "uts" INTEGER NOT NULL,
    "tugas_1" INTEGER NOT NULL,
    "tugas_2" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BahasaIndonesia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ipa" (
    "id" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "uas" INTEGER NOT NULL,
    "uts" INTEGER NOT NULL,
    "tugas_1" INTEGER NOT NULL,
    "tugas_2" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ipa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ips" (
    "id" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "uas" INTEGER NOT NULL,
    "uts" INTEGER NOT NULL,
    "tugas_1" INTEGER NOT NULL,
    "tugas_2" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeniBudaya" (
    "id" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "uas" INTEGER NOT NULL,
    "uts" INTEGER NOT NULL,
    "tugas_1" INTEGER NOT NULL,
    "tugas_2" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeniBudaya_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NonAkademik" (
    "id" TEXT NOT NULL,
    "siswaId" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "olahragaId" TEXT,
    "seniId" TEXT,
    "olimpiadeId" TEXT,
    "keterampilanId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "kelasId" TEXT,

    CONSTRAINT "NonAkademik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Olahraga" (
    "id" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "uas" INTEGER NOT NULL,
    "uts" INTEGER NOT NULL,
    "tugas_1" INTEGER NOT NULL,
    "tugas_2" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Olahraga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seni" (
    "id" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "uas" INTEGER NOT NULL,
    "uts" INTEGER NOT NULL,
    "tugas_1" INTEGER NOT NULL,
    "tugas_2" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Seni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Olimpiade" (
    "id" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "uas" INTEGER NOT NULL,
    "uts" INTEGER NOT NULL,
    "tugas_1" INTEGER NOT NULL,
    "tugas_2" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Olimpiade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keterampilan" (
    "id" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "uas" INTEGER NOT NULL,
    "uts" INTEGER NOT NULL,
    "tugas_1" INTEGER NOT NULL,
    "tugas_2" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Keterampilan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SikapDanPerilaku" (
    "id" TEXT NOT NULL,
    "siswaId" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "kelasId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "kedisiplinanId" TEXT,
    "tanggungJawabId" TEXT,
    "adaptasiId" TEXT,
    "kerjaSamaId" TEXT,
    "etikaBelajarId" TEXT,

    CONSTRAINT "SikapDanPerilaku_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kedisiplinan" (
    "id" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "kehadiran" INTEGER NOT NULL,
    "keterlambatan" INTEGER NOT NULL,
    "kepatuhan" INTEGER NOT NULL,
    "kerapihan" INTEGER NOT NULL,
    "catatan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kedisiplinan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TanggungJawab" (
    "id" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "tugas" INTEGER NOT NULL,
    "kebersihan" INTEGER NOT NULL,
    "kepemimpinan" INTEGER NOT NULL,
    "catatan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TanggungJawab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adaptasi" (
    "id" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "kehadiran" INTEGER NOT NULL,
    "keterlambatan" INTEGER NOT NULL,
    "kepatuhan" INTEGER NOT NULL,
    "kerapihan" INTEGER NOT NULL,
    "catatan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Adaptasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KerjaSama" (
    "id" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "kerjaTim" INTEGER NOT NULL,
    "kerjaSama" INTEGER NOT NULL,
    "komunikasi" INTEGER NOT NULL,
    "catatan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KerjaSama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EtikaBelajar" (
    "id" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "kerajinan" INTEGER NOT NULL,
    "integrasi" INTEGER NOT NULL,
    "konsentrasi" INTEGER NOT NULL,
    "catatan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EtikaBelajar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kelas_id_key" ON "Kelas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Semester_id_key" ON "Semester"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Kehadiran_id_key" ON "Kehadiran"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Akademik_id_key" ON "Akademik"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Matematika_id_key" ON "Matematika"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BahasaIndonesia_id_key" ON "BahasaIndonesia"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ipa_id_key" ON "Ipa"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ips_id_key" ON "Ips"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SeniBudaya_id_key" ON "SeniBudaya"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NonAkademik_id_key" ON "NonAkademik"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Olahraga_id_key" ON "Olahraga"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Seni_id_key" ON "Seni"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Olimpiade_id_key" ON "Olimpiade"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Keterampilan_id_key" ON "Keterampilan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SikapDanPerilaku_id_key" ON "SikapDanPerilaku"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Kedisiplinan_id_key" ON "Kedisiplinan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TanggungJawab_id_key" ON "TanggungJawab"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Adaptasi_id_key" ON "Adaptasi"("id");

-- CreateIndex
CREATE UNIQUE INDEX "KerjaSama_id_key" ON "KerjaSama"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EtikaBelajar_id_key" ON "EtikaBelajar"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Kelas" ADD CONSTRAINT "Kelas_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Semester" ADD CONSTRAINT "Semester_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kehadiran" ADD CONSTRAINT "Kehadiran_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kehadiran" ADD CONSTRAINT "Kehadiran_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kehadiran" ADD CONSTRAINT "Kehadiran_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Akademik" ADD CONSTRAINT "Akademik_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Akademik" ADD CONSTRAINT "Akademik_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Akademik" ADD CONSTRAINT "Akademik_matematikaId_fkey" FOREIGN KEY ("matematikaId") REFERENCES "Matematika"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Akademik" ADD CONSTRAINT "Akademik_bahasaIndonesiaId_fkey" FOREIGN KEY ("bahasaIndonesiaId") REFERENCES "BahasaIndonesia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Akademik" ADD CONSTRAINT "Akademik_ipaId_fkey" FOREIGN KEY ("ipaId") REFERENCES "Ipa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Akademik" ADD CONSTRAINT "Akademik_ipsId_fkey" FOREIGN KEY ("ipsId") REFERENCES "Ips"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Akademik" ADD CONSTRAINT "Akademik_seniBudayaId_fkey" FOREIGN KEY ("seniBudayaId") REFERENCES "SeniBudaya"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Akademik" ADD CONSTRAINT "Akademik_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matematika" ADD CONSTRAINT "Matematika_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BahasaIndonesia" ADD CONSTRAINT "BahasaIndonesia_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ipa" ADD CONSTRAINT "Ipa_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ips" ADD CONSTRAINT "Ips_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeniBudaya" ADD CONSTRAINT "SeniBudaya_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NonAkademik" ADD CONSTRAINT "NonAkademik_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NonAkademik" ADD CONSTRAINT "NonAkademik_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NonAkademik" ADD CONSTRAINT "NonAkademik_olahragaId_fkey" FOREIGN KEY ("olahragaId") REFERENCES "Olahraga"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NonAkademik" ADD CONSTRAINT "NonAkademik_seniId_fkey" FOREIGN KEY ("seniId") REFERENCES "Seni"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NonAkademik" ADD CONSTRAINT "NonAkademik_olimpiadeId_fkey" FOREIGN KEY ("olimpiadeId") REFERENCES "Olimpiade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NonAkademik" ADD CONSTRAINT "NonAkademik_keterampilanId_fkey" FOREIGN KEY ("keterampilanId") REFERENCES "Keterampilan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NonAkademik" ADD CONSTRAINT "NonAkademik_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Olahraga" ADD CONSTRAINT "Olahraga_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seni" ADD CONSTRAINT "Seni_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Olimpiade" ADD CONSTRAINT "Olimpiade_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keterampilan" ADD CONSTRAINT "Keterampilan_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SikapDanPerilaku" ADD CONSTRAINT "SikapDanPerilaku_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SikapDanPerilaku" ADD CONSTRAINT "SikapDanPerilaku_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SikapDanPerilaku" ADD CONSTRAINT "SikapDanPerilaku_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SikapDanPerilaku" ADD CONSTRAINT "SikapDanPerilaku_kedisiplinanId_fkey" FOREIGN KEY ("kedisiplinanId") REFERENCES "Kedisiplinan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SikapDanPerilaku" ADD CONSTRAINT "SikapDanPerilaku_tanggungJawabId_fkey" FOREIGN KEY ("tanggungJawabId") REFERENCES "TanggungJawab"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SikapDanPerilaku" ADD CONSTRAINT "SikapDanPerilaku_adaptasiId_fkey" FOREIGN KEY ("adaptasiId") REFERENCES "Adaptasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SikapDanPerilaku" ADD CONSTRAINT "SikapDanPerilaku_kerjaSamaId_fkey" FOREIGN KEY ("kerjaSamaId") REFERENCES "KerjaSama"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SikapDanPerilaku" ADD CONSTRAINT "SikapDanPerilaku_etikaBelajarId_fkey" FOREIGN KEY ("etikaBelajarId") REFERENCES "EtikaBelajar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kedisiplinan" ADD CONSTRAINT "Kedisiplinan_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TanggungJawab" ADD CONSTRAINT "TanggungJawab_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adaptasi" ADD CONSTRAINT "Adaptasi_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KerjaSama" ADD CONSTRAINT "KerjaSama_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtikaBelajar" ADD CONSTRAINT "EtikaBelajar_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
