import { PrismaClient } from "@prisma/client";
import { v4 as randomUUID } from "uuid";

const prisma = new PrismaClient();

export async function seedKelas() {
  const countKelas = await prisma.kelas.count();

  if (countKelas === 0) {
    await prisma.kelas.createMany({
      data: [
        {
          id: randomUUID(),
          name: "VII A",
        },
        {
          id: randomUUID(),
          name: "VII B",
        },
        {
          id: randomUUID(),
          name: "VII C",
        },
        {
          id: randomUUID(),
          name: "VIII A",
        },
        {
          id: randomUUID(),
          name: "VIII B",
        },
        {
          id: randomUUID(),
          name: "VIII C",
        },
        {
          id: randomUUID(),
          name: "IX A",
        },
        {
          id: randomUUID(),
          name: "IX B",
        },
        {
          id: randomUUID(),
          name: "IX C",
        },
      ],
    });
  }

  console.log("Kelas seeded and associated with Siswa");
}
