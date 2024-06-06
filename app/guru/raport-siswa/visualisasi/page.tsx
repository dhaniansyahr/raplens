"use client";
import Navbar from "@/components/molecules/navbar/Navbar";
import Sidebar from "@/components/molecules/sidebar/Sidebar";
import GrafikNilai from "@/components/organism/guru/dashboard/charts/Akademik";
import Kehadiran from "@/components/organism/guru/raport-anak/visualisasi/charts/Kehadiran";
import NonAkademik from "@/components/organism/guru/raport-anak/visualisasi/charts/NonAkademik";
import SikapDanPerilaku from "@/components/organism/guru/raport-anak/visualisasi/charts/SikapDanPerilaku";
import Akademik from "@/components/organism/guru/raport-anak/visualisasi/charts/Akademik";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const router = useRouter();
  const auth = useAuth();

  const [sideOpen, setSideOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [siswa, setSiswa] = useState<any>(null);

  const [nama, setNama] = useState<string>("Siswa 1");

  const getData = async () => {
    setLoading(true);
    axios
      .get("/api/siswa", {
        headers: {
          Authorization: `Bearer ${auth.auth?.accessToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setSiswa(res.data?.siswa);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getVisualisasi = async () => {
    setLoading(true);
    axios
      .get(`/api/visualisasi/guru?nama=${nama ?? "Siswa 1"}`, {
        headers: {
          Authorization: `Bearer ${auth.auth?.accessToken}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch(() => {
        setLoading(false);
        console.log("Data gagal diambil!");
      });
  };

  useEffect(() => {
    getData();
    getVisualisasi();
  }, [nama]);

  return (
    <main className="w-full h-full flex flex-col bg-dashboard">
      <Navbar isOpen={sideOpen} setOpen={setSideOpen} />
      <div className="flex flex-row">
        <Sidebar isOpen={sideOpen} onClose={setSideOpen} />
        <div className="w-full py-24 px-6 lg:p-24 lg:pt-[100px] max-h-screen overflow-y-scroll">
          {!data || !siswa || loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
                <Select
                  value={nama}
                  onValueChange={(onchange) => setNama(onchange)}
                >
                  <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
                    <SelectValue placeholder="Nama Siswa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {siswa?.length !== 0 &&
                        siswa?.map((item: any) => (
                          <SelectItem key={item.id} value={item.nama}>
                            {item.nama}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-2">
                <div className="w-full bg-white p-2 md:p-6 rounded-lg flex flex-col gap-4">
                  <h1 className="text-3xl font-bold">Akademik</h1>
                  <Akademik datas={data?.akademik?.visualisasi} />
                  <div className="flex flex-wrap gap-2 mt-2 justify-center">
                    <span className="text-xl font-semibold">
                      {data?.nama ?? "Loading..."}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <h1 className="text-2xl font-semibold">
                    Nilai {data?.nama ?? "Loading..."} :{" "}
                    <span className="font-normal">
                      {data?.akademik?.rataRataSiswa ?? "Loading..."}
                    </span>
                  </h1>
                  <h1 className="text-2xl font-semibold">
                    Nilai Rata - Rata Kelas :{" "}
                    <span className="font-normal">
                      {data?.akademik?.rataRataKelas ?? "Loading..."}
                    </span>
                  </h1>
                  <h1 className="text-2xl font-semibold">
                    KKM :{" "}
                    <span className="font-normal">
                      {data?.akademik?.kkm ?? "Loading..."}
                    </span>
                  </h1>
                  <h1 className="text-2xl font-semibold">Kesimpulan :</h1>
                  <h3 className="text-lg font-normal">
                    {data?.akademik?.kesimpulan ?? "Loading..."}
                  </h3>
                  <button
                    className="bg-white rounded-full outline-none border-none px-10 py-2 flex items-center justify-center"
                    onClick={() =>
                      router.push(
                        `/guru/raport-siswa/visualisasi/akademik/${nama}`
                      )
                    }
                  >
                    <span className="text-2xl font-semibold">
                      Detail Nilai Pelajaran Akademik
                    </span>
                  </button>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-2">
                <div className="w-full bg-white p-2 md:p-6 rounded-lg flex flex-col gap-4">
                  <h1 className="text-3xl font-bold">Non - Akademik</h1>
                  <NonAkademik datas={data?.akademik?.visualisasi} />
                  <div className="flex flex-wrap gap-2 mt-2 justify-center">
                    <span className="text-xl font-semibold">
                      {data?.nama ?? "Loading..."}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <h1 className="text-2xl font-semibold">
                    Nilai {data?.nama ?? "Loading..."} :{" "}
                    <span className="font-normal">
                      {data?.nonAkademik?.rataRataSiswa}
                    </span>
                  </h1>
                  <h1 className="text-2xl font-semibold">
                    Rata - Rata Kelas :{" "}
                    <span className="font-normal">
                      {data?.nonAkademik?.rataRataKelas ?? "Loading..."}
                    </span>
                  </h1>
                  <h1 className="text-2xl font-semibold">Kesimpulan :</h1>
                  <h3 className="text-lg font-normal">
                    {data?.nonAkademik?.kesimpulan ?? "Loading..."}
                  </h3>
                  <button
                    className="bg-white rounded-full outline-none border-none px-10 py-2 flex items-center justify-center"
                    onClick={() =>
                      router.push(
                        `/guru/raport-siswa/visualisasi/non-akademik/${nama}`
                      )
                    }
                  >
                    <span className="text-2xl font-semibold">
                      Detail Nilai Pelajaran Non - Akademik
                    </span>
                  </button>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-2">
                <div className="w-full bg-white p-2 md:p-6 rounded-lg flex flex-col gap-4">
                  <h1 className="text-3xl font-bold">Kehadiran</h1>
                  <Kehadiran datas={data?.kehadiran} />
                  <div className="grid grid-cols-2">
                    <div className="flex flex-row gap-2 items-center justify-center w-full">
                      <span className="size-4 bg-[#0088FE] rounded-full"></span>
                      <h1 className="text-sm font-normal">Hadir</h1>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-center w-full">
                      <span className="size-4 bg-[#00C49F] rounded-full"></span>
                      <h1 className="text-sm font-normal">Izin</h1>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-center w-full">
                      <span className="size-4 bg-[#ADD8E6] rounded-full"></span>
                      <h1 className="text-sm font-normal">Sakit</h1>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-center w-full">
                      <span className="size-4 bg-[#FFA07A] rounded-full"></span>
                      <h1 className="text-sm font-normal">Alfa</h1>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <h1 className="text-2xl font-semibold">
                    Persentase Kehadiran :{" "}
                    <span className="font-normal">
                      {data.kehadiran?.persentaseKehadiran}
                    </span>
                  </h1>
                  <h1 className="text-2xl font-semibold">
                    Izin :{" "}
                    <span className="font-normal">
                      {data.kehadiran?.izin} Hari
                    </span>
                  </h1>
                  <h1 className="text-2xl font-semibold">
                    Sakit :{" "}
                    <span className="font-normal">
                      {data.kehadiran?.sakit} Hari
                    </span>
                  </h1>
                  <h1 className="text-2xl font-semibold">
                    Alfa :{" "}
                    <span className="font-normal">
                      {data.kehadiran?.alpa} Hari
                    </span>
                  </h1>
                  <h1 className="text-2xl font-semibold">Kesimpulan :</h1>
                  <h3 className="text-lg font-normal">
                    {data.kehadiran?.kesimpulan}
                  </h3>
                  <button
                    className="bg-white rounded-full outline-none border-none px-10 py-2 flex items-center justify-center"
                    onClick={() =>
                      router.push(
                        `/guru/raport-siswa/visualisasi/kehadiran/${nama}`
                      )
                    }
                  >
                    <span className="text-2xl font-semibold">
                      Detail Kehadiran
                    </span>
                  </button>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-2">
                <div className="w-full bg-white p-2 md:p-6 rounded-lg flex flex-col gap-4">
                  <h1 className="text-3xl font-bold">Sikap dan Perilaku</h1>
                  <SikapDanPerilaku datas={data?.sikap?.visualisasi} />
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <h1 className="text-2xl font-semibold">Kesimpulan :</h1>
                  <h3 className="text-lg font-normal">
                    {data.sikap?.kesimpulan}
                  </h3>

                  <button
                    className="bg-white rounded-full outline-none border-none px-10 py-2 flex items-center justify-center"
                    onClick={() =>
                      router.push(
                        `/guru/raport-siswa/visualisasi/sikap-dan-perilaku/${nama}`
                      )
                    }
                  >
                    <span className="text-2xl font-semibold">
                      Detail Nilai Sikap dan Perilaku
                    </span>
                  </button>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-2 bg-[#CFE3F0] p-10 shadow-lg">
                <div className="w-full bg-white p-2 md:p-6 rounded-lg flex flex-col gap-4">
                  <h1 className="text-3xl font-bold">Akademik</h1>
                  <GrafikNilai />
                </div>
                <div className="flex flex-col gap-4 w-full items-center justify-center">
                  <h1 className="text-2xl font-semibold">
                    Ingin tahu seberapa jauh nilai siswa berkembang?
                  </h1>
                  <h1 className="text-lg font-normal text-center">
                    Fitur ini memungkinkan Anda untuk melihat perbandingan nilai
                    siswa/i dari semester lalu secara detail. Anda dapat melihat
                    nilai siswa/i di setiap mata pelajaran, serta perbedaan
                    nilai siswa/i dari semester ke semester.
                  </h1>
                  <button
                    className="bg-white rounded-full outline-none border-none px-10 py-2 flex items-center justify-center"
                    onClick={() =>
                      router.push(
                        `/guru/raport-siswa/visualisasi/analisa-perkembangan/${nama}`
                      )
                    }
                  >
                    <span className="text-2xl font-semibold">
                      Analisa Perkembangan
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
