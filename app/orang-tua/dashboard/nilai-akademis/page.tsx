"use client";
import Navbar from "@/components/molecules/navbar/Navbar";
import Sidebar from "@/components/molecules/sidebar/Sidebar";
import NilaiAkademisSection from "@/components/organism/orang-tua/Dashboard/section/NilaiAkademisSection";
import { useState } from "react";

export default function Page() {
  const [sideOpen, setSideOpen] = useState<boolean>(false);

  return (
    <main className="w-full h-full flex flex-col bg-dashboard">
      <Navbar isOpen={sideOpen} setOpen={setSideOpen} />
      <div className="flex flex-row">
        <Sidebar isOpen={sideOpen} onClose={setSideOpen} />
        <div className="w-full h-full py-24 px-6 lg:p-24 lg:pt-[150px] max-h-screen overflow-y-scroll">
          <NilaiAkademisSection />
        </div>
      </div>
    </main>
  );
}
