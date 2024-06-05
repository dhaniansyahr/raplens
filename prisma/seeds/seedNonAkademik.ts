import { PrismaClient } from "@prisma/client";
import { v4 as randomUUID } from "uuid";

const prisma = new PrismaClient();

export async function seedNonAkademik() {
  const countNonAkademik = await prisma.nonAkademik.count();

  const countOlahraga = await prisma.olahraga.count();
  const countSeni = await prisma.seni.count();
  const countOlimpiade = await prisma.olimpiade.count();
  const countKeterampilan = await prisma.keterampilan.count();

  const countSiswa = await prisma.siswa.count();
  const countKelas = await prisma.kelas.count();
  const countSemester = await prisma.semester.count();

  if (
    countOlahraga === 0 &&
    countSeni === 0 &&
    countOlimpiade === 0 &&
    countKeterampilan === 0
  ) {
    if (countSemester !== 0) {
      const semesterIds = await prisma.semester.findMany({
        select: {
          id: true,
        },
      });

      await prisma.olahraga.createMany({
        data: [
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 80,
            uts: 85,
            tugas_1: 90,
            tugas_2: 88,
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 90,
            uts: 80,
            tugas_1: 100,
            tugas_2: 90,
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 85,
            uts: 90,
            tugas_1: 90,
            tugas_2: 100,
          },
        ],
      });

      await prisma.seni.createMany({
        data: [
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 80,
            uts: 85,
            tugas_1: 90,
            tugas_2: 88,
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 90,
            uts: 80,
            tugas_1: 100,
            tugas_2: 90,
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 85,
            uts: 90,
            tugas_1: 90,
            tugas_2: 100,
          },
        ],
      });

      await prisma.olimpiade.createMany({
        data: [
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 80,
            uts: 85,
            tugas_1: 90,
            tugas_2: 88,
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 90,
            uts: 80,
            tugas_1: 100,
            tugas_2: 90,
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 85,
            uts: 90,
            tugas_1: 90,
            tugas_2: 100,
          },
        ],
      });

      await prisma.keterampilan.createMany({
        data: [
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 80,
            uts: 85,
            tugas_1: 90,
            tugas_2: 88,
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 90,
            uts: 80,
            tugas_1: 100,
            tugas_2: 90,
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 85,
            uts: 90,
            tugas_1: 90,
            tugas_2: 100,
          },
        ],
      });

      if (countKelas !== 0 && countSiswa !== 0) {
        const kelasIds = await prisma.kelas.findMany({
          select: {
            id: true,
          },
        });

        const siswaIds = await prisma.siswa.findMany({
          select: {
            id: true,
          },
        });

        const olahragaIds = await prisma.olahraga.findMany({
          select: {
            id: true,
          },
        });

        const seniIds = await prisma.seni.findMany({
          select: {
            id: true,
          },
        });

        const olimpiadeIds = await prisma.olimpiade.findMany({
          select: {
            id: true,
          },
        });

        const keterampilanIds = await prisma.keterampilan.findMany({
          select: {
            id: true,
          },
        });

        await prisma.nonAkademik.createMany({
          data: [
            {
              id: randomUUID(),
              siswaId: siswaIds[0].id,
              kelasId: kelasIds[0].id,
              olahragaId: olahragaIds[0].id,
              seniId: seniIds[0].id,
              olimpiadeId: olimpiadeIds[0].id,
              keterampilanId: keterampilanIds[0].id,
              semesterId: semesterIds[0].id,
            },
            {
              id: randomUUID(),
              siswaId: siswaIds[1].id,
              kelasId: kelasIds[1].id,
              olahragaId: olahragaIds[1].id,
              seniId: seniIds[1].id,
              olimpiadeId: olimpiadeIds[1].id,
              keterampilanId: keterampilanIds[1].id,
              semesterId: semesterIds[0].id,
            },
            {
              id: randomUUID(),
              siswaId: siswaIds[2].id,
              kelasId: kelasIds[2].id,
              olahragaId: olahragaIds[2].id,
              seniId: seniIds[2].id,
              olimpiadeId: olimpiadeIds[2].id,
              keterampilanId: keterampilanIds[2].id,
              semesterId: semesterIds[0].id,
            },
          ],
        });
      }
    }

    console.log("Seeded non-akademik");
  }
}
