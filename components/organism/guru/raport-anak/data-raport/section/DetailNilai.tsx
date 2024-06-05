import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import toast from "react-hot-toast";

export default function DetailNilai({ id }: { id: string }) {
  const [nama, setNama] = useState<string>("");
  const [semester, setSemester] = useState<string>("");
  const [kelas, setKelas] = useState<string>("");

  const [detail, setDetail] = useState<any>(null);
  const [dataKelas, setDataKelas] = useState<any>(null);
  const [dataSemester, setDataSemester] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  const getData = async (token: string) => {
    setLoading(true);
    axios
      .get("/api/semester", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataSemester(res.data.data);

        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        console.error(err);
      });
  };

  const getKelas = async (token: string) => {
    setLoading(true);
    axios
      .get("/api/kelas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataKelas(res.data.data);

        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        console.error(err);
      });
  };

  const handleData = (token: string) => {
    setLoading(true);

    axios
      .get(`/api/nilai?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);

        setDetail(res.data.data);
        toast.success("Data berhasil ditambahkan");
      })
      .catch((err) => {
        setLoading(false);

        toast.dismiss();
        toast.error("Gagal menambahkan data");
      });
  };

  useEffect(() => {
    const temp =
      typeof window !== "undefined" && localStorage.getItem("raplens");
    if (temp) {
      const data = JSON.parse(temp);
      getData(data?.token);
      getKelas(data?.token);
      setToken(data?.token);
      handleData(data?.token);
    }
  }, [detail]);

  return (
    <section className="flex flex-col gap-10">
      {detail ? (
        <>
          <div className="flex flex-col gap-4 max-w-md">
            <h1 className="font-normal text-lg">Nama Siswa</h1>
            <Input placeholder="Nama Siswa" value={detail?.siswa.nama} />
          </div>

          <div className="flex flex-col gap-4 max-w-md">
            <h1 className="font-normal text-lg">Nama Siswa</h1>
            <Input placeholder="Nama Siswa" value={detail?.kelas?.name} />
          </div>

          <div className="flex flex-col gap-4 max-w-md">
            <h1 className="font-normal text-lg">Nama Siswa</h1>
            <Input placeholder="Nama Siswa" value={detail?.semester?.name} />
          </div>

          <div className="w-full flex flex-col gap-6 items-center justify-center">
            <h1 className="font-semibold text-2xl">Penilaian Akademis</h1>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
                <div className="w-full flex items-center justify-center">
                  <span className="text-xl font-normal">Mata Pelajaran</span>
                </div>
                <div className="w-full flex items-center justify-center col-span-2">
                  <span className="text-xl font-normal">Nilai Angka</span>
                </div>
              </div>

              {/* Matematika */}
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
                <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
                  <span className="text-xl font-normal">Matematika</span>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uas"
                      className="shadow-lg"
                      value={detail.Akademik?.matematika?.uas}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uts"
                      className="shadow-lg"
                      value={detail.Akademik?.matematika?.uts}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 1"
                      className="shadow-lg"
                      value={detail.Akademik?.matematika?.tugas1}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 2"
                      className="shadow-lg"
                      value={detail.Akademik?.matematika?.tugas2}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
                <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
                  <span className="text-xl font-normal">Bahasa Indonesia</span>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uas"
                      className="shadow-lg"
                      value={detail.Akademik?.bahasaIndonesia?.uas}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uts"
                      className="shadow-lg"
                      value={detail.Akademik?.bahasaIndonesia?.uts}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 1"
                      className="shadow-lg"
                      value={detail.Akademik?.bahasaIndonesia?.tugas1}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 2"
                      className="shadow-lg"
                      value={detail.Akademik?.bahasaIndonesia?.tugas2}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
                <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
                  <span className="text-xl font-normal">IPA</span>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uas"
                      className="shadow-lg"
                      value={detail.Akademik?.ipa?.uas}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uts"
                      className="shadow-lg"
                      value={detail.Akademik?.ipa?.uts}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 1"
                      className="shadow-lg"
                      value={detail.Akademik?.ipa?.tugas1}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 2"
                      className="shadow-lg"
                      value={detail.Akademik?.ipa?.tugas2}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
                <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
                  <span className="text-xl font-normal">IPS</span>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uas"
                      className="shadow-lg"
                      value={detail.Akademik?.ips?.uas}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uts"
                      className="shadow-lg"
                      value={detail.Akademik?.ips?.uts}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 1"
                      className="shadow-lg"
                      value={detail.Akademik?.ips?.tugas1}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 2"
                      className="shadow-lg"
                      value={detail.Akademik?.ips?.tugas2}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
                <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
                  <span className="text-xl font-normal">Kesenian</span>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uas"
                      className="shadow-lg"
                      value={detail.Akademik?.kesenian?.uas}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uts"
                      className="shadow-lg"
                      value={detail.Akademik?.kesenian?.uts}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 1"
                      className="shadow-lg"
                      value={detail.Akademik?.kesenian?.tugas1}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 2"
                      className="shadow-lg"
                      value={detail.Akademik?.kesenian?.tugas2}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6 items-center justify-center">
            <h1 className="font-semibold text-2xl">Penilaian Non-Akademis</h1>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
                <div className="w-full flex items-center justify-center">
                  <span className="text-xl font-normal">Ekstrakurikuler</span>
                </div>
                <div className="w-full flex items-center justify-center col-span-2">
                  <span className="text-xl font-normal">Nilai Angka</span>
                </div>
              </div>

              {/* Matematika */}
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
                <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
                  <span className="text-xl font-normal">Olahraga</span>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uas"
                      className="shadow-lg"
                      value={detail.NonAkademik?.olahraga.uas}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uts"
                      className="shadow-lg"
                      value={detail.NonAkademik?.olahraga.uts}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 1"
                      className="shadow-lg"
                      value={detail.NonAkademik?.olahraga.tugas1}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 2"
                      className="shadow-lg"
                      value={detail.NonAkademik?.olahraga.tugas2}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
                <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
                  <span className="text-xl font-normal">Olimpiade</span>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uas"
                      className="shadow-lg"
                      value={detail.NonAkademik?.olimpiade.uas}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uts"
                      className="shadow-lg"
                      value={detail.NonAkademik?.olimpiade.uts}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 1"
                      className="shadow-lg"
                      value={detail.NonAkademik?.olimpiade.tugas1}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 2"
                      className="shadow-lg"
                      value={detail.NonAkademik?.olimpiade.tugas2}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
                <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
                  <span className="text-xl font-normal">Seni</span>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uas"
                      className="shadow-lg"
                      value={detail.NonAkademik?.seni?.uas}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uts"
                      className="shadow-lg"
                      value={detail.NonAkademik?.seni?.uts}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 1"
                      className="shadow-lg"
                      value={detail.NonAkademik?.seni?.tugas1}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 2"
                      className="shadow-lg"
                      value={detail.NonAkademik?.seni?.tugas2}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
                <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
                  <span className="text-xl font-normal">keterampilan</span>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uas"
                      className="shadow-lg"
                      value={detail.NonAkademik?.keterampilan?.uas}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uts"
                      className="shadow-lg"
                      value={detail.NonAkademik?.keterampilan?.uts}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 1"
                      className="shadow-lg"
                      value={detail.NonAkademik?.keterampilan?.tugas1}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 2"
                      className="shadow-lg"
                      value={detail.NonAkademik?.keterampilan?.tugas2}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6 items-center justify-center">
            <h1 className="font-semibold text-2xl">
              Penilaian Sikap dan Perilaku
            </h1>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
                <div className="w-full flex items-center justify-center">
                  <span className="text-xl font-normal">Sikap/Perilaku</span>
                </div>
                <div className="w-full flex items-center justify-center col-span-2">
                  <span className="text-xl font-normal">Nilai Angka</span>
                </div>
              </div>

              {/* Matematika */}
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
                <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
                  <span className="text-xl font-normal">Kedisiplinan</span>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uas"
                      className="shadow-lg"
                      value={detail.Sikap?.kedisiplinan?.kehadiran}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uts"
                      className="shadow-lg"
                      value={detail.Sikap?.kedisiplinan?.keterlambatan}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 1"
                      className="shadow-lg"
                      value={detail.Sikap?.kedisiplinan?.kepatuhan}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 2"
                      className="shadow-lg"
                      value={detail.Sikap?.kedisiplinan?.kerapihan}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
                <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
                  <span className="text-xl font-normal">Tanggung Jawab</span>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uas"
                      className="shadow-lg"
                      value={detail.Sikap?.tanggungJawab?.tugas}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uts"
                      className="shadow-lg"
                      value={detail.Sikap?.tanggungJawab?.kebersihan}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 1"
                      className="shadow-lg"
                      value={detail.Sikap?.tanggungJawab?.kepemimpinan}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
                <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
                  <span className="text-xl font-normal">Kerja Sama</span>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uas"
                      className="shadow-lg"
                      value={detail.Sikap?.kerjaSama?.kerjaTim}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uts"
                      className="shadow-lg"
                      value={detail.Sikap?.kerjaSama?.kerjaSama}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 1"
                      className="shadow-lg"
                      value={detail.Sikap?.kerjaSama?.komunikasi}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
                <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
                  <span className="text-xl font-normal">Adaptasi</span>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uas"
                      className="shadow-lg"
                      value={detail.Sikap?.adaptasi?.kehadiran}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uts"
                      className="shadow-lg"
                      value={detail.Sikap?.adaptasi?.keterlambatan}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 1"
                      className="shadow-lg"
                      value={detail.Sikap?.adaptasi?.kepatuhan}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 2"
                      className="shadow-lg"
                      value={detail.Sikap?.adaptasi?.kerapihan}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
                <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
                  <span className="text-xl font-normal">Etika Belajar</span>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uas"
                      className="shadow-lg"
                      value={detail.Sikap?.etikaBelajar?.kerajinan}
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Uts"
                      className="shadow-lg"
                      value={detail.Sikap?.etikaBelajar?.integrasi}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <Input
                      type="number"
                      placeholder="Nilai Tugas 1"
                      className="shadow-lg"
                      value={detail.Sikap?.etikaBelajar?.konsentrasi}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6 items-center justify-center">
            <h1 className="font-semibold text-2xl">Penilaian Kehadiran</h1>
            <div className="w-full flex flex-col gap-6 lg:grid lg:grid-cols-3">
              <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10 col-span-2">
                <span className="text-xl font-normal">Hadir</span>
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Input Hadir"
                  className="shadow-lg"
                  value={detail.Kehadiran?.hadir}
                  disabled
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-6 lg:grid lg:grid-cols-3">
              <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10 col-span-2">
                <span className="text-xl font-normal">Izin</span>
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Input Izin"
                  className="shadow-lg"
                  value={detail.Kehadiran?.izin}
                  disabled
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-6 lg:grid lg:grid-cols-3">
              <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10 col-span-2">
                <span className="text-xl font-normal">Sakit</span>
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Input Sakit"
                  className="shadow-lg"
                  value={detail.Kehadiran?.sakit}
                  disabled
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-6 lg:grid lg:grid-cols-3">
              <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10 col-span-2">
                <span className="text-xl font-normal">Alpa</span>
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Input Alpa"
                  className="shadow-lg"
                  value={detail.Kehadiran?.alpa}
                  disabled
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4 max-w-md">
          <h1 className="font-normal text-4xl">Loading...</h1>
        </div>
      )}
    </section>
  );
}
