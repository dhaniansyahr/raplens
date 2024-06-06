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

    if (verifyToken.role === "ORANG_TUA") {
      const semester = await prisma.semester.findMany();

      const findSiswa = await prisma.siswa.findFirst({
        where: {
          OR: [{ nama_ayah: verifyToken.name }, { nama_ibu: verifyToken.name }],
        },
      });

      if (!findSiswa) {
        return NextResponse.json(
          { error: "Siswa Not Found!" },
          { status: 404 }
        );
      }

      const sikapSiswaId = await prisma.sikapDanPerilaku.findMany({
        where: {
          siswaId: findSiswa.id,
          semesterId: semester[0].id,
        },
      });

      if (!sikapSiswaId) {
        return NextResponse.json(
          { error: "Sikap Not be Found!" },
          { status: 404 }
        );
      }

      const kedisiplinanSiswa = await prisma.kedisiplinan.findMany({
        where: {
          id: sikapSiswaId[0].kedisiplinanId ?? "",
        },
      });

      const tanggungJawabSiswa = await prisma.tanggungJawab.findMany({
        where: {
          id: sikapSiswaId[0].tanggungJawabId ?? "",
        },
      });

      const kerjasamaSiswa = await prisma.kerjaSama.findMany({
        where: {
          id: sikapSiswaId[0].kerjaSamaId ?? "",
        },
      });

      const adaptasiSiswa = await prisma.adaptasi.findMany({
        where: {
          id: sikapSiswaId[0].adaptasiId ?? "",
        },
      });

      const etikaBelajarSiswa = await prisma.etikaBelajar.findMany({
        where: {
          id: sikapSiswaId[0].etikaBelajarId ?? "",
        },
      });

      return NextResponse.json(
        {
          data: {
            kedisiplinan: [
              {
                name: "Kehadiran",
                value: kedisiplinanSiswa[0].kehadiran,
              },
              {
                name: "Kepatuhan",
                value: kedisiplinanSiswa[0].kepatuhan,
              },
              {
                name: "Kerapihan",
                value: kedisiplinanSiswa[0].kerapihan,
              },
              {
                name: "Keterlambatan",
                value: kedisiplinanSiswa[0].keterlambatan,
              },
            ],
            tanggungJawab: [
              {
                name: "Tugas",
                value: tanggungJawabSiswa[0].tugas,
              },
              {
                name: "Kebersihan",
                value: tanggungJawabSiswa[0].kebersihan,
              },
              {
                name: "Kepemimpinan",
                value: tanggungJawabSiswa[0].kepemimpinan,
              },
            ],
            kerjaSama: [
              {
                name: "Kerjasama",
                value: kerjasamaSiswa[0].kerjaSama,
              },
              {
                name: "Kerja Tim",
                value: kerjasamaSiswa[0].kerjaTim,
              },
              {
                name: "Komunikasi",
                value: kerjasamaSiswa[0].komunikasi,
              },
            ],
            adaptasi: [
              {
                name: "Kehadiran",
                value: kedisiplinanSiswa[0].kehadiran,
              },
              {
                name: "Kepatuhan",
                value: kedisiplinanSiswa[0].kepatuhan,
              },
              {
                name: "Kerapihan",
                value: kedisiplinanSiswa[0].kerapihan,
              },
              {
                name: "Keterlambatan",
                value: kedisiplinanSiswa[0].keterlambatan,
              },
            ],
            etikaBelajar: [
              {
                name: "Kerajinan",
                value: etikaBelajarSiswa[0].kerajinan,
              },
              {
                name: "Integrasi",
                value: etikaBelajarSiswa[0].integrasi,
              },
              {
                name: "Konsentrasi",
                value: etikaBelajarSiswa[0].konsentrasi,
              },
            ],
            notesGuru: {
              kedisiplinan: {
                catatan: kedisiplinanSiswa[0].catatan,
              },
              tanggungJawab: {
                catatan: tanggungJawabSiswa[0].catatan,
              },
              kerjaSama: {
                catatan: kerjasamaSiswa[0].catatan,
              },
              adaptasi: {
                catatan: adaptasiSiswa[0].catatan,
              },
              etikaBelajar: {
                catatan: etikaBelajarSiswa[0].catatan,
              },
            },
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
