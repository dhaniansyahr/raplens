import axios from "axios";
import { useEffect, useState } from "react";
import Matematika from "../charts/Matematika";
import BahasaIndonesia from "../charts/BahasaIndonesia";
import Ipa from "../charts/Ipa";
import Ips from "../charts/Ips";
import SeniBudaya from "../charts/SeniBudaya";
import { useAuth } from "@/hooks/useAuth";

export default function GuruAkademik({ name }: { name: string }) {
  const auth = useAuth();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    axios
      .get(`/api/visualisasi/guru/detail-akademik?nama=${name}`, {
        headers: {
          Authorization: `Bearer ${auth.auth?.accessToken}`,
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
    getData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

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
          <BahasaIndonesia data={data?.bahasa_indonesia} />
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
          <Ipa data={data?.ipa} />
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
          <Ips data={data?.ips} />
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
          <SeniBudaya data={data?.seni_budaya} />
        </div>
      </div>
    </section>
  );
}
