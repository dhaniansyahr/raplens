import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AkademikLineChart from "../charts/AkademikLineChart";

export default function NilaiAkademisSection() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <h1 className="md:text-4xl text-2xl font-bold text-white">
          Nilai Akademis
        </h1>
        <Select>
          <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
            <SelectValue placeholder="Mata Pelajaran" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="MATEMATIKA">Matematika</SelectItem>
              <SelectItem value="FISIKA">Fisika</SelectItem>
              <SelectItem value="BIOLOGI">Biologi</SelectItem>
              <SelectItem value="KIMIA">Kimia</SelectItem>
              <SelectItem value="EKONOMI">Ekonomi</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-6 md:flex-row bg-white rounded-3xl p-6 lg:p-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl text-[#77B9E5]">Matematika</h1>
          <div className="flex flex-row gap-2 items-center">
            <span className="size-4 bg-[#0088FE] rounded-full"></span>
            <h1 className="text-sm font-normal">Nilai Siswa/i</h1>
          </div>
        </div>
        <div className="w-full">
          <AkademikLineChart />
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <h1 className="md:text-4xl text-2xl font-bold text-white">
          Nilai Non - Akademis
        </h1>
        <Select>
          <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
            <SelectValue placeholder="Mata Pelajaran" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="MATEMATIKA">Matematika</SelectItem>
              <SelectItem value="FISIKA">Fisika</SelectItem>
              <SelectItem value="BIOLOGI">Biologi</SelectItem>
              <SelectItem value="KIMIA">Kimia</SelectItem>
              <SelectItem value="EKONOMI">Ekonomi</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-6 md:flex-row bg-white rounded-3xl p-6 lg:p-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl text-[#77B9E5]">Matematika</h1>
          <div className="flex flex-row gap-2 items-center">
            <span className="size-4 bg-[#0088FE] rounded-full"></span>
            <h1 className="text-sm font-normal">Nilai Siswa/i</h1>
          </div>
        </div>
        <div className="w-full">
          <AkademikLineChart />
        </div>
      </div>
    </section>
  );
}
