"use client";
import Navbar from "@/components/molecules/navbar/Navbar";
import Sidebar from "@/components/molecules/sidebar/Sidebar";
import GuruKehadiran from "@/components/organism/guru/raport-anak/visualisasi/kehadiran-guru/sections/GuruKehadiran";
import Kehadiran from "@/components/organism/orang-tua/raport-anak/detail-nilai/kehadiran/section/Kehadiran";
import { useState } from "react";

export default function Page({ params }: { params: { name: string } }) {
  const [sideOpen, setSideOpen] = useState<boolean>(false);

  return (
    <main className="w-full h-full flex flex-col bg-dashboard">
      <Navbar isOpen={sideOpen} setOpen={setSideOpen} />
      <div className="flex flex-row">
        <Sidebar isOpen={sideOpen} onClose={setSideOpen} />
        <div className="w-full h-full py-24 px-6 lg:p-24 lg:pt-[125px] max-h-screen overflow-y-scroll">
          <GuruKehadiran name={params.name} />
        </div>
      </div>
    </main>
  );
}
