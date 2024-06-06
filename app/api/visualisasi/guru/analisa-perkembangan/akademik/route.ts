import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";
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
      if (!nama) {
        return NextResponse.json(
          { error: "Nama is required!" },
          { status: 400 }
        );
      }

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

      const mapelAkademik = await prisma.akademik.findMany({
        where: {
          siswaId: findSiswa[0].id,
        },
      });

      let data: any = {};

      if (mapelAkademik.length > 0) {
        if (mapel === "Matematika") {
          const nilaiMatematika = await prisma.matematika.findMany({
            where: {
              id: mapelAkademik[0].matematikaId ?? "",
            },
          });

          if (nilaiMatematika.length > 0) {
            data = {
              akademik: [
                { name: "0", value: 0 },
                { name: "Uas", value: nilaiMatematika[0].uas },
                { name: "Uts", value: nilaiMatematika[0].uts },
                { name: "Tugas 1", value: nilaiMatematika[0].tugas_1 },
                { name: "Tugas 2", value: nilaiMatematika[0].tugas_2 },
              ],
            };
          }
        } else if (mapel === "Bahasa Indonesia") {
          const nilaiBahasaIndonesia = await prisma.bahasaIndonesia.findMany({
            where: {
              id: mapelAkademik[0].bahasaIndonesiaId ?? "",
            },
          });

          if (nilaiBahasaIndonesia.length > 0) {
            data = {
              akademik: [
                { name: "0", value: 0 },
                { name: "Uas", value: nilaiBahasaIndonesia[0].uas },
                { name: "Uts", value: nilaiBahasaIndonesia[0].uts },
                { name: "Tugas 1", value: nilaiBahasaIndonesia[0].tugas_1 },
                { name: "Tugas 2", value: nilaiBahasaIndonesia[0].tugas_2 },
              ],
            };
          }
        } else if (mapel === "IPA") {
          const nilaiIpa = await prisma.ipa.findMany({
            where: {
              id: mapelAkademik[0].ipaId ?? "",
            },
          });

          if (nilaiIpa.length > 0) {
            data = {
              akademik: [
                { name: "0", value: 0 },
                { name: "Uas", value: nilaiIpa[0].uas },
                { name: "Uts", value: nilaiIpa[0].uts },
                { name: "Tugas 1", value: nilaiIpa[0].tugas_1 },
                { name: "Tugas 2", value: nilaiIpa[0].tugas_2 },
              ],
            };
          }
        } else if (mapel === "IPS") {
          const nilaiIps = await prisma.ips.findMany({
            where: {
              id: mapelAkademik[0].ipsId ?? "",
            },
          });

          if (nilaiIps.length > 0) {
            data = {
              akademik: [
                { name: "0", value: 0 },
                { name: "Uas", value: nilaiIps[0].uas },
                { name: "Uts", value: nilaiIps[0].uts },
                { name: "Tugas 1", value: nilaiIps[0].tugas_1 },
                { name: "Tugas 2", value: nilaiIps[0].tugas_2 },
              ],
            };
          }
        } else if (mapel === "Seni Budaya") {
          const nilaiSeniBudaya = await prisma.seniBudaya.findMany({
            where: {
              id: mapelAkademik[0].seniBudayaId ?? "",
            },
          });

          if (nilaiSeniBudaya.length > 0) {
            data = {
              akademik: [
                { name: "0", value: 0 },
                { name: "Uas", value: nilaiSeniBudaya[0].uas },
                { name: "Uts", value: nilaiSeniBudaya[0].uts },
                { name: "Tugas 1", value: nilaiSeniBudaya[0].tugas_1 },
                { name: "Tugas 2", value: nilaiSeniBudaya[0].tugas_2 },
              ],
            };
          }
        }
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
