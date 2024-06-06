import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
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
    const mapel = url.searchParams.get("key") ?? "";
    const nama = url.searchParams.get("nama") ?? "";

    if (verifyToken.role === "GURU") {
      const findSiswa = await prisma.siswa.findMany({
        where: {
          nama: nama,
        },
      });

      if (findSiswa.length === 0) {
        return NextResponse.json(
          { error: "Siswa Not Found!" },
          { status: 404 }
        );
      }

      const kehadiranSiswa = await prisma.kehadiran.findMany({
        where: {
          siswaId: findSiswa[0].id,
        },
      });

      if (kehadiranSiswa.length === 0) {
        return NextResponse.json(
          { error: "Kehadiran data Not Found!" },
          { status: 404 }
        );
      }

      let data: any = {};

      if (mapel === "Hadir") {
        if (kehadiranSiswa.length > 0) {
          data = {
            kehadiran: [
              { name: "0", value: 0 },
              { name: "Semester 1", value: kehadiranSiswa[0].hadir },
            ],
          };
        }
      } else if (mapel === "Izin") {
        if (kehadiranSiswa.length > 0) {
          data = {
            kehadiran: [
              { name: "0", value: 0 },
              { name: "Semester 1", value: kehadiranSiswa[0].izin },
            ],
          };
        }
      } else if (mapel === "Sakit") {
        if (kehadiranSiswa.length > 0) {
          data = {
            kehadiran: [
              { name: "0", value: 0 },
              { name: "Semester 1", value: kehadiranSiswa[0].sakit },
            ],
          };
        }
      } else if (mapel === "Alpa") {
        if (kehadiranSiswa.length > 0) {
          data = {
            kehadiran: [
              { name: "0", value: 0 },
              { name: "Semester 1", value: kehadiranSiswa[0].alpa },
            ],
          };
        }
      }

      if (Object.keys(data).length === 0) {
        return NextResponse.json(
          { error: "No data found for the given subject" },
          { status: 404 }
        );
      }

      return NextResponse.json({ data }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Unauthorized access!" },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
