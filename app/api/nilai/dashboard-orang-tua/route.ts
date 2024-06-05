import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

    const findSiswa = await prisma.siswa.findMany({
      where: {
        OR: [{ nama_ayah: verifyToken.name }, { nama_ibu: verifyToken.name }],
      },
    });

    if (!findSiswa || findSiswa.length === 0) {
      return NextResponse.json({ error: "Siswa Not Found!" }, { status: 404 });
    }

    const nilaiAkademik = await prisma.akademik.findMany({
      where: {
        siswaId: findSiswa[0].id,
      },
    });

    if (!nilaiAkademik || nilaiAkademik.length === 0) {
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

    if (!semester || semester.length === 0) {
      return NextResponse.json(
        { error: "Semester Not Found!" },
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
      !matematika.length ||
      !ipa.length ||
      !bahasaIndonesia.length ||
      !ips.length ||
      !seniBudaya.length
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

    const nonAkademikSiswaId = await prisma.nonAkademik.findMany({
      where: {
        siswaId: findSiswa[0].id,
        semesterId: semester[0].id,
      },
    });

    if (!nonAkademikSiswaId || nonAkademikSiswaId.length === 0) {
      return NextResponse.json(
        { error: "Nilai Not be Found!" },
        { status: 404 }
      );
    }

    const olahraga = await prisma.olahraga.findMany({
      where: {
        id: nonAkademikSiswaId[0]?.olahragaId ?? "",
        semesterId: semester[0].id,
      },
    });

    const seni = await prisma.seni.findMany({
      where: {
        id: nonAkademikSiswaId[0]?.seniId ?? "",
        semesterId: semester[0].id,
      },
    });

    const olimpiade = await prisma.olimpiade.findMany({
      where: {
        id: nonAkademikSiswaId[0]?.olimpiadeId ?? "",
        semesterId: semester[0].id,
      },
    });

    const keterampilan = await prisma.keterampilan.findMany({
      where: {
        id: nonAkademikSiswaId[0]?.keterampilanId ?? "",
        semesterId: semester[0].id,
      },
    });

    if (
      !olahraga.length ||
      !seni.length ||
      !olimpiade.length ||
      !keterampilan.length
    ) {
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
        4
      ).toFixed(2)
    );

    const kehadiran = await prisma.kehadiran.findMany({
      where: {
        siswaId: findSiswa[0].id,
        semesterId: semester[0].id,
      },
    });

    const findKelas = await prisma.kelas.findMany({
      where: {
        id: findSiswa[0].kelasId ?? "",
      },
    });

    return NextResponse.json(
      {
        data: {
          siswa: findSiswa[0],
          kelas: findKelas[0],
          akademik: [
            { name: "0", nilai: 0 },
            { name: "1", nilai: rataRataNilai },
          ],
          nonAkademik: [
            { name: "0", nilai: 0 },
            { name: "1", nilai: rataRataNonAkademik },
          ],
          kehadiran: [
            { name: "Hadir", value: kehadiran[0]?.hadir ?? 0 },
            { name: "Izin", value: kehadiran[0]?.izin ?? 0 },
            { name: "Sakit", value: kehadiran[0]?.sakit ?? 0 },
            { name: "Alpa", value: kehadiran[0]?.alpa ?? 0 },
          ],
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export { GET };
