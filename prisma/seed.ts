import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as randomUUID } from "uuid";
import { seedKelas } from "./seeds/seedKelas";
import { seedSemester } from "./seeds/seedSemester";
import { seedAkademik } from "./seeds/seedAkademik";
import { seedNonAkademik } from "./seeds/seedNonAkademik";
import { seedKehadiran } from "./seeds/seedKehadiran";
import { seedSikap } from "./seeds/seedSikap";

const prisma = new PrismaClient();

async function seedsUser() {
  const countOrangtua = await prisma.user.count({
    where: {
      role: "ORANG_TUA",
    },
  });

  if (countOrangtua === 0) {
    const hashPassword = await bcrypt.hash("orangtua1234", 12);
    await prisma.user.create({
      data: {
        id: randomUUID(),
        email: "orangtua@gmail.com",
        password: hashPassword,
        role: "ORANG_TUA",
        name: "Budi",
      },
    });

    console.log("User ORANG_TUA seeded");
  }

  const countGuru = await prisma.user.count({
    where: {
      role: "GURU",
    },
  });

  if (countGuru === 0) {
    const hashPassword = await bcrypt.hash("guru1234", 12);
    await prisma.user.create({
      data: {
        id: randomUUID(),
        email: "guru@gmail.com",
        password: hashPassword,
        role: "GURU",
        name: "Omar Bakrie",
      },
    });
  }

  console.log("User GURU seeded");
}

async function seedsSiswa() {
  const countSiswa = await prisma.siswa.count();
  const kelas = await prisma.kelas.findMany();
  const semester = await prisma.semester.findMany();

  if (countSiswa === 0) {
    await prisma.siswa.createMany({
      data: [
        {
          id: randomUUID(),
          nama: "Siswa 1",
          nisn: "1234567890",
          nis: "1234",
          tempat_lahir: "Jakarta",
          tanggal_lahir: "2000-01-01",
          alamat: "Jl. Jalan",
          agama: "Islam",
          nama_ayah: "Budi",
          nama_ibu: "Siti",
          pekerjaan_ayah: "PNS",
          pekerjaan_ibu: "Guru",
          jenis_kelamin: "Laki-laki",
          kelasId: kelas[0].id,
          semesterId: semester[0].id,
        },
        {
          id: randomUUID(),
          nama: "Siswa 2",
          nisn: "0987654321",
          nis: "4321",
          tempat_lahir: "Bandung",
          tanggal_lahir: "2000-01-02",
          alamat: "Jl. Jalan",
          agama: "Islam",
          nama_ayah: "Ahmad",
          nama_ibu: "Putri",
          pekerjaan_ayah: "PNS",
          pekerjaan_ibu: "Guru",
          jenis_kelamin: "Perempuan",
          kelasId: kelas[1].id,
          semesterId: semester[0].id,
        },
        {
          id: randomUUID(),
          nama: "Siswa 3",
          nisn: "1122334455",
          nis: "5555",
          tempat_lahir: "Surabaya",
          tanggal_lahir: "2000-01-03",
          alamat: "Jl. Jalan",
          agama: "Islam",
          nama_ayah: "Joko",
          nama_ibu: "Sari",
          pekerjaan_ayah: "PNS",
          pekerjaan_ibu: "Guru",
          jenis_kelamin: "Laki-laki",
          kelasId: kelas[2].id,
          semesterId: semester[0].id,
        },
      ],
    });
  }

  console.log("Siswa seeded and associated with Kelas and Semester");
}

async function main() {
  await seedKelas();
  await seedSemester();
  await seedsUser();
  await seedsSiswa();
  await seedAkademik();
  await seedNonAkademik();
  await seedKehadiran();
  await seedSikap();
}

main().then(() => {
  console.log("Seeding complete");
});
