import { PrismaClient } from "@prisma/client";
import { v4 as randomUUID } from "uuid";

const prisma = new PrismaClient();

export async function seedKehadiran() {
  const countKehadiran = await prisma.kehadiran.count();

  if (countKehadiran === 0) {
    const kelasIds = await prisma.kelas.findMany({
      select: { id: true },
    });

    const semesterIds = await prisma.semester.findMany({
      select: {
        id: true,
      },
    });

    const siswaIds = await prisma.siswa.findMany({
      select: {
        id: true,
      },
    });

    await prisma.kehadiran.createMany({
      data: [
        {
          id: randomUUID(),
          siswaId: siswaIds[0].id,
          kelasId: kelasIds[0].id,
          semesterId: semesterIds[0].id,
          hadir: 10,
          sakit: 2,
          izin: 1,
          alpa: 0,
        },
        {
          id: randomUUID(),
          siswaId: siswaIds[1].id,
          kelasId: kelasIds[0].id,
          semesterId: semesterIds[0].id,
          hadir: 9,
          sakit: 1,
          izin: 2,
          alpa: 1,
        },
        {
          id: randomUUID(),
          siswaId: siswaIds[2].id,
          kelasId: kelasIds[0].id,
          semesterId: semesterIds[0].id,
          hadir: 11,
          sakit: 1,
          izin: 1,
          alpa: 0,
        },
      ],
    });

    console.log("Kehadiran seeded");
  }
}
