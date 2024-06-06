import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import AkademikSiswa from "../charts/AkademikSiswa";
import NonAkademikSiswa from "../charts/NonAkademikSiswa";
import KehadiranSiswa from "../charts/KehadiranSiswa";
import SikapDanPerilakuSiswa from "../charts/SikapDanPerilakuSiswa";
import { useAuth } from "@/hooks/useAuth";

export default function RingkasanNilai() {
  const router = useRouter();
  const auth = useAuth();

  const [semester, setSemester] = useState<string>("");
  const [dataSemester, setDataSemester] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const getSemester = () => {
    axios
      .get("/api/semester", {
        headers: {
          Authorization: `Bearer ${auth.auth?.accessToken}`,
        },
      })
      .then((res) => {
        setDataSemester(res.data.data);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const getVisualisasi = async () => {
    axios
      .get(`/api/visualisasi/orang-tua?semesterId=${semester}`, {
        headers: {
          Authorization: `Bearer ${auth.auth?.accessToken}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch(() => {
        console.log("Data gagal diambil!");
      });
  };

  useEffect(() => {
    getSemester();
    getVisualisasi();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
        <h1 className="md:text-4xl text-2xl font-bold text-white">
          Nilai Akademis
        </h1>
        <Select
          value={semester}
          onValueChange={(onchange) => setSemester(onchange)}
        >
          <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
            <SelectValue placeholder="Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Array.isArray(dataSemester) &&
                dataSemester.map((item: any) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-2">
        <div className="w-full bg-white p-2 md:p-6 rounded-lg flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Akademik</h1>
          <AkademikSiswa datas={data?.akademik?.visualisasi} />
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
              router.push("/orang-tua/raport-anak/detail-nilai/akademik")
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
          <NonAkademikSiswa datas={data?.nonAkademik?.visualisasi} />
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
              router.push("/orang-tua/raport-anak/detail-nilai/non-akademik")
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
          <KehadiranSiswa datas={data?.kehadiran} />
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
            <span className="font-normal">{data.kehadiran?.izin} Hari</span>
          </h1>
          <h1 className="text-2xl font-semibold">
            Sakit :{" "}
            <span className="font-normal">{data.kehadiran?.sakit} Hari</span>
          </h1>
          <h1 className="text-2xl font-semibold">
            Alfa :{" "}
            <span className="font-normal">{data.kehadiran?.alpa} Hari</span>
          </h1>
          <h1 className="text-2xl font-semibold">Kesimpulan :</h1>
          <h3 className="text-lg font-normal">{data.kehadiran?.kesimpulan}</h3>
          <button
            className="bg-white rounded-full outline-none border-none px-10 py-2 flex items-center justify-center"
            onClick={() =>
              router.push("/orang-tua/raport-anak/detail-nilai/kehadiran")
            }
          >
            <span className="text-2xl font-semibold">Detail Kehadiran</span>
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-2">
        <div className="w-full bg-white p-2 md:p-6 rounded-lg flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Sikap dan Perilaku</h1>
          <SikapDanPerilakuSiswa datas={data?.sikap?.visualisasi} />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-2xl font-semibold">Kesimpulan :</h1>
          <h3 className="text-lg font-normal">{data.sikap?.kesimpulan}</h3>
          <button
            className="bg-white rounded-full outline-none border-none px-10 py-2 flex items-center justify-center"
            onClick={() =>
              router.push(
                "/orang-tua/raport-anak/detail-nilai/sikap-dan-perilaku"
              )
            }
          >
            <span className="text-2xl font-semibold">
              Detail Nilai Sikap dan Perilaku
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
