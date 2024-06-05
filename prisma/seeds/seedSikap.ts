import { PrismaClient } from "@prisma/client";
import { v4 as randomUUID } from "uuid";

const prisma = new PrismaClient();

export async function seedSikap() {
  const countSikap = await prisma.sikapDanPerilaku.count();

  const countKedisiplinan = await prisma.kedisiplinan.count();
  const countTanggungJawab = await prisma.tanggungJawab.count();
  const countAdaptasi = await prisma.adaptasi.count();
  const countKerjaSama = await prisma.kerjaSama.count();
  const countEtikaBelajar = await prisma.etikaBelajar.count();

  const countSiswa = await prisma.siswa.count();
  const countKelas = await prisma.kelas.count();
  const countSemester = await prisma.semester.count();

  if (
    countKedisiplinan === 0 &&
    countTanggungJawab === 0 &&
    countAdaptasi === 0 &&
    countKerjaSama === 0 &&
    countEtikaBelajar === 0
  ) {
    if (countSemester !== 0) {
      const semesterIds = await prisma.semester.findMany({
        select: {
          id: true,
        },
      });

      await prisma.kedisiplinan.createMany({
        data: [
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            kehadiran: 80,
            keterlambatan: 85,
            kepatuhan: 90,
            kerapihan: 88,
            catatan: "Kedisiplinan siswa sangat baik",
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            kehadiran: 90,
            keterlambatan: 80,
            kepatuhan: 100,
            kerapihan: 90,
            catatan: "Kedisiplinan siswa sangat baik",
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            kehadiran: 85,
            keterlambatan: 90,
            kepatuhan: 90,
            kerapihan: 100,
            catatan: "Kedisiplinan siswa sangat baik",
          },
        ],
      });

      await prisma.tanggungJawab.createMany({
        data: [
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            tugas: 80,
            kebersihan: 85,
            kepemimpinan: 90,
            catatan: "Tanggung jawab siswa sangat baik",
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            tugas: 90,
            kebersihan: 80,
            kepemimpinan: 100,
            catatan: "Tanggung jawab siswa sangat baik",
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            tugas: 85,
            kebersihan: 90,
            kepemimpinan: 90,
            catatan: "Tanggung jawab siswa sangat baik",
          },
        ],
      });

      await prisma.adaptasi.createMany({
        data: [
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            kehadiran: 80,
            keterlambatan: 85,
            kepatuhan: 90,
            kerapihan: 88,
            catatan: "Adaptasi siswa sangat baik",
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            kehadiran: 90,
            keterlambatan: 80,
            kepatuhan: 100,
            kerapihan: 90,
            catatan: "Adaptasi siswa sangat baik",
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            kehadiran: 85,
            keterlambatan: 90,
            kepatuhan: 90,
            kerapihan: 100,
            catatan: "Adaptasi siswa sangat baik",
          },
        ],
      });

      await prisma.kerjaSama.createMany({
        data: [
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            kerjaTim: 80,
            kerjaSama: 85,
            komunikasi: 90,
            catatan: "Kerja Sama siswa sangat baik",
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            kerjaTim: 90,
            kerjaSama: 80,
            komunikasi: 100,
            catatan: "Kerja Sama siswa sangat baik",
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            kerjaTim: 85,
            kerjaSama: 90,
            komunikasi: 90,
            catatan: "Kerja Sama siswa sangat baik",
          },
        ],
      });

      await prisma.etikaBelajar.createMany({
        data: [
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            kerajinan: 80,
            integrasi: 85,
            konsentrasi: 90,
            catatan: "Etika belajar siswa sangat baik",
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            kerajinan: 90,
            integrasi: 80,
            konsentrasi: 100,
            catatan: "Etika belajar siswa sangat baik",
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            kerajinan: 85,
            integrasi: 90,
            konsentrasi: 90,
            catatan: "Etika belajar siswa sangat baik",
          },
        ],
      });

      if (countSiswa !== 0 && countKelas !== 0) {
        const siswaIds = await prisma.siswa.findMany({
          select: {
            id: true,
          },
        });

        const kelasIds = await prisma.kelas.findMany({
          select: {
            id: true,
          },
        });

        const kedisiplinanIds = await prisma.kedisiplinan.findMany({
          select: {
            id: true,
          },
        });

        const tanggungJawabIds = await prisma.tanggungJawab.findMany({
          select: {
            id: true,
          },
        });

        const adaptasiIds = await prisma.adaptasi.findMany({
          select: {
            id: true,
          },
        });

        const kerjaSamaIds = await prisma.kerjaSama.findMany({
          select: {
            id: true,
          },
        });

        const etikaBelajarIds = await prisma.etikaBelajar.findMany({
          select: {
            id: true,
          },
        });

        for (let i = 0; i < siswaIds.length; i++) {
          await prisma.sikapDanPerilaku.create({
            data: {
              id: randomUUID(),
              siswaId: siswaIds[i].id,
              semesterId: semesterIds[0].id,
              kelasId: kelasIds[i].id,
              kedisiplinanId: kedisiplinanIds[i].id,
              tanggungJawabId: tanggungJawabIds[i].id,
              adaptasiId: adaptasiIds[i].id,
              kerjaSamaId: kerjaSamaIds[i].id,
              etikaBelajarId: etikaBelajarIds[i].id,
            },
          });
        }
      }
    }

    console.log("Sikap dan Perilaku seeded");
  }
}
