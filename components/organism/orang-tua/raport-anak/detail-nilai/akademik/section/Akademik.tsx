import Matematika from "../charts/Matematika";
import { useEffect, useState } from "react";
import axios from "axios";
import SeniBudayaSiswa from "../charts/SeniBudayaSiswa";
import IpsSiswa from "../charts/IpsSiswa";
import IpaSiswa from "../charts/IpaSiswa";
import BahasaIndonesiaSiswa from "../charts/BahasaIndonesiaSiswa";

export default function Akademik() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async (token: string) => {
    setLoading(true);
    axios
      .get("/api/visualisasi/orang-tua/detail-akademik", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const temp =
      typeof window !== "undefined" && localStorage.getItem("raplens");
    if (temp) {
      const data = JSON.parse(temp);
      getData(data?.token);
    }
  }, []);

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
        <h1 className="md:text-4xl text-2xl font-bold text-white">
          Detail Nilai Pelajaran Akademis
        </h1>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Matematika</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center">
              <span className="size-4 bg-[#8884d8] rounded-full"></span>
              <h1 className="text-sm font-normal">Nilai Rata - Rata Kelas</h1>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <span className="size-4 bg-[#82ca9d] rounded-full"></span>
              <h1 className="text-sm font-normal">Nilai Anak</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <Matematika data={data?.matematika} />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">
            Bahasa Indonesia
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center">
              <span className="size-4 bg-[#8884d8] rounded-full"></span>
              <h1 className="text-sm font-normal">Nilai Rata - Rata Kelas</h1>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <span className="size-4 bg-[#82ca9d] rounded-full"></span>
              <h1 className="text-sm font-normal">Nilai Anak</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <BahasaIndonesiaSiswa data={data?.bahasa_indonesia} />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">
            Ilmu Pengetahuan Alam
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center">
              <span className="size-4 bg-[#8884d8] rounded-full"></span>
              <h1 className="text-sm font-normal">Nilai Rata - Rata Kelas</h1>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <span className="size-4 bg-[#82ca9d] rounded-full"></span>
              <h1 className="text-sm font-normal">Nilai Anak</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <IpaSiswa data={data?.ipa} />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">
            Ilmu Pengetahuan Sosial
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center">
              <span className="size-4 bg-[#8884d8] rounded-full"></span>
              <h1 className="text-sm font-normal">Nilai Rata - Rata Kelas</h1>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <span className="size-4 bg-[#82ca9d] rounded-full"></span>
              <h1 className="text-sm font-normal">Nilai Anak</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <IpsSiswa data={data?.ips} />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Seni Budaya</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center">
              <span className="size-4 bg-[#8884d8] rounded-full"></span>
              <h1 className="text-sm font-normal">Nilai Rata - Rata Kelas</h1>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <span className="size-4 bg-[#82ca9d] rounded-full"></span>
              <h1 className="text-sm font-normal">Nilai Anak</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <SeniBudayaSiswa data={data?.seni_budaya} />
        </div>
      </div>
    </section>
  );
}
