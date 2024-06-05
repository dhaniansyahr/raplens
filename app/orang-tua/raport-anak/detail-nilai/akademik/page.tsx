"use client";
import Navbar from "@/components/molecules/navbar/Navbar";
import Sidebar from "@/components/molecules/sidebar/Sidebar";
import Akademik from "@/components/organism/orang-tua/raport-anak/detail-nilai/akademik/section/Akademik";
import { useState } from "react";

export default function Page() {
  const [sideOpen, setSideOpen] = useState<boolean>(false);

  return (
    <main className="w-full h-full flex flex-col bg-dashboard">
      <Navbar isOpen={sideOpen} setOpen={setSideOpen} />
      <div className="flex flex-row">
        <Sidebar isOpen={sideOpen} onClose={setSideOpen} />
        <div className="w-full h-full py-24 px-6 lg:p-24 lg:pt-[125px] max-h-screen overflow-y-scroll">
          <Akademik />
        </div>
      </div>
    </main>
  );
}
