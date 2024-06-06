import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { v4 as randomUUID } from "uuid";

const prisma = new PrismaClient();

// Post Method
const POST = async (req: any) => {
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

    const data: any = await req.json();
    const url = new URL(req.url);
    const nama = url.searchParams.get("nama");

    if (verifyToken.role === "GURU") {
      if (!nama) {
        return NextResponse.json(
          { error: "Missing nama parameter" },
          { status: 400 }
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

      const matematika = await prisma.matematika.create({
        data: {
          id: randomUUID(),
          semesterId: data.semesterid,
          uas: data.matematika.uas,
          uts: data.matematika.uts,
          tugas_1: data.matematika.tugas1,
          tugas_2: data.matematika.tugas2,
        },
      });

      const bahasa_indonesia = await prisma.bahasaIndonesia.create({
        data: {
          id: randomUUID(),
          semesterId: data.semesterid,
          uas: data.bahasaIndonesia.uas,
          uts: data.bahasaIndonesia.uts,
          tugas_1: data.bahasaIndonesia.tugas1,
          tugas_2: data.bahasaIndonesia.tugas2,
        },
      });

      const ipa = await prisma.ipa.create({
        data: {
          id: randomUUID(),
          semesterId: data.semesterid,
          uas: data.ipa.uas,
          uts: data.ipa.uts,
          tugas_1: data.ipa.tugas1,
          tugas_2: data.ipa.tugas2,
        },
      });

      const ips = await prisma.ips.create({
        data: {
          id: randomUUID(),
          semesterId: data.semesterid,
          uas: data.ips.uas,
          uts: data.ips.uts,
          tugas_1: data.ips.tugas1,
          tugas_2: data.ips.tugas2,
        },
      });

      const seni_budaya = await prisma.seniBudaya.create({
        data: {
          id: randomUUID(),
          semesterId: data.semesterid,
          uas: data.kesenian.uas,
          uts: data.kesenian.uts,
          tugas_1: data.kesenian.tugas1,
          tugas_2: data.kesenian.tugas2,
        },
      });

      const nilaiAkademik = await prisma.akademik.create({
        data: {
          id: randomUUID(),
          siswaId: findSiswa.id,
          semesterId: data.semesterid,
          matematikaId: matematika.id,
          bahasaIndonesiaId: bahasa_indonesia.id,
          ipaId: ipa.id,
          ipsId: ips.id,
          seniBudayaId: seni_budaya.id,
          kelasId: data.kelasid,
        },
      });

      const olahraga = await prisma.olahraga.create({
        data: {
          id: randomUUID(),
          semesterId: data.semesterid,
          uas: data.olahraga.uas,
          uts: data.olahraga.uts,
          tugas_1: data.olahraga.tugas1,
          tugas_2: data.olahraga.tugas2,
        },
      });

      const olimpiade = await prisma.olimpiade.create({
        data: {
          id: randomUUID(),
          semesterId: data.semesterid,
          uas: data.olimpiade.uas,
          uts: data.olimpiade.uts,
          tugas_1: data.olimpiade.tugas1,
          tugas_2: data.olimpiade.tugas2,
        },
      });

      const seni = await prisma.seni.create({
        data: {
          id: randomUUID(),
          semesterId: data.semesterid,
          uas: data.seni.uas,
          uts: data.seni.uts,
          tugas_1: data.seni.tugas1,
          tugas_2: data.seni.tugas2,
        },
      });

      const keterampilan = await prisma.keterampilan.create({
        data: {
          id: randomUUID(),
          semesterId: data.semesterid,
          uas: data.keterampilan.uas,
          uts: data.keterampilan.uts,
          tugas_1: data.keterampilan.tugas1,
          tugas_2: data.keterampilan.tugas2,
        },
      });

      const nilaiNonAkademik = await prisma.nonAkademik.create({
        data: {
          id: randomUUID(),
          siswaId: findSiswa.id,
          semesterId: data.semesterid,
          olahragaId: olahraga.id,
          olimpiadeId: olimpiade.id,
          seniId: seni.id,
          keterampilanId: keterampilan.id,
          kelasId: data.kelasid,
        },
      });

      const kedisiplinan = await prisma.kedisiplinan.create({
        data: {
          id: randomUUID(),
          semesterId: data.semesterid,
          kehadiran: data.kedisiplinan.kehadiran,
          keterlambatan: data.kedisiplinan.keterlambatan,
          kepatuhan: data.kedisiplinan.kepatuhan,
          kerapihan: data.kedisiplinan.kerapihan,
          catatan: "Kedisiplinan siswa sangat baik",
        },
      });

      const tanggung_jawab = await prisma.tanggungJawab.create({
        data: {
          id: randomUUID(),
          semesterId: data.semesterid,
          tugas: data.tanggungJawab.tugas,
          kebersihan: data.tanggungJawab.kebersihan,
          kepemimpinan: data.tanggungJawab.kepemimpinan,
          catatan: "Tanggung jawab siswa sangat baik",
        },
      });

      const adaptasi = await prisma.adaptasi.create({
        data: {
          id: randomUUID(),
          semesterId: data.semesterid,
          kehadiran: data.adaptasi.kehadiran,
          keterlambatan: data.adaptasi.keterlambatan,
          kepatuhan: data.adaptasi.kepatuhan,
          kerapihan: data.adaptasi.kerapihan,
          catatan: "Adaptasi siswa sangat baik",
        },
      });

      const kerja_sama = await prisma.kerjaSama.create({
        data: {
          id: randomUUID(),
          semesterId: data.semesterid,
          kerjaTim: data.kerjaSama.kerjaTim,
          kerjaSama: data.kerjaSama.kerjaSama,
          komunikasi: data.kerjaSama.komunikasi,
          catatan: "Kerja Sama siswa sangat baik",
        },
      });

      const etikaBelajar = await prisma.etikaBelajar.create({
        data: {
          id: randomUUID(),
          semesterId: data.semesterid,
          kerajinan: data.etikaBelajar.kerajinan,
          integrasi: data.etikaBelajar.integrasi,
          konsentrasi: data.etikaBelajar.konsentrasi,
          catatan: "Etika belajar siswa sangat baik",
        },
      });

      const nilaiSikap = await prisma.sikapDanPerilaku.create({
        data: {
          id: randomUUID(),
          siswaId: findSiswa.id,
          semesterId: data.semesterid,
          kedisiplinanId: kedisiplinan.id,
          tanggungJawabId: tanggung_jawab.id,
          adaptasiId: adaptasi.id,
          kerjaSamaId: kerja_sama.id,
          etikaBelajarId: etikaBelajar.id,
          kelasId: data.kelasid,
        },
      });

      const nilaiKehadiran = await prisma.kehadiran.create({
        data: {
          id: randomUUID(),
          siswaId: findSiswa.id,
          semesterId: data.semesterid,
          kelasId: data.kelasid,
          hadir: data.hadir,
          sakit: data.sakit,
          izin: data.izin,
          alpa: data.alpa,
        },
      });

      if (
        !nilaiAkademik ||
        !nilaiNonAkademik ||
        !nilaiSikap ||
        !nilaiKehadiran
      ) {
        return NextResponse.json(
          { error: "Failed to create report" },
          { status: 500 }
        );
      }

      await prisma.siswa.update({
        where: {
          id: findSiswa.id,
        },
        data: {
          Akademik: {
            connect: {
              id: nilaiAkademik.id,
            },
          },
          NonAkademik: {
            connect: {
              id: nilaiNonAkademik.id,
            },
          },
          SikapDanPerilaku: {
            connect: {
              id: nilaiSikap.id,
            },
          },
          Kehadiran: {
            connect: {
              id: nilaiKehadiran.id,
            },
          },
          Kelas: {
            connect: {
              id: data.kelasid,
            },
          },
          Semester: {
            connect: {
              id: data.semesterid,
            },
          },
        },
      });

      return NextResponse.json(
        { message: "Rapor berhasil dibuat" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

//GET Method
const GET = async (req: any) => {
  try {
    //ambil token
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

    //Ambil nilai siswa berdasarkan NISN untuk guru
    if (verifyToken.role === "GURU") {
      try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        if (!id) {
          return NextResponse.json(
            { error: "Missing id parameter" },
            { status: 400 }
          );
        }

        const reports = await prisma.siswa.findMany({
          where: {
            id: id,
          },
        });

        if (!reports) {
          return NextResponse.json(
            { error: "Reports not found" },
            { status: 404 }
          );
        }

        const findAkademik = await prisma.akademik.findMany({
          where: {
            siswaId: id,
          },
        });

        const findNonAkademik = await prisma.nonAkademik.findMany({
          where: {
            siswaId: id,
          },
        });

        const findSikap = await prisma.sikapDanPerilaku.findMany({
          where: {
            siswaId: id,
          },
        });

        const findKehadiran = await prisma.kehadiran.findMany({
          where: {
            siswaId: id,
          },
        });

        if (!findAkademik || !findNonAkademik || !findSikap || !findKehadiran) {
          return NextResponse.json(
            { error: "Reports not found" },
            { status: 404 }
          );
        }

        // Ambil Nilai Masing Masing Kategori

        const nilaiMatematika = await prisma.matematika.findMany({
          where: {
            id: findAkademik[0].matematikaId ?? "",
          },
        });

        const nilaiBahasaIndonesia = await prisma.bahasaIndonesia.findMany({
          where: {
            id: findAkademik[0].bahasaIndonesiaId ?? "",
          },
        });

        const nilaiIpa = await prisma.ipa.findMany({
          where: {
            id: findAkademik[0].ipaId ?? "",
          },
        });

        const nilaiIps = await prisma.ips.findMany({
          where: {
            id: findAkademik[0].ipsId ?? "",
          },
        });

        const nilaiSeniBudaya = await prisma.seniBudaya.findMany({
          where: {
            id: findAkademik[0].seniBudayaId ?? "",
          },
        });

        const nilaiOlahraga = await prisma.olahraga.findMany({
          where: {
            id: findNonAkademik[0].olahragaId ?? "",
          },
        });

        const nilaiOlimpiade = await prisma.olimpiade.findMany({
          where: {
            id: findNonAkademik[0].olimpiadeId ?? "",
          },
        });

        const nilaiSeni = await prisma.seni.findMany({
          where: {
            id: findNonAkademik[0].seniId ?? "",
          },
        });

        const nilaiKeterampilan = await prisma.keterampilan.findMany({
          where: {
            id: findNonAkademik[0].keterampilanId ?? "",
          },
        });

        const nilaiKedisiplinan = await prisma.kedisiplinan.findMany({
          where: {
            id: findSikap[0].kedisiplinanId ?? "",
          },
        });

        const nilaiTanggungJawab = await prisma.tanggungJawab.findMany({
          where: {
            id: findSikap[0].tanggungJawabId ?? "",
          },
        });

        const nilaiAdaptasi = await prisma.adaptasi.findMany({
          where: {
            id: findSikap[0].adaptasiId ?? "",
          },
        });

        const nilaiKerjaSama = await prisma.kerjaSama.findMany({
          where: {
            id: findSikap[0].kerjaSamaId ?? "",
          },
        });

        const nilaiEtikaBelajar = await prisma.etikaBelajar.findMany({
          where: {
            id: findSikap[0].etikaBelajarId ?? "",
          },
        });

        if (
          !nilaiMatematika ||
          !nilaiBahasaIndonesia ||
          !nilaiIpa ||
          !nilaiIps ||
          !nilaiSeniBudaya ||
          !nilaiOlahraga ||
          !nilaiOlimpiade ||
          !nilaiSeni ||
          !nilaiKeterampilan ||
          !nilaiKedisiplinan ||
          !nilaiTanggungJawab ||
          !nilaiAdaptasi ||
          !nilaiKerjaSama ||
          !nilaiEtikaBelajar
        ) {
          return NextResponse.json(
            { error: "Nilai not found" },
            { status: 404 }
          );
        }

        const kelas = await prisma.kelas.findMany({
          where: {
            id: reports[0].kelasId ?? "",
          },
        });

        if (!kelas) {
          return NextResponse.json(
            { error: "Kelas not found" },
            { status: 404 }
          );
        }

        const semester = await prisma.semester.findMany({
          where: {
            id: reports[0].semesterId ?? "",
          },
        });

        if (!semester) {
          return NextResponse.json(
            { error: "Semester not found" },
            { status: 404 }
          );
        }

        const data = {
          siswa: reports[0],
          kelas: kelas[0],
          semester: semester[0],
          Akademik: {
            matematika: nilaiMatematika[0],
            bahasaIndonesia: nilaiBahasaIndonesia[0],
            ipa: nilaiIpa[0],
            ips: nilaiIps[0],
            seniBudaya: nilaiSeniBudaya[0],
          },
          NonAkademik: {
            olahraga: nilaiOlahraga[0],
            olimpiade: nilaiOlimpiade[0],
            seni: nilaiSeni[0],
            keterampilan: nilaiKeterampilan[0],
          },
          Sikap: {
            kedisiplinan: nilaiKedisiplinan[0],
            tanggungJawab: nilaiTanggungJawab[0],
            adaptasi: nilaiAdaptasi[0],
            kerjaSama: nilaiKerjaSama[0],
            etikaBelajar: nilaiEtikaBelajar[0],
          },
          Kehadiran: findKehadiran[0],
        };

        return NextResponse.json(
          {
            data: data,
            message: "Reports Successfully Fetched!",
          },
          { status: 200 }
        );
      } catch (error) {
        console.error("Error fetching reports:", error);
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

// Update an existing report for a student
const PUT = async (req: any) => {
  try {
    //ambil token
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

    const data: any = await req.json();
    const url = new URL(req.url);
    const nama = url.searchParams.get("nama");

    if (verifyToken.role === "GURU") {
      if (!nama) {
        return NextResponse.json(
          { error: "Missing nama parameter" },
          { status: 400 }
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

      const nilaiAkademikId = await prisma.akademik.findMany({
        where: {
          siswaId: findSiswa.id,
          semesterId: data.semesterid,
        },
      });

      if (!nilaiAkademikId) {
        return NextResponse.json(
          { error: "Akademik not found" },
          { status: 404 }
        );
      }

      const matematika = await prisma.matematika.update({
        where: {
          id: nilaiAkademikId[0].matematikaId ?? "",
        },
        data: {
          semesterId: data.semesterid,
          uas: data.matematika.uas,
          uts: data.matematika.uts,
          tugas_1: data.matematika.tugas1,
          tugas_2: data.matematika.tugas2,
        },
      });

      const bahasa_indonesia = await prisma.bahasaIndonesia.update({
        where: {
          id: nilaiAkademikId[0].bahasaIndonesiaId ?? "",
        },
        data: {
          semesterId: data.semesterid,
          uas: data.bahasaIndonesia.uas,
          uts: data.bahasaIndonesia.uts,
          tugas_1: data.bahasaIndonesia.tugas1,
          tugas_2: data.bahasaIndonesia.tugas2,
        },
      });

      const ipa = await prisma.ipa.update({
        where: {
          id: nilaiAkademikId[0].ipaId ?? "",
        },
        data: {
          semesterId: data.semesterid,
          uas: data.ipa.uas,
          uts: data.ipa.uts,
          tugas_1: data.ipa.tugas1,
          tugas_2: data.ipa.tugas2,
        },
      });

      const ips = await prisma.ips.update({
        where: {
          id: nilaiAkademikId[0].ipsId ?? "",
        },
        data: {
          semesterId: data.semesterid,
          uas: data.ips.uas,
          uts: data.ips.uts,
          tugas_1: data.ips.tugas1,
          tugas_2: data.ips.tugas2,
        },
      });

      const seni_budaya = await prisma.seniBudaya.update({
        where: {
          id: nilaiAkademikId[0].seniBudayaId ?? "",
        },
        data: {
          semesterId: data.semesterid,
          uas: data.kesenian.uas,
          uts: data.kesenian.uts,
          tugas_1: data.kesenian.tugas1,
          tugas_2: data.kesenian.tugas2,
        },
      });

      const updateAkademik = await prisma.akademik.update({
        where: {
          id: nilaiAkademikId[0].id,
        },
        data: {
          matematikaId: matematika.id,
          bahasaIndonesiaId: bahasa_indonesia.id,
          ipaId: ipa.id,
          ipsId: ips.id,
          seniBudayaId: seni_budaya.id,
        },
      });

      const nilaiNonAkademikId = await prisma.nonAkademik.findMany({
        where: {
          siswaId: findSiswa.id,
          semesterId: data.semesterid,
        },
      });

      if (!nilaiNonAkademikId) {
        return NextResponse.json(
          { error: "Non Akademik not found" },
          { status: 404 }
        );
      }

      const olahraga = await prisma.olahraga.update({
        where: {
          id: nilaiNonAkademikId[0].olahragaId ?? "",
        },
        data: {
          semesterId: data.semesterid,
          uas: data.olahraga.uas,
          uts: data.olahraga.uts,
          tugas_1: data.olahraga.tugas1,
          tugas_2: data.olahraga.tugas2,
        },
      });

      const olimpiade = await prisma.olimpiade.update({
        where: {
          id: nilaiNonAkademikId[0].olimpiadeId ?? "",
        },
        data: {
          semesterId: data.semesterid,
          uas: data.olimpiade.uas,
          uts: data.olimpiade.uts,
          tugas_1: data.olimpiade.tugas1,
          tugas_2: data.olimpiade.tugas2,
        },
      });

      const seni = await prisma.seni.update({
        where: {
          id: nilaiNonAkademikId[0].seniId ?? "",
        },
        data: {
          semesterId: data.semesterid,
          uas: data.seni.uas,
          uts: data.seni.uts,
          tugas_1: data.seni.tugas1,
          tugas_2: data.seni.tugas2,
        },
      });

      const keterampilan = await prisma.keterampilan.update({
        where: {
          id: nilaiNonAkademikId[0].keterampilanId ?? "",
        },
        data: {
          semesterId: data.semesterid,
          uas: data.keterampilan.uas,
          uts: data.keterampilan.uts,
          tugas_1: data.keterampilan.tugas1,
          tugas_2: data.keterampilan.tugas2,
        },
      });

      const updateNonAkademik = await prisma.nonAkademik.update({
        where: {
          id: nilaiNonAkademikId[0].id,
        },
        data: {
          olahragaId: olahraga.id,
          olimpiadeId: olimpiade.id,
          seniId: seni.id,
          keterampilanId: keterampilan.id,
        },
      });

      const nilaiSikapId = await prisma.sikapDanPerilaku.findMany({
        where: {
          siswaId: findSiswa.id,
          semesterId: data.semesterid,
        },
      });

      if (!nilaiSikapId) {
        return NextResponse.json(
          { error: "Sikap dan Perilaku not found" },
          { status: 404 }
        );
      }

      const kedisiplinan = await prisma.kedisiplinan.update({
        where: {
          id: nilaiSikapId[0].kedisiplinanId ?? "",
        },
        data: {
          semesterId: data.semesterid,
          kehadiran: data.kedisiplinan.kehadiran,
          keterlambatan: data.kedisiplinan.keterlambatan,
          kepatuhan: data.kedisiplinan.kepatuhan,
          kerapihan: data.kedisiplinan.kerapihan,
          catatan: "Kedisiplinan siswa sangat baik",
        },
      });

      const tanggung_jawab = await prisma.tanggungJawab.update({
        where: {
          id: nilaiSikapId[0].tanggungJawabId ?? "",
        },
        data: {
          semesterId: data.semesterid,
          tugas: data.tanggungJawab.tugas,
          kebersihan: data.tanggungJawab.kebersihan,
          kepemimpinan: data.tanggungJawab.kepemimpinan,
          catatan: "Tanggung jawab siswa sangat baik",
        },
      });

      const adaptasi = await prisma.adaptasi.update({
        where: {
          id: nilaiSikapId[0].adaptasiId ?? "",
        },
        data: {
          semesterId: data.semesterid,
          kehadiran: data.adaptasi.kehadiran,
          keterlambatan: data.adaptasi.keterlambatan,
          kepatuhan: data.adaptasi.kepatuhan,
          kerapihan: data.adaptasi.kerapihan,
          catatan: "Adaptasi siswa sangat baik",
        },
      });

      const kerja_sama = await prisma.kerjaSama.update({
        where: {
          id: nilaiSikapId[0].kerjaSamaId ?? "",
        },
        data: {
          semesterId: data.semesterid,
          kerjaTim: data.kerjaSama.kerjaTim,
          kerjaSama: data.kerjaSama.kerjaSama,
          komunikasi: data.kerjaSama.komunikasi,
          catatan: "Kerja Sama siswa sangat baik",
        },
      });

      const etikaBelajar = await prisma.etikaBelajar.update({
        where: {
          id: nilaiSikapId[0].etikaBelajarId ?? "",
        },
        data: {
          semesterId: data.semesterid,
          kerajinan: data.etikaBelajar.kerajinan,
          integrasi: data.etikaBelajar.integrasi,
          konsentrasi: data.etikaBelajar.konsentrasi,
          catatan: "Etika belajar siswa sangat baik",
        },
      });

      const updateSikap = await prisma.sikapDanPerilaku.update({
        where: {
          id: nilaiSikapId[0].id,
        },
        data: {
          kedisiplinanId: kedisiplinan.id,
          tanggungJawabId: tanggung_jawab.id,
          adaptasiId: adaptasi.id,
          kerjaSamaId: kerja_sama.id,
          etikaBelajarId: etikaBelajar.id,
        },
      });

      const nilaiKehadiranId = await prisma.kehadiran.findMany({
        where: {
          siswaId: findSiswa.id,
          semesterId: data.semesterid,
        },
      });

      if (!nilaiKehadiranId) {
        return NextResponse.json(
          { error: "Kehadiran not found" },
          { status: 404 }
        );
      }

      const updateKehadiran = await prisma.kehadiran.update({
        where: {
          id: nilaiKehadiranId[0].id,
        },
        data: {
          hadir: data.hadir,
          sakit: data.sakit,
          izin: data.izin,
          alpa: data.alpa,
        },
      });

      if (
        !updateAkademik ||
        !updateNonAkademik ||
        !updateSikap ||
        !updateKehadiran
      ) {
        return NextResponse.json(
          { error: "Failed to update report" },
          { status: 500 }
        );
      }

      await prisma.siswa.update({
        where: {
          id: findSiswa.id,
        },
        data: {
          Akademik: {
            connect: {
              id: nilaiAkademikId[0].id,
            },
          },
          NonAkademik: {
            connect: {
              id: nilaiNonAkademikId[0].id,
            },
          },
          SikapDanPerilaku: {
            connect: {
              id: nilaiSikapId[0].id,
            },
          },
          Kehadiran: {
            connect: {
              id: nilaiKehadiranId[0].id,
            },
          },
          Kelas: {
            connect: {
              id: data.kelasid,
            },
          },
          Semester: {
            connect: {
              id: data.semesterid,
            },
          },
        },
      });

      return NextResponse.json(
        { message: "Rapor berhasil dibuat" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

// Delete a report for a student
const DELETE = async (req: NextRequest) => {
  try {
    //ambil token
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
    const id = url.searchParams.get("id");

    if (verifyToken.role === "GURU") {
      if (!id) {
        return NextResponse.json(
          { error: "Missing id parameter" },
          { status: 400 }
        );
      }

      const reportExists = await prisma.siswa.findUnique({
        where: {
          id: id,
        },
      });

      if (!reportExists) {
        return NextResponse.json(
          { error: "Report not found" },
          { status: 404 }
        );
      }

      const kehadiranExists = await prisma.kehadiran.findUnique({
        where: {
          id: reportExists.id,
        },
      });

      const akademikExists = await prisma.akademik.findUnique({
        where: {
          id: reportExists.id,
        },
      });

      const nonAkademikExists = await prisma.nonAkademik.findUnique({
        where: {
          id: reportExists.id,
        },
      });

      const sikapDanPerilakuExists = await prisma.sikapDanPerilaku.findUnique({
        where: {
          id: reportExists.id,
        },
      });

      if (!kehadiranExists) {
        return NextResponse.json(
          { error: "Kehadiran not found" },
          { status: 404 }
        );
      }

      await prisma.kehadiran.delete({
        where: {
          id: reportExists.id,
        },
      });

      if (!akademikExists) {
        return NextResponse.json(
          { error: "Akademik not found" },
          { status: 404 }
        );
      }

      await prisma.matematika.delete({
        where: {
          id: akademikExists.matematikaId ?? "",
        },
      });

      await prisma.bahasaIndonesia.delete({
        where: {
          id: akademikExists.bahasaIndonesiaId ?? "",
        },
      });

      await prisma.ipa.delete({
        where: {
          id: akademikExists.ipaId ?? "",
        },
      });

      await prisma.ips.delete({
        where: {
          id: akademikExists.ipsId ?? "",
        },
      });

      await prisma.seniBudaya.delete({
        where: {
          id: akademikExists.seniBudayaId ?? "",
        },
      });

      await prisma.akademik.delete({
        where: {
          id: reportExists.id,
        },
      });

      if (!nonAkademikExists) {
        return NextResponse.json(
          { error: "Non Akademik not found" },
          { status: 404 }
        );
      }

      await prisma.olahraga.delete({
        where: {
          id: nonAkademikExists.olahragaId ?? "",
        },
      });

      await prisma.olimpiade.delete({
        where: {
          id: nonAkademikExists.olimpiadeId ?? "",
        },
      });

      await prisma.seni.delete({
        where: {
          id: nonAkademikExists.seniId ?? "",
        },
      });

      await prisma.keterampilan.delete({
        where: {
          id: nonAkademikExists.keterampilanId ?? "",
        },
      });

      await prisma.nonAkademik.delete({
        where: {
          id: reportExists.id,
        },
      });

      if (!sikapDanPerilakuExists) {
        return NextResponse.json(
          { error: "Sikap dan Perilaku not found" },
          { status: 404 }
        );
      }

      await prisma.kedisiplinan.delete({
        where: {
          id: sikapDanPerilakuExists.kedisiplinanId ?? "",
        },
      });

      await prisma.tanggungJawab.delete({
        where: {
          id: sikapDanPerilakuExists.tanggungJawabId ?? "",
        },
      });

      await prisma.adaptasi.delete({
        where: {
          id: sikapDanPerilakuExists.adaptasiId ?? "",
        },
      });

      await prisma.kerjaSama.delete({
        where: {
          id: sikapDanPerilakuExists.kerjaSamaId ?? "",
        },
      });

      await prisma.etikaBelajar.delete({
        where: {
          id: sikapDanPerilakuExists.etikaBelajarId ?? "",
        },
      });

      await prisma.sikapDanPerilaku.delete({
        where: {
          id: reportExists.id,
        },
      });
    }
    return NextResponse.json({ message: "Report Successfully Deleted!" });
  } catch (error) {
    console.error("Error deleting report:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export { GET, POST, PUT, DELETE };
