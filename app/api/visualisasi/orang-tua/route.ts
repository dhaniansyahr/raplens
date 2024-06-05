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

    const url = new URL(req.url);
    const semesterId = url.searchParams.get("semesterId");

    if (verifyToken.role === "ORANG_TUA") {
      const matematika = await prisma.matematika.findMany();
      const ipa = await prisma.ipa.findMany();
      const bahasa_indonesia = await prisma.bahasaIndonesia.findMany();
      const ips = await prisma.ips.findMany();
      const seni_budaya = await prisma.seniBudaya.findMany();

      const olahraga = await prisma.olahraga.findMany();
      const seni = await prisma.seni.findMany();
      const olimpiade = await prisma.olimpiade.findMany();
      const keterampilan = await prisma.keterampilan.findMany();

      const kedisiplinan = await prisma.kedisiplinan.findMany();
      const tanggungJawab = await prisma.tanggungJawab.findMany();
      const kerjasama = await prisma.kerjaSama.findMany();
      const adaptasi = await prisma.adaptasi.findMany();
      const etikaBelajar = await prisma.etikaBelajar.findMany();

      const semester = await prisma.semester.findMany();

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

      const rataRataKelas = parseInt(
        (
          (rataRataMatematika +
            rataRataIpa +
            rataRataBahasaIndonesia +
            rataRataIps +
            rataRataSeniBudaya) /
          5
        ).toFixed(2)
      );

      const rataRataOlahraga = parseInt(
        (
          olahraga.reduce((acc, curr) => acc + curr.uas, 0) / olahraga.length
        ).toFixed(2)
      );

      const rataRataSeni = parseInt(
        (seni.reduce((acc, curr) => acc + curr.uas, 0) / seni.length).toFixed(2)
      );

      const rataRataOlimpiade = parseInt(
        (
          olimpiade.reduce((acc, curr) => acc + curr.uas, 0) / olimpiade.length
        ).toFixed(2)
      );

      const rataRataKeterampilan = parseInt(
        (
          keterampilan.reduce((acc, curr) => acc + curr.uas, 0) /
          keterampilan.length
        ).toFixed(2)
      );

      const rataRataKelasNonAkademik = parseInt(
        (
          (rataRataOlahraga +
            rataRataSeni +
            rataRataOlimpiade +
            rataRataKeterampilan) /
          4
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
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const nilaiMtk = await prisma.matematika.findMany({
        where: {
          id: akademikSiswaId[0].matematikaId ?? "",
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const nilaiIpa = await prisma.ipa.findMany({
        where: {
          id: akademikSiswaId[0].ipaId ?? "",
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const nilaiBahasaIndonesia = await prisma.bahasaIndonesia.findMany({
        where: {
          id: akademikSiswaId[0].bahasaIndonesiaId ?? "",
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const nilaiIps = await prisma.ips.findMany({
        where: {
          id: akademikSiswaId[0].ipsId ?? "",
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const nilaiSeniBudaya = await prisma.seniBudaya.findMany({
        where: {
          id: akademikSiswaId[0].seniBudayaId ?? "",
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const rataRataNilaiAkademikSiswa = parseInt(
        (
          (nilaiMtk[0].uas +
            nilaiIpa[0].uas +
            nilaiBahasaIndonesia[0].uas +
            nilaiIps[0].uas +
            nilaiSeniBudaya[0].uas) /
          5
        ).toFixed(2)
      );

      // Non Akademik
      const nonAkademikSiswaId = await prisma.nonAkademik.findMany({
        where: {
          siswaId: findSiswa.id,
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const nilaiOlahraga = await prisma.olahraga.findMany({
        where: {
          id: nonAkademikSiswaId[0].olahragaId ?? "",
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const nilaiSeni = await prisma.seni.findMany({
        where: {
          id: nonAkademikSiswaId[0].seniId ?? "",
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const nilaiOlimpiade = await prisma.olimpiade.findMany({
        where: {
          id: nonAkademikSiswaId[0].olimpiadeId ?? "",
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const nilaiKeterampilan = await prisma.keterampilan.findMany({
        where: {
          id: nonAkademikSiswaId[0].keterampilanId ?? "",
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const rataRataNilaiNonAkademikSiswa = parseInt(
        (
          (nilaiOlahraga[0].uas +
            nilaiSeni[0].uas +
            nilaiOlimpiade[0].uas +
            nilaiKeterampilan[0].uas) /
          4
        ).toFixed(2)
      );

      // Kehadiran
      const kehadiranSiswa = await prisma.kehadiran.findMany({
        where: {
          siswaId: findSiswa.id,
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const sumHadir = kehadiranSiswa.reduce(
        (acc, curr) => acc + (curr.hadir ?? 0),
        0
      );
      const sumIzin = kehadiranSiswa.reduce(
        (acc, curr) => acc + (curr.izin ?? 0),
        0
      );
      const sumSakit = kehadiranSiswa.reduce(
        (acc, curr) => acc + (curr.sakit ?? 0),
        0
      );
      const sumAlpa = kehadiranSiswa.reduce(
        (acc, curr) => acc + (curr.alpa ?? 0),
        0
      );

      const persentaseHadir = parseInt(
        ((sumHadir / (sumHadir + sumIzin + sumSakit + sumAlpa)) * 100).toFixed(
          2
        )
      );

      // Sikap dan Perilaku
      const sikap = await prisma.sikapDanPerilaku.findMany({
        where: {
          siswaId: findSiswa.id,
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const kedisiplinanSiswa = await prisma.kedisiplinan.findMany({
        where: {
          id: sikap[0].kedisiplinanId ?? "",
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const tanggungJawabSiswa = await prisma.tanggungJawab.findMany({
        where: {
          id: sikap[0].tanggungJawabId ?? "",
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const kerjasamaSiswa = await prisma.kerjaSama.findMany({
        where: {
          id: sikap[0].kerjaSamaId ?? "",
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const adaptasiSiswa = await prisma.adaptasi.findMany({
        where: {
          id: sikap[0].adaptasiId ?? "",
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const etikaBelajarSiswa = await prisma.etikaBelajar.findMany({
        where: {
          id: sikap[0].etikaBelajarId ?? "",
          semesterId: semesterId ? semesterId : semester[0].id,
        },
      });

      const rataRataKedisiplinan = parseInt(
        (
          kedisiplinan.reduce(
            (acc, curr) =>
              acc +
              curr.kehadiran +
              curr.kepatuhan +
              curr.kerapihan +
              curr.keterlambatan,
            0
          ) / 4
        ).toFixed(2)
      );

      const rataRataTanggungJawab = parseInt(
        (
          tanggungJawab.reduce(
            (acc, curr) =>
              acc + curr.kebersihan + curr.kepemimpinan + curr.tugas,
            0
          ) / 3
        ).toFixed(2)
      );

      const rataRataKerjasama = parseInt(
        (
          kerjasama.reduce(
            (acc, curr) =>
              acc + curr.komunikasi + curr.kerjaSama + curr.kerjaTim,
            0
          ) / 3
        ).toFixed(2)
      );

      const rataRataAdaptasi = parseInt(
        (
          adaptasi.reduce(
            (acc, curr) =>
              acc +
              curr.kehadiran +
              curr.kepatuhan +
              curr.kerapihan +
              curr.keterlambatan,
            0
          ) / 4
        ).toFixed(2)
      );

      const rataRataEtikaBelajar = parseInt(
        (
          etikaBelajar.reduce(
            (acc, curr) =>
              acc + curr.kerajinan + curr.integrasi + curr.konsentrasi,
            0
          ) / 3
        ).toFixed(2)
      );

      const rataRataKedisiplinanSiswa = parseInt(
        (
          kedisiplinanSiswa.reduce(
            (acc, curr) =>
              acc +
              curr.kehadiran +
              curr.kepatuhan +
              curr.kerapihan +
              curr.keterlambatan,
            0
          ) / 4
        ).toFixed(2)
      );

      const rataRataTanggungJawabSiswa = parseInt(
        (
          tanggungJawabSiswa.reduce(
            (acc, curr) =>
              acc + curr.kebersihan + curr.kepemimpinan + curr.tugas,
            0
          ) / 3
        ).toFixed(2)
      );

      const rataRataKerjasamaSiswa = parseInt(
        (
          kerjasamaSiswa.reduce(
            (acc, curr) =>
              acc + curr.komunikasi + curr.kerjaSama + curr.kerjaTim,
            0
          ) / 3
        ).toFixed(2)
      );

      const rataRataAdaptasiSiswa = parseInt(
        (
          adaptasiSiswa.reduce(
            (acc, curr) =>
              acc +
              curr.kehadiran +
              curr.kepatuhan +
              curr.kerapihan +
              curr.keterlambatan,
            0
          ) / 4
        ).toFixed(2)
      );

      const rataRataEtikaBelajarSiswa = parseInt(
        (
          etikaBelajarSiswa.reduce(
            (acc, curr) =>
              acc + curr.kerajinan + curr.integrasi + curr.konsentrasi,
            0
          ) / 3
        ).toFixed(2)
      );

      const kesimpulan =
        rataRataNilaiAkademikSiswa > rataRataKelas &&
        rataRataNilaiAkademikSiswa >= 75
          ? `${findSiswa.nama} mendapatkan Nilai Lebih Tinggi dari Rata-Rata Kelas`
          : `${findSiswa.nama} mendapatkan Nilai Lebih Rendah dari Rata-Rata Kelas`;

      const kesimpulanNonAkademik =
        rataRataNilaiNonAkademikSiswa > rataRataKelasNonAkademik &&
        rataRataNilaiNonAkademikSiswa >= 75
          ? `${findSiswa.nama} mendapatkan Nilai Lebih Tinggi dari Rata-Rata Kelas`
          : `${findSiswa.nama} mendapatkan Nilai Lebih Rendah dari Rata-Rata Kelas`;

      const kesimpulanKehadiran = `Terhitung ${kehadiranSiswa[0].alpa} kali Alpa, ${kehadiranSiswa[0].izin} kali Izin, ${kehadiranSiswa[0].sakit} kali Sakit, dan ${kehadiranSiswa[0].hadir} kali Hadir`;

      const kesimpulanSikap = `Kedisiplinan: ${rataRataKedisiplinan}, Tanggung Jawab: ${rataRataTanggungJawab}, Kerjasama: ${rataRataKerjasama}, Adaptasi: ${rataRataAdaptasi}, Etika Belajar: ${rataRataEtikaBelajar}`;

      return NextResponse.json(
        {
          data: {
            nama: findSiswa.nama,
            akademik: {
              rataRataKelas: rataRataKelas,
              rataRataSiswa: rataRataNilaiAkademikSiswa,
              kkm: 75,
              kesimpulan: kesimpulan,
              visualisasi: [
                {
                  name: "0",
                  nilai: 0,
                },
                {
                  name: "1",
                  nilai: rataRataNilaiAkademikSiswa,
                },
              ],
            },
            nonAkademik: {
              rataRataKelas: rataRataKelasNonAkademik,
              rataRataSiswa: rataRataNilaiNonAkademikSiswa,
              kkm: 75,
              kesimpulan: kesimpulanNonAkademik,
              visualisasi: [
                {
                  name: "0",
                  nilai: 0,
                },
                {
                  name: "1",
                  nilai: rataRataNilaiNonAkademikSiswa,
                },
              ],
            },
            kehadiran: {
              persentaseKehadiran: `${persentaseHadir}%`,
              izin: sumIzin,
              sakit: sumSakit,
              alpa: sumAlpa,
              kesimpulan: kesimpulanKehadiran,
              visualisasi: [
                {
                  name: "Hadir",
                  value: sumHadir,
                },
                {
                  name: "Izin",
                  value: sumIzin,
                },
                {
                  name: "Sakit",
                  value: sumSakit,
                },
                {
                  name: "Alpa",
                  value: sumAlpa,
                },
              ],
            },
            sikap: {
              kesimpulan: kesimpulanSikap,
              visualisasi: [
                {
                  name: "1",
                  kelas: rataRataKedisiplinan,
                  siswa: rataRataKedisiplinanSiswa,
                },
                {
                  name: "2",
                  kelas: rataRataTanggungJawab,
                  siswa: rataRataTanggungJawabSiswa,
                },
                {
                  name: "3",
                  kelas: rataRataKerjasama,
                  siswa: rataRataKerjasamaSiswa,
                },
                {
                  name: "4",
                  kelas: rataRataAdaptasi,
                  siswa: rataRataAdaptasiSiswa,
                },
                {
                  name: "5",
                  kelas: rataRataEtikaBelajar,
                  siswa: rataRataEtikaBelajarSiswa,
                },
              ],
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
