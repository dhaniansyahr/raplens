import { Input } from "@/components/ui/input";
import React from "react";

const PenilaianAkademik = () => {
  return (
    <div className="w-full flex flex-col gap-6 items-center justify-center">
      <h1 className="font-semibold text-2xl">Penilaian Akademis</h1>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="w-full flex items-center justify-center">
            <span className="text-xl font-normal">Mata Pelajaran</span>
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
            <span className="text-xl font-normal">Matematika</span>
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Angka Matematika" className="shadow-lg" />
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Huruf Matematika" className="shadow-lg" />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
            <span className="text-xl font-normal">Bahasa Indonesia</span>
          </div>
          <div className="w-full">
            <Input
              placeholder="Nilai Angka Bahasa Indonesia"
              className="shadow-lg"
            />
          </div>
          <div className="w-full">
            <Input
              placeholder="Nilai Huruf Bahasa Indonesia"
              className="shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
            <span className="text-xl font-normal">Bahasa Inggris</span>
          </div>
          <div className="w-full">
            <Input
              placeholder="Nilai Angka Bahasa Inggris"
              className="shadow-lg"
            />
          </div>
          <div className="w-full">
            <Input
              placeholder="Nilai Huruf Bahasa Inggris"
              className="shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
            <span className="text-xl font-normal">IPA</span>
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Angka IPA" className="shadow-lg" />
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Huruf IPA" className="shadow-lg" />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
            <span className="text-xl font-normal">IPS</span>
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Angka IPS" className="shadow-lg" />
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Huruf IPS" className="shadow-lg" />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
            <span className="text-xl font-normal">Kesenian</span>
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Angka Kesenian" className="shadow-lg" />
          </div>
          <div className="w-full">
            <Input placeholder="Nilai Huruf Kesenian" className="shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PenilaianAkademik;
