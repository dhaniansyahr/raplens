import { Input } from "@/components/ui/input";
import React from "react";

const PenilaianSikapDanPerilaku = () => {
  return (
    <div className="w-full flex flex-col gap-6 items-center justify-center">
      <h1 className="font-semibold text-2xl">Penilaian Sikap dan Perilaku</h1>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="w-full flex items-center justify-center">
            <span className="text-xl font-normal">Sikap/Perilaku</span>
          </div>
          <div className="w-full flex items-center justify-center">
            <span className="text-xl font-normal">Nilai Angka</span>
          </div>
          <div className="w-full flex items-center justify-center">
            <span className="text-xl font-normal">Nilai Huruf</span>
          </div>
        </div>

        {/* Matematika */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
            <span className="text-xl font-normal">Kedisiplinan</span>
          </div>
          <div className="w-full">
            <Input
              placeholder="Nilai Angka Kedisiplinan"
              className="shadow-lg"
            />
          </div>
          <div className="w-full">
            <Input
              placeholder="Nilai Huruf Kedisiplinan"
              className="shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
            <span className="text-xl font-normal">Tanggung Jawab</span>
          </div>
          <div className="w-full">
            <Input
              placeholder="Nilai Angka Tanggung Jawab"
              className="shadow-lg"
            />
          </div>
          <div className="w-full">
            <Input
              placeholder="Nilai Huruf Tanggung Jawab"
              className="shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
            <span className="text-xl font-normal">Kerja Sama</span>
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Angka Kerja Sama" className="shadow-lg" />
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Huruf Kerja Sama" className="shadow-lg" />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
            <span className="text-xl font-normal">Adaptasi</span>
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Angka Adaptasi" className="shadow-lg" />
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Huruf Adaptasi" className="shadow-lg" />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
            <span className="text-xl font-normal">Etika Belajar</span>
          </div>
          <div className="w-full">
            <Input
              placeholder="Nilai Angka Etika Belajar"
              className="shadow-lg"
            />
          </div>
          <div className="w-full">
            <Input
              placeholder="Nilai Huruf Etika Belajar"
              className="shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PenilaianSikapDanPerilaku;
