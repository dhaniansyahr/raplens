import { Input } from "@/components/ui/input";
import PenilaianAkademik from "./PenilaianAkademik";
import PenilaianNonAkademik from "./PenilaianNonAkademik";
import PenilaianSikapDanPerilaku from "./PenilaianSikapDanPerilaku";
import PenilaianKehadiran from "./PenilaianKehadiran";

export default function TambahNilai() {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 max-w-md">
        <h1 className="font-normal text-lg">Nama Siswa</h1>
        <Input placeholder="Nama Siswa" />
      </div>

      <PenilaianAkademik />
      <PenilaianNonAkademik />
      <PenilaianSikapDanPerilaku />
      <PenilaianKehadiran />

      <div className="flex flex-row gap-6 w-full items-center justify-center">
        <button className="bg-[#58D68D] w-[150px] rounded-full px-6 py-3 outline-none border-none shadow max-w-[300px] flex items-center justify-center">
          <span className="text-black font-normal text-2xl">Simpan</span>
        </button>
        <button className="bg-[#FB9486] w-[150px] rounded-full px-6 py-3 outline-none border-none shadow max-w-[300px] flex items-center justify-center">
          <span className="text-black font-normal text-2xl">Batal</span>
        </button>
      </div>
    </section>
  );
}
