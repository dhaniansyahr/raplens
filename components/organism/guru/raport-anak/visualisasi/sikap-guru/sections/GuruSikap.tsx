import { useEffect, useState } from "react";
import Kedisiplinan from "../charts/Kedisplinan";
import TanggungJawab from "../charts/TanggungJawab";
import KerjaSama from "../charts/KerjaSama";
import Adaptasi from "../charts/Adaptasi";
import EtikaBelajar from "../charts/EtikaBelajar";
import axios from "axios";

export default function GuruSikap({ name }: { name: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async (token: string) => {
    setLoading(true);
    axios
      .get(`/api/visualisasi/guru/detail-sikap?nama=${name}`, {
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
          Detail Sikap dan Perilaku
        </h1>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Kedisiplinan</h1>
          <div className="flex flex-col gap-4 w-full p-10 rounded-3xl shadow-xl shadow-blue-400 h-full">
            <h1 className="font-bold text-base">Catatan Guru</h1>
            <p className="font-light text-base">
              {data?.notesGuru?.kedisiplinan.catatan}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-base font-normal text-center">
            Penilaian Kedisiplinan Anak
          </h1>
          <Kedisiplinan data={data?.kedisiplinan} />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Tanggung Jawab</h1>
          <div className="flex flex-col gap-4 w-full p-10 rounded-3xl shadow-xl shadow-blue-400 h-full">
            <h1 className="font-bold text-base">Catatan Guru</h1>
            <p className="font-light text-base">
              {data?.notesGuru?.tanggungJawab.catatan}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-base font-normal text-center">
            Penilaian Tanggung Jawab Anak
          </h1>
          <TanggungJawab data={data?.tanggungJawab} />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Adaptasi</h1>
          <div className="flex flex-col gap-4 w-full p-10 rounded-3xl shadow-xl shadow-blue-400 h-full">
            <h1 className="font-bold text-base">Catatan Guru</h1>
            <p className="font-light text-base">
              {data?.notesGuru?.adaptasi.catatan}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-base font-normal text-center">
            Penilaian Adaptasi Anak
          </h1>
          <KerjaSama data={data?.kerjaSama} />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Kerja Sama</h1>
          <div className="flex flex-col gap-4 w-full p-10 rounded-3xl shadow-xl shadow-blue-400 h-full">
            <h1 className="font-bold text-base">Catatan Guru</h1>
            <p className="font-light text-base">
              {data?.notesGuru?.kerjaSama?.catatan}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-base font-normal text-center">
            Penilaian Kerja Sama Anak
          </h1>
          <Adaptasi data={data?.adaptasi} />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Etika Belajar</h1>
          <div className="flex flex-col gap-4 w-full p-10 rounded-3xl shadow-xl shadow-blue-400 h-full">
            <h1 className="font-bold text-base">Catatan Guru</h1>
            <p className="font-light text-base">
              {data?.notesGuru?.etikaBelajar.catatan}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-base font-normal text-center">
            Penilaian Etika Belajar Anak
          </h1>
          <EtikaBelajar data={data?.etikaBelajar} />
        </div>
      </div>
    </section>
  );
}
