import Akademik from "../charts/Akademik";

export default function GrafikAkademik() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-6 w-full items-center">
        <h1 className="text-4xl font-normal text-center">
          Grafik Penilaian Tiap Semester
        </h1>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full bg-white p-2 md:p-6 rounded-lg">
            <Akademik />
          </div>
        </div>
      </div>
    </section>
  );
}
