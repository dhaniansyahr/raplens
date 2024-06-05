import { PrismaClient } from "@prisma/client";
import { v4 as randomUUID } from "uuid";

const prisma = new PrismaClient();

export async function seedSemester() {
  const countSemester = await prisma.semester.count();
  const countSiswa = await prisma.siswa.count();

  if (countSemester === 0) {
    await prisma.semester.createMany({
      data: [
        {
          id: randomUUID(),
          name: "Semester 1",
        },
        {
          id: randomUUID(),
          name: "Semester 2",
        },
      ],
    });
  }

  console.log("Semester seeded and associated with Siswa");
}
