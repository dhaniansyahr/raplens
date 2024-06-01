"use client";
import Navbar from "@/components/molecules/navbar/Navbar";
import Sidebar from "@/components/molecules/sidebar/Sidebar";
import TableSiswa from "@/components/organism/guru/dashboard/table/TableSiswa";
import { useState } from "react";

export default function Dashboard() {
  const [sideOpen, setSideOpen] = useState<boolean>(false);

  return (
    <main className="w-full h-full flex flex-col bg-dashboard">
      <Navbar isOpen={sideOpen} setOpen={setSideOpen} />
      <div className="flex flex-row">
        <Sidebar isOpen={sideOpen} onClose={setSideOpen} />
        <div className="w-full h-full py-24 px-6 lg:p-24 lg:pt-[150px] flex items-center justify-center max-h-screen overflow-y-scroll">
          <TableSiswa />
        </div>
      </div>
    </main>
  );
}
