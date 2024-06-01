import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Mingguan from "../charts/Mingguan";

export default function Kehadiran() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
        <h1 className="md:text-4xl text-2xl font-bold text-white">
          Detail Kehadiran
        </h1>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Mingguan</h1>
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
          <Select>
            <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
              <SelectValue placeholder="Minggu 3" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="GANJIL_2023/2024">Minggu 3</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Mingguan />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Bulanan</h1>
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
          <Select>
            <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
              <SelectValue placeholder="Bulanan" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="JANUARI">Januari</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Mingguan />
        </div>
      </div>
    </section>
  );
}
