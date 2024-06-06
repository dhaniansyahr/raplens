import { useEffect, useState } from "react";
import Olahraga from "../charts/OlahragaSiswa";
import axios from "axios";
import OlahragaSiswa from "../charts/OlahragaSiswa";
import SeniSiswa from "../charts/SeniSiswa";
import OlimpiadeSiswa from "../charts/OlimpiadeSiswa";
import KeterampilanSiswa from "../charts/KeterampilanSiswa";
import { useAuth } from "@/hooks/useAuth";

export default function Nonakademik() {
  const auth = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    axios
      .get("/api/visualisasi/orang-tua/detail-non-akademik", {
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

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
        <h1 className="md:text-4xl text-2xl font-bold text-white">
          Detail Nilai Non-Akademis
        </h1>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Olahraga</h1>
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
          <h1 className="text-base font-normal">
            Tingkat Partisipasi Anak Dalam Ekstrakulikuler Olahraga
          </h1>
          <OlahragaSiswa data={data?.olahraga} />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Seni</h1>
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
          <h1 className="text-base font-normal">
            Tingkat Partisipasi Anak Dalam Ekstrakulikuler Seni
          </h1>

          <SeniSiswa data={data?.seni} />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Olimpiade</h1>
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
          <h1 className="text-base font-normal">
            Tingkat Partisipasi Anak Dalam Ekstrakulikuler Olimpiade
          </h1>

          <OlimpiadeSiswa data={data?.olimpiade} />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Keterampilan</h1>
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
          <h1 className="text-base font-normal">
            Tingkat Partisipasi Anak Dalam Ekstrakulikuler Keterampilan
          </h1>

          <KeterampilanSiswa data={data?.keterampilan} />
        </div>
      </div>
    </section>
  );
}
