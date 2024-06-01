import Kedisiplinan from "../charts/Kedisiplinan";

export default function SikapDanPerilaku() {
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
            <p className="font-light text-base">Catatan Guru disini</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-base font-normal text-center">
            Penilaian Kedisiplinan Anak <br />
            Skala (1 - 5)
          </h1>
          <Kedisiplinan />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Tanggung Jawab</h1>
          <div className="flex flex-col gap-4 w-full p-10 rounded-3xl shadow-xl shadow-blue-400 h-full">
            <h1 className="font-bold text-base">Catatan Guru</h1>
            <p className="font-light text-base">Catatan Guru disini</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-base font-normal text-center">
            Penilaian Tanggung Jawab Anak <br />
            Skala (1 - 5)
          </h1>
          <Kedisiplinan />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Adaptasi</h1>
          <div className="flex flex-col gap-4 w-full p-10 rounded-3xl shadow-xl shadow-blue-400 h-full">
            <h1 className="font-bold text-base">Catatan Guru</h1>
            <p className="font-light text-base">Catatan Guru disini</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-base font-normal text-center">
            Penilaian Adaptasi Anak <br />
            Skala (1 - 5)
          </h1>
          <Kedisiplinan />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Kerja Sama</h1>
          <div className="flex flex-col gap-4 w-full p-10 rounded-3xl shadow-xl shadow-blue-400 h-full">
            <h1 className="font-bold text-base">Catatan Guru</h1>
            <p className="font-light text-base">Catatan Guru disini</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-base font-normal text-center">
            Penilaian Kerja Sama Anak <br />
            Skala (1 - 5)
          </h1>
          <Kedisiplinan />
        </div>
      </div>

      <div className="w-full bg-white p-16 md:p-10 rounded-2xl flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl text-[#77B9E5]">Etika Belajar</h1>
          <div className="flex flex-col gap-4 w-full p-10 rounded-3xl shadow-xl shadow-blue-400 h-full">
            <h1 className="font-bold text-base">Catatan Guru</h1>
            <p className="font-light text-base">Catatan Guru disini</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-base font-normal text-center">
            Penilaian Etika Belajar Anak <br />
            Skala (1 - 5)
          </h1>
          <Kedisiplinan />
        </div>
      </div>
    </section>
  );
}
