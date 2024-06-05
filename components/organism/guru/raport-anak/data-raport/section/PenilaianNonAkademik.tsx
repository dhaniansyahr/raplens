import { Input } from "@/components/ui/input";
import React from "react";

const PenilaianNonAkademik = () => {
  return (
    <div className="w-full flex flex-col gap-6 items-center justify-center">
      <h1 className="font-semibold text-2xl">Penilaian Non-Akademis</h1>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="w-full flex items-center justify-center">
            <span className="text-xl font-normal">Ekstrakurikuler</span>
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
            <span className="text-xl font-normal">Olahraga</span>
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Angka Olahraga" className="shadow-lg" />
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Huruf Olahraga" className="shadow-lg" />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
            <span className="text-xl font-normal">Olimpiade</span>
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Angka Olimpiade" className="shadow-lg" />
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Huruf Olimpiade" className="shadow-lg" />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
            <span className="text-xl font-normal">Seni</span>
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Angka Seni" className="shadow-lg" />
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Huruf Seni" className="shadow-lg" />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
            <span className="text-xl font-normal">keterampilan</span>
          </div>
          <div className="w-full">
            <Input
              placeholder="Nilai Angka keterampilan"
              className="shadow-lg"
            />
          </div>
          <div className="w-full">
            <Input
              placeholder="Nilai Huruf keterampilan"
              className="shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PenilaianNonAkademik;
