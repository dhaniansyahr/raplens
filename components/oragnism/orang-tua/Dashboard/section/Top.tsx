import { useRouter } from "next/navigation";
import GrafikNilai from "../charts/GrafikNilai";
import Kehadiran from "../charts/Kehadiran";
import NonAkademik from "../charts/NonAkademik";
import RingkasanI from "../charts/RingkasanI";

export default function Top() {
  const tanggal = new Date().toLocaleDateString();
  const router = useRouter();

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-row gap-4 justify-center items-center w-full">
        <div className="flex flex-col gap-4 w-full">
          <span className="text-xl font-normal text-black">Nama Anak</span>
          <div className="p-2 bg-white rounded-2xl">Rahmatul Idami</div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <span className="text-xl font-normal">Kelas</span>
          <div className="p-2 bg-white rounded-2xl text-center">
            7 (VII) - 1
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full items-center">
        <h1 className="text-4xl font-normal text-center">
          Grafik Penilaian Tiap Semester
        </h1>

        <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-2">
          <div className="w-full bg-white p-2 md:p-6 rounded-lg">
            <GrafikNilai />
          </div>
          <div className="flex flex-col gap-4 w-full items-center justify-center">
            <h1 className="text-2xl font-semibold">
              Ingin tahu seberapa jauh nilai anak Anda berkembang?
            </h1>
            <h3 className="text-lg font-normal">
              Fitur ini memungkinkan Anda untuk melihat perbandingan nilai anak
              dari semester lalu secara detail. Anda dapat melihat nilai anak di
              setiap mata pelajaran, serta perbedaan nilai anak anda dari
              semester ke semester.
            </h3>
            <button
              className="bg-white rounded-full outline-none border-none px-10 py-2 flex items-center justify-center"
              onClick={() => router.push("/orang-tua/dashboard/nilai-akademis")}
            >
              <span className="text-2xl font-semibold">
                Lihat Kemajuan Anak
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full items-center">
        <h1 className="text-4xl font-normal text-center">Ringkasan</h1>

        <div className="w-full flex flex-col items-center justify-center gap-4 md:grid md:grid-cols-2">
          <div className="w-full bg-white p-2 md:p-6 rounded-lg flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Akademik</h1>
            <RingkasanI />
          </div>
          <div className="w-full bg-white p-2 md:p-6 rounded-lg flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Non - Akademik</h1>
            <NonAkademik />
          </div>
        </div>
        <button
          className="bg-white rounded-full outline-none border-none px-10 py-2 flex items-center justify-center"
          onClick={() => router.push("/orang-tua/raport-anak/ringkasan-nilai")}
        >
          <span className="text-2xl font-semibold">Lihat Raport Anak</span>
        </button>
      </div>

      <div className="flex flex-col gap-6 w-full items-center">
        <div className="w-full flex md:flex-row flex-col items-center justify-center gap-4 px-10 py-4 bg-blue-400 rounded-xl">
          <div className="w-full h-full p-2 md:p-6 rounded-lg flex flex-col gap-4">
            <Kehadiran />
          </div>
          <div className="w-full p-2 flex flex-col gap-4 items-center">
            <h1 className="text-3xl font-bold">
              Persentase Kehadiran Semester Ini
            </h1>
            <p>
              Data diambil dari tanggal {tanggal} sampai dengan {tanggal}
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2 items-center">
                <span className="size-2 bg-[#0088FE] rounded-full"></span>
                <h1 className="text-sm font-normal">Hadir</h1>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <span className="size-2 bg-[#00C49F] rounded-full"></span>
                <h1 className="text-sm font-normal">Izin</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
