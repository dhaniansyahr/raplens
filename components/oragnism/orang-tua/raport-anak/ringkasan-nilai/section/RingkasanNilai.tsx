import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RingkasanI from "../../../Dashboard/charts/RingkasanI";
import Kehadiran from "../../../Dashboard/charts/Kehadiran";
import Sikap from "../charts/Sikap";

export default function RingkasanNilai() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <h1 className="md:text-4xl text-2xl font-bold text-white">
          Nilai Akademis
        </h1>
        <Select>
          <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
            <SelectValue placeholder="Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="GANJIL_2023/2024">
                Semester Ganjil 2023/2024
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-2">
        <div className="w-full bg-white p-2 md:p-6 rounded-lg flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Akademik</h1>
          <RingkasanI />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-2xl font-semibold">
            Nilai Rahmatul : <span className="font-normal">90</span>
          </h1>
          <h1 className="text-2xl font-semibold">
            Nilai Rata - Rata Kelas : <span className="font-normal">80</span>
          </h1>
          <h1 className="text-2xl font-semibold">
            KKM : <span className="font-normal">80</span>
          </h1>
          <h1 className="text-2xl font-semibold">Kesimpulan :</h1>
          <h3 className="text-lg font-normal">
            Rahmatul Idami mendapatkan nilai di atas rata-rata kelas.
          </h3>
          <button className="bg-white rounded-full outline-none border-none px-10 py-2 flex items-center justify-center">
            <span className="text-2xl font-semibold">
              Detail Nilai Pelajaran Akademik
            </span>
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-2">
        <div className="w-full bg-white p-2 md:p-6 rounded-lg flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Non - Akademik</h1>
          <RingkasanI />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-2xl font-semibold">
            Nilai Rahmatul : <span className="font-normal">B</span>
          </h1>
          <h1 className="text-2xl font-semibold">
            Rata - Rata Kelas : <span className="font-normal">BC</span>
          </h1>
          <h1 className="text-2xl font-semibold">Kesimpulan :</h1>
          <h3 className="text-lg font-normal">
            Rahmatul Idami meraih nilai non - akademik diatas rata - rata kelas.
          </h3>
          <button className="bg-white rounded-full outline-none border-none px-10 py-2 flex items-center justify-center">
            <span className="text-2xl font-semibold">
              Detail Nilai Pelajaran Non - Akademik
            </span>
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-2">
        <div className="w-full bg-white p-2 md:p-6 rounded-lg flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Kehadiran</h1>
          <Kehadiran />
          <div className="grid grid-cols-2">
            <div className="flex flex-row gap-2 items-center justify-center w-full">
              <span className="size-4 bg-[#0088FE] rounded-full"></span>
              <h1 className="text-sm font-normal">Hadir</h1>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center w-full">
              <span className="size-4 bg-[#0088FE] rounded-full"></span>
              <h1 className="text-sm font-normal">Izin</h1>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center w-full">
              <span className="size-4 bg-[#0088FE] rounded-full"></span>
              <h1 className="text-sm font-normal">Sakit</h1>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center w-full">
              <span className="size-4 bg-[#0088FE] rounded-full"></span>
              <h1 className="text-sm font-normal">Alfa</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-2xl font-semibold">
            Persentase Kehadiran : <span className="font-normal">96%</span>
          </h1>
          <h1 className="text-2xl font-semibold">
            Izin : <span className="font-normal">10 Hari</span>
          </h1>
          <h1 className="text-2xl font-semibold">
            Sakit : <span className="font-normal">5 Hari</span>
          </h1>
          <h1 className="text-2xl font-semibold">
            Alfa : <span className="font-normal">2 Hari</span>
          </h1>
          <h1 className="text-2xl font-semibold">Kesimpulan :</h1>
          <h3 className="text-lg font-normal">
            Terhitung 2 hari Rahmatul Idami Tidak ada kabar mengenai
            kehadirannya.
          </h3>
          <button className="bg-white rounded-full outline-none border-none px-10 py-2 flex items-center justify-center">
            <span className="text-2xl font-semibold">Detail Kehadiran</span>
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-2">
        <div className="w-full bg-white p-2 md:p-6 rounded-lg flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Sikap dan Perilaku</h1>
          <Sikap />
          <div className="grid grid-cols-2">
            <div className="flex flex-row gap-2 items-center justify-center w-full">
              <span className="size-4 bg-[#0088FE] rounded-full"></span>
              <h1 className="text-sm font-normal">Hadir</h1>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center w-full">
              <span className="size-4 bg-[#0088FE] rounded-full"></span>
              <h1 className="text-sm font-normal">Izin</h1>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center w-full">
              <span className="size-4 bg-[#0088FE] rounded-full"></span>
              <h1 className="text-sm font-normal">Sakit</h1>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center w-full">
              <span className="size-4 bg-[#0088FE] rounded-full"></span>
              <h1 className="text-sm font-normal">Alfa</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-2xl font-semibold">Kesimpulan :</h1>
          <ol className="text-lg font-normal">
            <li>
              1. Rahmatul Idami unggul dalam sikap kemampuan untuk beradaptasi.
            </li>
            <li>2. Rahmatul Idami sangat baik dalam sikap etika kerja.</li>
            <li>
              3. Rahmatul Idami masih harus meningkatkan sikap kedisiplinan,
              tanggung jawab, serta kerjasama
            </li>
          </ol>
          <button className="bg-white rounded-full outline-none border-none px-10 py-2 flex items-center justify-center">
            <span className="text-2xl font-semibold">
              Detail Nilai Sikap dan Perilaku
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
