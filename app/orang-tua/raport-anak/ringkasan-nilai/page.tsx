"use client";
import Navbar from "@/components/molecules/navbar/Navbar";
import Sidebar from "@/components/molecules/sidebar/Sidebar";
import RingkasanNilai from "@/components/organism/orang-tua/raport-anak/ringkasan-nilai/section/RingkasanNilai";
import { useState } from "react";

export default function Page() {
  const [sideOpen, setSideOpen] = useState<boolean>(false);

  return (
    <main className="w-full h-full flex flex-col bg-dashboard">
      <Navbar isOpen={sideOpen} setOpen={setSideOpen} />
      <div className="flex flex-row">
        <Sidebar isOpen={sideOpen} onClose={setSideOpen} />
        <div className="w-full py-24 px-6 lg:p-24 lg:pt-[100px] max-h-screen overflow-y-scroll">
          <RingkasanNilai />
        </div>
      </div>
    </main>
  );
}
