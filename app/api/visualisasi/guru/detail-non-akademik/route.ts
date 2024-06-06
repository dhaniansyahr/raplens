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
      const olahraga = await prisma.olahraga.findMany();
      const seni = await prisma.seni.findMany();
      const olimpiade = await prisma.olimpiade.findMany();
      const keterampilan = await prisma.keterampilan.findMany();

      const semester = await prisma.semester.findMany();

      if (!olahraga || !seni || !olimpiade || !keterampilan) {
        return NextResponse.json(
          { error: "Nilai Not be Found!" },
          { status: 404 }
        );
      }

      const olahragaUas = parseInt(
        (
          olahraga.reduce((acc, curr) => acc + curr.uas, 0) / olahraga.length
        ).toFixed(2)
      );

      const olahragaUts = parseInt(
        (
          olahraga.reduce((acc, curr) => acc + curr.uts, 0) / olahraga.length
        ).toFixed(2)
      );

      const olahragaTugas1 = parseInt(
        (
          olahraga.reduce((acc, curr) => acc + curr.tugas_1, 0) /
          olahraga.length
        ).toFixed(2)
      );

      const olahragaTugas2 = parseInt(
        (
          olahraga.reduce((acc, curr) => acc + curr.tugas_2, 0) /
          olahraga.length
        ).toFixed(2)
      );

      const seniUas = parseInt(
        (seni.reduce((acc, curr) => acc + curr.uas, 0) / seni.length).toFixed(2)
      );

      const seniUts = parseInt(
        (seni.reduce((acc, curr) => acc + curr.uts, 0) / seni.length).toFixed(2)
      );

      const seniTugas1 = parseInt(
        (
          seni.reduce((acc, curr) => acc + curr.tugas_1, 0) / seni.length
        ).toFixed(2)
      );

      const seniTugas2 = parseInt(
        (
          seni.reduce((acc, curr) => acc + curr.tugas_2, 0) / seni.length
        ).toFixed(2)
      );

      const olimpiadeUas = parseInt(
        (
          olimpiade.reduce((acc, curr) => acc + curr.uas, 0) / olimpiade.length
        ).toFixed(2)
      );

      const olimpiadeUts = parseInt(
        (
          olimpiade.reduce((acc, curr) => acc + curr.uts, 0) / olimpiade.length
        ).toFixed(2)
      );

      const olimpiadeTugas1 = parseInt(
        (
          olimpiade.reduce((acc, curr) => acc + curr.tugas_1, 0) /
          olimpiade.length
        ).toFixed(2)
      );

      const olimpiadeTugas2 = parseInt(
        (
          olimpiade.reduce((acc, curr) => acc + curr.tugas_2, 0) /
          olimpiade.length
        ).toFixed(2)
      );

      const keterampilanUas = parseInt(
        (
          keterampilan.reduce((acc, curr) => acc + curr.uas, 0) /
          keterampilan.length
        ).toFixed(2)
      );

      const keterampilanUts = parseInt(
        (
          keterampilan.reduce((acc, curr) => acc + curr.uts, 0) /
          keterampilan.length
        ).toFixed(2)
      );

      const keterampilanTugas1 = parseInt(
        (
          keterampilan.reduce((acc, curr) => acc + curr.tugas_1, 0) /
          keterampilan.length
        ).toFixed(2)
      );

      const keterampilanTugas2 = parseInt(
        (
          keterampilan.reduce((acc, curr) => acc + curr.tugas_2, 0) /
          keterampilan.length
        ).toFixed(2)
      );

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

      const nonAkademikSiswaId = await prisma.nonAkademik.findMany({
        where: {
          siswaId: findSiswa.id,
          semesterId: semester[0].id,
        },
      });

      const nilaiOlahragaSiswa = await prisma.olahraga.findMany({
        where: {
          id: nonAkademikSiswaId[0].olahragaId ?? "",
        },
      });

      const nilaiSeniSiswa = await prisma.seni.findMany({
        where: {
          id: nonAkademikSiswaId[0].seniId ?? "",
        },
      });

      const nilaiOlimpiadeSiswa = await prisma.olimpiade.findMany({
        where: {
          id: nonAkademikSiswaId[0].olimpiadeId ?? "",
        },
      });

      const nilaiKeterampilanSiswa = await prisma.keterampilan.findMany({
        where: {
          id: nonAkademikSiswaId[0].keterampilanId ?? "",
        },
      });

      return NextResponse.json(
        {
          data: {
            olahraga: [
              {
                name: "Uas",
                kelas: olahragaUas,
                siswa: nilaiOlahragaSiswa[0].uas,
              },
              {
                name: "Uts",
                kelas: olahragaUts,
                siswa: nilaiOlahragaSiswa[0].uts,
              },
              {
                name: "Tugas 1",
                kelas: olahragaTugas1,
                siswa: nilaiOlahragaSiswa[0].tugas_1,
              },
              {
                name: "Tugas 2",
                kelas: olahragaTugas2,
                siswa: nilaiOlahragaSiswa[0].tugas_2,
              },
            ],
            seni: [
              {
                name: "Uas",
                kelas: seniUas,
                siswa: nilaiSeniSiswa[0].uas,
              },
              {
                name: "Uts",
                kelas: seniUts,
                siswa: nilaiSeniSiswa[0].uts,
              },
              {
                name: "Tugas 1",
                kelas: seniTugas1,
                siswa: nilaiSeniSiswa[0].tugas_1,
              },
              {
                name: "Tugas 2",
                kelas: seniTugas2,
                siswa: nilaiSeniSiswa[0].tugas_2,
              },
            ],
            olimpiade: [
              {
                name: "Uas",
                kelas: olimpiadeUas,
                siswa: nilaiOlimpiadeSiswa[0].uas,
              },
              {
                name: "Uts",
                kelas: olimpiadeUts,
                siswa: nilaiOlimpiadeSiswa[0].uts,
              },
              {
                name: "Tugas 1",
                kelas: olimpiadeTugas1,
                siswa: nilaiOlimpiadeSiswa[0].tugas_1,
              },
              {
                name: "Tugas 2",
                kelas: olimpiadeTugas2,
                siswa: nilaiOlimpiadeSiswa[0].tugas_2,
              },
            ],
            keterampilan: [
              {
                name: "Uas",
                kelas: keterampilanUas,
                siswa: nilaiKeterampilanSiswa[0].uas,
              },
              {
                name: "Uts",
                kelas: keterampilanUts,
                siswa: nilaiKeterampilanSiswa[0].uts,
              },
              {
                name: "Tugas 1",
                kelas: keterampilanTugas1,
                siswa: nilaiKeterampilanSiswa[0].tugas_1,
              },
              {
                name: "Tugas 2",
                kelas: keterampilanTugas2,
                siswa: nilaiKeterampilanSiswa[0].tugas_2,
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
