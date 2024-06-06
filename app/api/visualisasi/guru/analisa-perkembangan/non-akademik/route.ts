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
    const mapel = url.searchParams.get("mapel") ?? "";
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

      const mapelNonAkademik = await prisma.nonAkademik.findMany({
        where: {
          siswaId: findSiswa[0].id,
        },
      });

      if (mapelNonAkademik.length === 0) {
        return NextResponse.json(
          { error: "Non-Akademik data Not Found!" },
          { status: 404 }
        );
      }

      let data: any = {};

      if (mapel === "Olahraga") {
        const nilaiOlahraga = await prisma.olahraga.findMany({
          where: {
            id: mapelNonAkademik[0].olahragaId ?? "",
          },
        });

        if (nilaiOlahraga.length > 0) {
          data = {
            nonAkademik: [
              { name: "0", value: 0 },
              { name: "Uas", value: nilaiOlahraga[0].uas },
              { name: "Uts", value: nilaiOlahraga[0].uts },
              { name: "Tugas 1", value: nilaiOlahraga[0].tugas_1 },
              { name: "Tugas 2", value: nilaiOlahraga[0].tugas_2 },
            ],
          };
        }
      } else if (mapel === "Seni") {
        const nilaiSeni = await prisma.seni.findMany({
          where: {
            id: mapelNonAkademik[0].seniId ?? "",
          },
        });

        if (nilaiSeni.length > 0) {
          data = {
            nonAkademik: [
              { name: "0", value: 0 },
              { name: "Uas", value: nilaiSeni[0].uas },
              { name: "Uts", value: nilaiSeni[0].uts },
              { name: "Tugas 1", value: nilaiSeni[0].tugas_1 },
              { name: "Tugas 2", value: nilaiSeni[0].tugas_2 },
            ],
          };
        }
      } else if (mapel === "Olimpiade") {
        const nilaiOlimpiade = await prisma.olimpiade.findMany({
          where: {
            id: mapelNonAkademik[0].olimpiadeId ?? "",
          },
        });

        if (nilaiOlimpiade.length > 0) {
          data = {
            nonAkademik: [
              { name: "0", value: 0 },
              { name: "Uas", value: nilaiOlimpiade[0].uas },
              { name: "Uts", value: nilaiOlimpiade[0].uts },
              { name: "Tugas 1", value: nilaiOlimpiade[0].tugas_1 },
              { name: "Tugas 2", value: nilaiOlimpiade[0].tugas_2 },
            ],
          };
        }
      } else if (mapel === "Keterampilan") {
        const nilaiKeterampilan = await prisma.keterampilan.findMany({
          where: {
            id: mapelNonAkademik[0].keterampilanId ?? "",
          },
        });

        if (nilaiKeterampilan.length > 0) {
          data = {
            nonAkademik: [
              { name: "0", value: 0 },
              { name: "Uas", value: nilaiKeterampilan[0].uas },
              { name: "Uts", value: nilaiKeterampilan[0].uts },
              { name: "Tugas 1", value: nilaiKeterampilan[0].tugas_1 },
              { name: "Tugas 2", value: nilaiKeterampilan[0].tugas_2 },
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
