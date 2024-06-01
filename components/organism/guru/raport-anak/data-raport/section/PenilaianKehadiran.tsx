import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const PenilaianKehadiran = () => {
  return (
    <div className="w-full flex flex-col gap-6 items-center justify-center">
      <h1 className="font-semibold text-2xl">Penilaian Kehadiran</h1>
      <div className="flex flex-col gap-4 w-full items-center justify-center">
        <Select>
          <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full bg-[#BCF7FF] shadow-md">
            <SelectValue placeholder="Bulan" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="GANJIL_2023/2024">Januari</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Matematika */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-6 max-w-lg">
          <div className="w-full flex items-center justify-center h-10">
            <span className="text-xl font-normal">Senin</span>
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <span className="text-xl font-normal">Selasa</span>
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <span className="text-xl font-normal">Rabu</span>
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <span className="text-xl font-normal">Kamis</span>
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <span className="text-xl font-normal">Jumat</span>
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <span className="text-xl font-normal">Sabtu</span>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-6 w-full max-w-lg">
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="senin" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="selasa" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="rabu" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="kamis" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="jumat" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="sabtu" />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-6 w-full max-w-lg">
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="senin" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="selasa" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="rabu" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="kamis" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="jumat" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="sabtu" />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-6 w-full max-w-lg">
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="senin" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="selasa" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="rabu" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="kamis" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="jumat" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="sabtu" />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-6 w-full max-w-lg">
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="senin" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="selasa" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="rabu" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="kamis" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="jumat" />
          </div>
          <div className="w-full flex items-center justify-center h-10">
            <Checkbox id="sabtu" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PenilaianKehadiran;
