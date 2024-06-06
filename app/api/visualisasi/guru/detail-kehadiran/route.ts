import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";
const GET = async (req: any) => {
  try {
    const token = req.headers.get("Authorization");
    if (!token) {
      return NextResponse.json(
        { message: "Authorization Failed!" },
        { status: 401 }
      );
    }

    const validToken = token.split(" ")[1];

    const verifyToken = jwt.verify(
      validToken,
      process.env.JWT_SECRET || ""
    ) as JwtPayload;

    const url = new URL(req.url);
    const nama = url.searchParams.get("nama") ?? "Siswa 1";

    if (verifyToken.role === "GURU") {
      const kehadiran = await prisma.kehadiran.findMany();

      const semester = await prisma.semester.findMany();

      if (!kehadiran) {
        return NextResponse.json(
          { error: "Nilai Not be Found!" },
          { status: 404 }
        );
      }

      const sumHadir = kehadiran.reduce((acc, curr) => acc + curr.hadir, 0);
      const sumIzin = kehadiran.reduce((acc, curr) => acc + curr.izin, 0);
      const sumSakit = kehadiran.reduce((acc, curr) => acc + curr.sakit, 0);
      const sumAlpa = kehadiran.reduce((acc, curr) => acc + curr.alpa, 0);

      if (!nama) {
        return NextResponse.json(
          { error: "Nama Siswa Not Found!" },
          { status: 404 }
        );
      }

      const findSiswa = await prisma.siswa.findFirst({
        where: {
          nama: nama,
        },
      });

      if (!findSiswa) {
        return NextResponse.json(
          { error: "Siswa Not Found!" },
          { status: 404 }
        );
      }

      const nilaiKehadiranSiswa = await prisma.kehadiran.findMany({
        where: {
          siswaId: findSiswa.id,
          semesterId: semester[0].id,
        },
      });

      return NextResponse.json(
        {
          data: {
            kelas: [
              {
                name: "Hadir",
                value: sumHadir,
              },
              {
                name: "Izin",
                value: sumIzin,
              },
              {
                name: "Sakit",
                value: sumSakit,
              },
              {
                name: "Alpa",
                value: sumAlpa,
              },
            ],
            siswa: [
              {
                name: "Hadir",
                value: nilaiKehadiranSiswa[0].hadir,
              },
              {
                name: "Izin",
                value: nilaiKehadiranSiswa[0].izin,
              },
              {
                name: "Sakit",
                value: nilaiKehadiranSiswa[0].sakit,
              },
              {
                name: "Alpa",
                value: nilaiKehadiranSiswa[0].alpa,
              },
            ],
          },
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export { GET };
