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

      const sikapDanPerilaku = await prisma.sikapDanPerilaku.findMany({
        where: {
          siswaId: findSiswa[0].id,
        },
      });

      if (sikapDanPerilaku.length === 0) {
        return NextResponse.json(
          { error: "Sikap dan Perilaku data Not Found!" },
          { status: 404 }
        );
      }

      let data: any = {};

      if (mapel === "Kedisiplinan") {
        const kedisiplinan = await prisma.kedisiplinan.findMany({
          where: {
            id: sikapDanPerilaku[0].kedisiplinanId ?? "",
          },
        });

        if (kedisiplinan.length > 0) {
          data = {
            sikap: [
              { name: "0", value: 0 },
              { name: "Kehadiran", value: kedisiplinan[0].kehadiran },
              { name: "Keterlambatan", value: kedisiplinan[0].keterlambatan },
              { name: "Kepatuahan", value: kedisiplinan[0].kepatuhan },
              { name: "Kerapihan", value: kedisiplinan[0].kerapihan },
            ],
          };
        }
      } else if (mapel === "Tanggung Jawab") {
        const tanggungJawab = await prisma.tanggungJawab.findMany({
          where: {
            id: sikapDanPerilaku[0].tanggungJawabId ?? "",
          },
        });

        if (tanggungJawab.length > 0) {
          data = {
            sikap: [
              { name: "0", value: 0 },
              { name: "Tugas", value: tanggungJawab[0].tugas },
              { name: "Kebersihan", value: tanggungJawab[0].kebersihan },
              { name: "Kepemimpinan", value: tanggungJawab[0].kepemimpinan },
            ],
          };
        }
      } else if (mapel === "Adaptasi") {
        const adaptasi = await prisma.adaptasi.findMany({
          where: {
            id: sikapDanPerilaku[0].adaptasiId ?? "",
          },
        });

        if (adaptasi.length > 0) {
          data = {
            sikap: [
              { name: "0", value: 0 },
              { name: "Kehadiran", value: adaptasi[0].kehadiran },
              { name: "Keterlambatan", value: adaptasi[0].keterlambatan },
              { name: "Kepatuahan", value: adaptasi[0].kepatuhan },
              { name: "Kerapihan", value: adaptasi[0].kerapihan },
            ],
          };
        }
      } else if (mapel === "Kerja Sama") {
        const kerjaSama = await prisma.kerjaSama.findMany({
          where: {
            id: sikapDanPerilaku[0].kerjaSamaId ?? "",
          },
        });

        if (kerjaSama.length > 0) {
          data = {
            sikap: [
              { name: "0", value: 0 },
              { name: "Kerja Tim", value: kerjaSama[0].kerjaTim },
              { name: "Kerja Sama", value: kerjaSama[0].kerjaSama },
              { name: "Komunikasi", value: kerjaSama[0].komunikasi },
            ],
          };
        }
      } else if (mapel === "Etika Belajar") {
        const etikaBelajar = await prisma.etikaBelajar.findMany({
          where: {
            id: sikapDanPerilaku[0].etikaBelajarId ?? "",
          },
        });

        if (etikaBelajar.length > 0) {
          data = {
            sikap: [
              { name: "0", value: 0 },
              { name: "Kerajinan", value: etikaBelajar[0].kerajinan },
              { name: "Integrasi", value: etikaBelajar[0].integrasi },
              { name: "Konsentrasi", value: etikaBelajar[0].konsentrasi },
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
