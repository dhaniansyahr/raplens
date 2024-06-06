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
      const matematika = await prisma.matematika.findMany();
      const ipa = await prisma.ipa.findMany();
      const bahasa_indonesia = await prisma.bahasaIndonesia.findMany();
      const ips = await prisma.ips.findMany();
      const seni_budaya = await prisma.seniBudaya.findMany();

      const semester = await prisma.semester.findMany();

      if (!matematika || !ipa || !bahasa_indonesia || !ips || !seni_budaya) {
        return NextResponse.json(
          { error: "Nilai Not be Found!" },
          { status: 404 }
        );
      }

      const mtkUas = parseInt(
        (
          matematika.reduce((acc, curr) => acc + curr.uas, 0) /
          matematika.length
        ).toFixed(2)
      );

      const mtkUts = parseInt(
        (
          matematika.reduce((acc, curr) => acc + curr.uts, 0) /
          matematika.length
        ).toFixed(2)
      );

      const mtkTUgas1 = parseInt(
        (
          matematika.reduce((acc, curr) => acc + curr.tugas_1, 0) /
          matematika.length
        ).toFixed(2)
      );

      const mtkTUgas2 = parseInt(
        (
          matematika.reduce((acc, curr) => acc + curr.tugas_2, 0) /
          matematika.length
        ).toFixed(2)
      );

      const ipaUas = parseInt(
        (ipa.reduce((acc, curr) => acc + curr.uas, 0) / ipa.length).toFixed(2)
      );

      const ipaUts = parseInt(
        (ipa.reduce((acc, curr) => acc + curr.uts, 0) / ipa.length).toFixed(2)
      );

      const ipaTUgas1 = parseInt(
        (ipa.reduce((acc, curr) => acc + curr.tugas_1, 0) / ipa.length).toFixed(
          2
        )
      );

      const ipaTUgas2 = parseInt(
        (ipa.reduce((acc, curr) => acc + curr.tugas_2, 0) / ipa.length).toFixed(
          2
        )
      );

      const bindoUas = parseInt(
        (
          bahasa_indonesia.reduce((acc, curr) => acc + curr.uas, 0) /
          bahasa_indonesia.length
        ).toFixed(2)
      );

      const bindoUts = parseInt(
        (
          bahasa_indonesia.reduce((acc, curr) => acc + curr.uts, 0) /
          bahasa_indonesia.length
        ).toFixed(2)
      );

      const bindoTUgas1 = parseInt(
        (
          bahasa_indonesia.reduce((acc, curr) => acc + curr.tugas_1, 0) /
          bahasa_indonesia.length
        ).toFixed(2)
      );

      const bindoTUgas2 = parseInt(
        (
          bahasa_indonesia.reduce((acc, curr) => acc + curr.tugas_2, 0) /
          bahasa_indonesia.length
        ).toFixed(2)
      );

      const ipsUas = parseInt(
        (ips.reduce((acc, curr) => acc + curr.uas, 0) / ips.length).toFixed(2)
      );

      const ipsUts = parseInt(
        (ips.reduce((acc, curr) => acc + curr.uts, 0) / ips.length).toFixed(2)
      );

      const ipsTUgas1 = parseInt(
        (ips.reduce((acc, curr) => acc + curr.tugas_1, 0) / ips.length).toFixed(
          2
        )
      );

      const ipsTUgas2 = parseInt(
        (ips.reduce((acc, curr) => acc + curr.tugas_2, 0) / ips.length).toFixed(
          2
        )
      );

      const seniBudayaUas = parseInt(
        (
          seni_budaya.reduce((acc, curr) => acc + curr.uas, 0) /
          seni_budaya.length
        ).toFixed(2)
      );

      const seniBudayaUts = parseInt(
        (
          seni_budaya.reduce((acc, curr) => acc + curr.uts, 0) /
          seni_budaya.length
        ).toFixed(2)
      );

      const seniBudayaTUgas1 = parseInt(
        (
          seni_budaya.reduce((acc, curr) => acc + curr.tugas_1, 0) /
          seni_budaya.length
        ).toFixed(2)
      );

      const seniBudayaTUgas2 = parseInt(
        (
          seni_budaya.reduce((acc, curr) => acc + curr.tugas_2, 0) /
          seni_budaya.length
        ).toFixed(2)
      );

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

      const akademikSiswaId = await prisma.akademik.findMany({
        where: {
          siswaId: findSiswa.id,
          semesterId: semester[0].id,
        },
      });

      const nilaiMtk = await prisma.matematika.findMany({
        where: {
          id: akademikSiswaId[0].matematikaId ?? "",
        },
      });

      const nilaiIpa = await prisma.ipa.findMany({
        where: {
          id: akademikSiswaId[0].ipaId ?? "",
        },
      });

      const nilaiBahasaIndonesia = await prisma.bahasaIndonesia.findMany({
        where: {
          id: akademikSiswaId[0].bahasaIndonesiaId ?? "",
        },
      });

      const nilaiIps = await prisma.ips.findMany({
        where: {
          id: akademikSiswaId[0].ipsId ?? "",
        },
      });

      const nilaiSeniBudaya = await prisma.seniBudaya.findMany({
        where: {
          id: akademikSiswaId[0].seniBudayaId ?? "",
        },
      });

      return NextResponse.json(
        {
          data: {
            matematika: [
              {
                name: "0",
                kelas: 0,
                siswa: 0,
              },
              {
                name: "uas",
                kelas: mtkUas,
                siswa: nilaiMtk[0].uas,
              },
              {
                name: "uts",
                kelas: mtkUts,
                siswa: nilaiMtk[0].uts,
              },
              {
                name: "tugas_1",
                kelas: mtkTUgas1,
                siswa: nilaiMtk[0].tugas_1,
              },
              {
                name: "tugas_2",
                kelas: mtkTUgas2,
                siswa: nilaiMtk[0].tugas_2,
              },
            ],
            ipa: [
              {
                name: "0",
                kelas: 0,
                siswa: 0,
              },
              {
                name: "uas",
                kelas: ipaUas,
                siswa: nilaiIpa[0].uas,
              },
              {
                name: "uts",
                kelas: ipaUts,
                siswa: nilaiIpa[0].uts,
              },
              {
                name: "tugas_1",
                kelas: ipaTUgas1,
                siswa: nilaiIpa[0].tugas_1,
              },
              {
                name: "tugas_2",
                kelas: ipaTUgas2,
                siswa: nilaiIpa[0].tugas_2,
              },
            ],
            bahasa_indonesia: [
              {
                name: "0",
                kelas: 0,
                siswa: 0,
              },
              {
                name: "uas",
                kelas: bindoUas,
                siswa: nilaiBahasaIndonesia[0].uas,
              },
              {
                name: "uts",
                kelas: bindoUts,
                siswa: nilaiBahasaIndonesia[0].uts,
              },
              {
                name: "tugas_1",
                kelas: bindoTUgas1,
                siswa: nilaiBahasaIndonesia[0].tugas_1,
              },
              {
                name: "tugas_2",
                kelas: bindoTUgas2,
                siswa: nilaiBahasaIndonesia[0].tugas_2,
              },
            ],
            ips: [
              {
                name: "0",
                kelas: 0,
                siswa: 0,
              },
              {
                name: "uas",
                kelas: ipsUas,
                siswa: nilaiIps[0].uas,
              },
              {
                name: "uts",
                kelas: ipsUts,
                siswa: nilaiIps[0].uts,
              },
              {
                name: "tugas_1",
                kelas: ipsTUgas1,
                siswa: nilaiIps[0].tugas_1,
              },
              {
                name: "tugas_2",
                kelas: ipsTUgas2,
                siswa: nilaiIps[0].tugas_2,
              },
            ],
            seni_budaya: [
              {
                name: "0",
                kelas: 0,
                siswa: 0,
              },
              {
                name: "uas",
                kelas: seniBudayaUas,
                siswa: nilaiSeniBudaya[0].uas,
              },
              {
                name: "uts",
                kelas: seniBudayaUts,
                siswa: nilaiSeniBudaya[0].uts,
              },
              {
                name: "tugas_1",
                kelas: seniBudayaTUgas1,
                siswa: nilaiSeniBudaya[0].tugas_1,
              },
              {
                name: "tugas_2",
                kelas: seniBudayaTUgas2,
                siswa: nilaiSeniBudaya[0].tugas_2,
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
