import axios from "axios";
import { useEffect, useState } from "react";
import Kelas from "../charts/Kelas";
import Siswa from "../charts/Siswa";

export default function GuruKehadiran({ name }: { name: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async (token: string) => {
    setLoading(true);
    axios
      .get(`/api/visualisasi/guru/detail-kehadiran?nama=${name}`, {
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
          Detail Kehadiran
        </h1>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">
            Kehadiran Rata - Rata Kelas
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2">
              <span className="size-4 bg-[#0088FE] rounded-full"></span>
              <h1 className="text-sm font-normal">Hadir</h1>
            </div>
            <div className="flex flex-row gap-2">
              <span className="size-4 bg-[#0088FE] rounded-full"></span>
              <h1 className="text-sm font-normal">Izin</h1>
            </div>
            <div className="flex flex-row gap-2">
              <span className="size-4 bg-[#0088FE] rounded-full"></span>
              <h1 className="text-sm font-normal">Sakit</h1>
            </div>
            <div className="flex flex-row gap-2">
              <span className="size-4 bg-[#0088FE] rounded-full"></span>
              <h1 className="text-sm font-normal">Alfa</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <Kelas data={data?.kelas} />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Kehadiran Siswa</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2">
              <span className="size-4 bg-[#0088FE] rounded-full"></span>
              <h1 className="text-sm font-normal">Hadir</h1>
            </div>
            <div className="flex flex-row gap-2">
              <span className="size-4 bg-[#0088FE] rounded-full"></span>
              <h1 className="text-sm font-normal">Izin</h1>
            </div>
            <div className="flex flex-row gap-2">
              <span className="size-4 bg-[#0088FE] rounded-full"></span>
              <h1 className="text-sm font-normal">Sakit</h1>
            </div>
            <div className="flex flex-row gap-2">
              <span className="size-4 bg-[#0088FE] rounded-full"></span>
              <h1 className="text-sm font-normal">Alfa</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <Siswa data={data?.siswa} />
        </div>
      </div>
    </section>
  );
}
