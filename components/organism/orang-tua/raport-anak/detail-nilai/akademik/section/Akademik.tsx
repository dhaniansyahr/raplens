import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Matematika from "../charts/Matematika";

export default function Akademik() {
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
          <Select>
            <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
              <SelectValue placeholder="Tugas" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="GANJIL_2023/2024">Tugas</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Matematika />
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
          <Select>
            <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
              <SelectValue placeholder="Tugas" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="GANJIL_2023/2024">Tugas</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Matematika />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Bahasa Inggris</h1>
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
          <Select>
            <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
              <SelectValue placeholder="Tugas" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="GANJIL_2023/2024">Tugas</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Matematika />
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
          <Select>
            <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
              <SelectValue placeholder="Tugas" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="GANJIL_2023/2024">Tugas</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Matematika />
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
          <Select>
            <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
              <SelectValue placeholder="Tugas" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="GANJIL_2023/2024">Tugas</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Matematika />
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
          <Select>
            <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
              <SelectValue placeholder="Tugas" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="GANJIL_2023/2024">Tugas</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Matematika />
        </div>
      </div>
    </section>
  );
}
