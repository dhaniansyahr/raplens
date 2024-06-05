import { PrismaClient } from "@prisma/client";
import { v4 as randomUUID } from "uuid";

const prisma = new PrismaClient();

export async function seedAkademik() {
  const countAkdemik = await prisma.akademik.count();

  const countMatematika = await prisma.matematika.count();
  const countBindo = await prisma.bahasaIndonesia.count();
  const countIpa = await prisma.ipa.count();
  const countIps = await prisma.ips.count();
  const countSeniBudaya = await prisma.seniBudaya.count();

  const countSemester = await prisma.semester.count();
  const countKelas = await prisma.kelas.count();
  const countSiswa = await prisma.siswa.count();

  if (
    countMatematika === 0 &&
    countBindo === 0 &&
    countIpa === 0 &&
    countIps === 0 &&
    countSeniBudaya === 0
  ) {
    if (countSemester !== 0) {
      const semesterIds = await prisma.semester.findMany({
        select: {
          id: true,
        },
      });

      await prisma.matematika.createMany({
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

      await prisma.bahasaIndonesia.createMany({
        data: [
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 78,
            uts: 82,
            tugas_1: 85,
            tugas_2: 87,
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 80,
            uts: 94,
            tugas_1: 75,
            tugas_2: 98,
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 90,
            uts: 89,
            tugas_1: 85,
            tugas_2: 80,
          },
        ],
      });

      await prisma.ipa.createMany({
        data: [
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 78,
            uts: 82,
            tugas_1: 85,
            tugas_2: 87,
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 80,
            uts: 94,
            tugas_1: 75,
            tugas_2: 98,
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 90,
            uts: 89,
            tugas_1: 85,
            tugas_2: 80,
          },
        ],
      });

      await prisma.ips.createMany({
        data: [
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 78,
            uts: 82,
            tugas_1: 85,
            tugas_2: 87,
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 80,
            uts: 94,
            tugas_1: 75,
            tugas_2: 98,
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 90,
            uts: 89,
            tugas_1: 85,
            tugas_2: 80,
          },
        ],
      });

      await prisma.seniBudaya.createMany({
        data: [
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 78,
            uts: 82,
            tugas_1: 85,
            tugas_2: 87,
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 80,
            uts: 94,
            tugas_1: 75,
            tugas_2: 98,
          },
          {
            id: randomUUID(),
            semesterId: semesterIds[0].id,
            uas: 90,
            uts: 89,
            tugas_1: 85,
            tugas_2: 80,
          },
        ],
      });

      if (countKelas !== 0 && countSiswa !== 0 && countAkdemik === 0) {
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

        const matematikaIds = await prisma.matematika.findMany({
          select: {
            id: true,
          },
        });

        const bahasaIndonesiaIds = await prisma.bahasaIndonesia.findMany({
          select: {
            id: true,
          },
        });

        const ipaIds = await prisma.ipa.findMany({
          select: {
            id: true,
          },
        });

        const ipsIds = await prisma.ips.findMany({
          select: {
            id: true,
          },
        });

        const seniBudayaIds = await prisma.seniBudaya.findMany({
          select: {
            id: true,
          },
        });

        await prisma.akademik.createMany({
          data: [
            {
              id: randomUUID(),
              siswaId: siswaIds[0].id,
              semesterId: semesterIds[0].id,
              matematikaId: matematikaIds[0].id,
              bahasaIndonesiaId: bahasaIndonesiaIds[0].id,
              ipaId: ipaIds[0].id,
              ipsId: ipsIds[0].id,
              seniBudayaId: seniBudayaIds[0].id,
              kelasId: kelasIds[0].id,
            },
            {
              id: randomUUID(),
              siswaId: siswaIds[1].id,
              semesterId: semesterIds[0].id,
              matematikaId: matematikaIds[1].id,
              bahasaIndonesiaId: bahasaIndonesiaIds[1].id,
              ipaId: ipaIds[1].id,
              ipsId: ipsIds[1].id,
              seniBudayaId: seniBudayaIds[1].id,
              kelasId: kelasIds[1].id,
            },
            {
              id: randomUUID(),
              siswaId: siswaIds[2].id,
              semesterId: semesterIds[0].id,
              matematikaId: matematikaIds[2].id,
              bahasaIndonesiaId: bahasaIndonesiaIds[2].id,
              ipaId: ipaIds[2].id,
              ipsId: ipsIds[2].id,
              seniBudayaId: seniBudayaIds[2].id,
              kelasId: kelasIds[2].id,
            },
          ],
        });
      }
    }

    console.log("Nilai Akademik Seeded and Successfully Associated");
  }
}
