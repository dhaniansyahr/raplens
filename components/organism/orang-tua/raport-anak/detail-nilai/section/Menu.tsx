import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiGraduationCapLine } from "react-icons/ri";
import useIsMobile from "@/hooks/UseIsMobiile";
import { FaUserClock } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { PiNotepadBold } from "react-icons/pi";
import { useRouter } from "next/navigation";

export default function Menu() {
  const isMobile = useIsMobile();
  const router = useRouter();

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
        <h1 className="md:text-4xl text-2xl font-bold text-white">
          Detail Nilai
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

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <div className="w-full h-full lg:max-h-[280px] p-10 bg-white rounded-3xl flex items-center justify-center">
            <RiGraduationCapLine size={isMobile ? 100 : 250} />
          </div>

          <button
            className="bg-white rounded-full outline-none border-none px-10 py-2 flex items-center justify-center"
            onClick={() =>
              router.push("/orang-tua/raport-anak/detail-nilai/akademik")
            }
          >
            <span className="text-2xl font-semibold">Akademik</span>
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <div className="w-full h-full max-h-[280px] p-10 bg-white rounded-3xl flex items-center justify-center">
            <FaUserClock size={isMobile ? 100 : 250} />
          </div>

          <button
            className="bg-white rounded-full outline-none border-none px-10 py-2 flex items-center justify-center"
            onClick={() =>
              router.push("/orang-tua/raport-anak/detail-nilai/non-akademik")
            }
          >
            <span className="text-2xl font-semibold">Non - Akademik</span>
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <div className="w-full h-full max-h-[280px] p-10 bg-white rounded-3xl flex items-center justify-center">
            <PiNotepadBold size={isMobile ? 100 : 250} />
          </div>

          <button
            className="bg-white rounded-full outline-none border-none px-10 py-2 flex items-center justify-center"
            onClick={() =>
              router.push("/orang-tua/raport-anak/detail-nilai/kehadiran")
            }
          >
            <span className="text-2xl font-semibold">Kehadiran</span>
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <div className="w-full h-full max-h-[280px] p-10 bg-white rounded-3xl flex items-center justify-center">
            <FaUserGroup size={isMobile ? 100 : 250} />
          </div>

          <button
            className="bg-white rounded-full outline-none border-none px-10 py-2 flex items-center justify-center"
            onClick={() =>
              router.push(
                "/orang-tua/raport-anak/detail-nilai/sikap-dan-perilaku"
              )
            }
          >
            <span className="text-2xl font-semibold">Sikap dan Perilaku</span>
          </button>
        </div>
      </div>
    </section>
  );
}
