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
      const findSiswa = await prisma.siswa.findMany({
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

      const nilaiAkademik = await prisma.akademik.findMany({
        where: {
          siswaId: findSiswa[0].id,
        },
      });

      if (!nilaiAkademik) {
        return NextResponse.json(
          { error: "Nilai Not be Found!" },
          { status: 404 }
        );
      }

      const semester = await prisma.semester.findMany({
        where: {
          id: findSiswa[0].semesterId ?? "",
        },
      });

      if (!semester) {
        return NextResponse.json(
          { error: "Semester Not Found!" },
          { status: 404 }
        );
      }

      const nonAkademik = await prisma.nonAkademik.findMany({
        where: {
          id: findSiswa[0].id,
          semesterId: semester[0].id,
        },
      });

      if (!nonAkademik) {
        return NextResponse.json(
          { error: "Nilai Not be Found!" },
          { status: 404 }
        );
      }

      const matematika = await prisma.matematika.findMany({
        where: {
          id: nilaiAkademik[0].matematikaId ?? "",
          semesterId: semester[0].id,
        },
      });

      const ipa = await prisma.ipa.findMany({
        where: {
          id: nilaiAkademik[0].ipaId ?? "",
          semesterId: semester[0].id,
        },
      });

      const bahasaIndonesia = await prisma.bahasaIndonesia.findMany({
        where: {
          id: nilaiAkademik[0].bahasaIndonesiaId ?? "",
          semesterId: semester[0].id,
        },
      });

      const ips = await prisma.ips.findMany({
        where: {
          id: nilaiAkademik[0].ipsId ?? "",
          semesterId: semester[0].id,
        },
      });

      const seniBudaya = await prisma.seniBudaya.findMany({
        where: {
          id: nilaiAkademik[0].seniBudayaId ?? "",
          semesterId: semester[0].id,
        },
      });

      if (
        !matematika ||
        !ipa ||
        !bahasaIndonesia ||
        !ips ||
        !seniBudaya ||
        !nonAkademik
      ) {
        return NextResponse.json(
          { error: "Nilai Not be Found!" },
          { status: 404 }
        );
      }

      const rataRataNilai = parseInt(
        (
          (matematika[0].uas +
            ipa[0].uas +
            bahasaIndonesia[0].uas +
            ips[0].uas +
            seniBudaya[0].uas) /
          5
        ).toFixed(2)
      );

      const olahraga = await prisma.olahraga.findMany({
        where: {
          id: nonAkademik[0].olahragaId ?? "",
          semesterId: semester[0].id,
        },
      });

      const seni = await prisma.seni.findMany({
        where: {
          id: nonAkademik[0].seniId ?? "",
          semesterId: semester[0].id,
        },
      });

      const olimpiade = await prisma.olimpiade.findMany({
        where: {
          id: nonAkademik[0].olimpiadeId ?? "",
          semesterId: semester[0].id,
        },
      });

      const keterampilan = await prisma.keterampilan.findMany({
        where: {
          id: nonAkademik[0].keterampilanId ?? "",
          semesterId: semester[0].id,
        },
      });

      if (!seni || !olimpiade || !keterampilan) {
        return NextResponse.json(
          { error: "Nilai Not be Found!" },
          { status: 404 }
        );
      }

      const rataRataNonAkademik = parseInt(
        (
          (olahraga[0].uas +
            seni[0].uas +
            olimpiade[0].uas +
            keterampilan[0].uas) /
          3
        ).toFixed(2)
      );

      const kehadiran = await prisma.kehadiran.findMany({
        where: {
          id: findSiswa[0].id,
          semesterId: semester[0].id,
        },
      });

      return NextResponse.json(
        {
          data: {
            siswa: findSiswa[0],
            akademik: [
              { name: "0", nilai: 0 },
              { name: "1", nilai: rataRataNilai },
            ],
            nonAkademik: [
              { name: "0", nilai: 0 },
              { name: "1", nilai: rataRataNonAkademik },
            ],
            kehadiran: [
              { name: "Hadir", value: kehadiran[0].hadir },
              { name: "Izin", value: kehadiran[0].izin },
              { name: "Sakit", value: kehadiran[0].sakit },
              { name: "Alpa", value: kehadiran[0].alpa },
            ],
          },
        },
        { status: 200 }
      );
    }

    if (verifyToken.role === "GURU") {
      const matematika = await prisma.matematika.findMany();
      const ipa = await prisma.ipa.findMany();
      const bahasa_indonesia = await prisma.bahasaIndonesia.findMany();
      const ips = await prisma.ips.findMany();
      const seni_budaya = await prisma.seniBudaya.findMany();

      if (!matematika || !ipa || !bahasa_indonesia || !ips || !seni_budaya) {
        return NextResponse.json(
          { error: "Nilai Not be Found!" },
          { status: 404 }
        );
      }

      const rataRataMatematika = parseInt(
        (
          matematika.reduce((acc, curr) => acc + curr.uas, 0) /
          matematika.length
        ).toFixed(2)
      );
      const rataRataIpa = parseInt(
        (ipa.reduce((acc, curr) => acc + curr.uas, 0) / ipa.length).toFixed(2)
      );
      const rataRataBahasaIndonesia = parseInt(
        (
          bahasa_indonesia.reduce((acc, curr) => acc + curr.uas, 0) /
          bahasa_indonesia.length
        ).toFixed(2)
      );
      const rataRataIps = parseInt(
        (ips.reduce((acc, curr) => acc + curr.uas, 0) / ips.length).toFixed(2)
      );
      const rataRataSeniBudaya = parseInt(
        (
          seni_budaya.reduce((acc, curr) => acc + curr.uas, 0) /
          seni_budaya.length
        ).toFixed(2)
      );

      return NextResponse.json(
        {
          data: [
            {
              name: "Meatmatika",
              nilai: rataRataMatematika,
            },
            {
              name: "IPA",
              nilai: rataRataIpa,
            },
            {
              name: "Bahasa Indonesia",
              nilai: rataRataBahasaIndonesia,
            },
            {
              name: "IPS",
              nilai: rataRataIps,
            },
            {
              name: "Seni Budaya",
              nilai: rataRataSeniBudaya,
            },
          ],
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
