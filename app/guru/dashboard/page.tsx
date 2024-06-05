"use client";
import Navbar from "@/components/molecules/navbar/Navbar";
import Sidebar from "@/components/molecules/sidebar/Sidebar";
import TableSiswa from "@/components/organism/guru/dashboard/table/TableSiswa";
import { useState } from "react";

import { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [sideOpen, setSideOpen] = useState<boolean>(false);

  return (
    <main className="w-full h-full flex flex-col bg-dashboard">
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: "#525252",
            color: "#fff",
            fontSize: "12px",
          },
        }}
      />
      <Navbar isOpen={sideOpen} setOpen={setSideOpen} />
      <div className="flex flex-row">
        <Sidebar isOpen={sideOpen} onClose={setSideOpen} />
        <div className="w-full h-full py-24 px-6 lg:p-24 lg:pt-[150px] max-h-screen overflow-y-scroll">
          <TableSiswa />
        </div>
      </div>
    </main>
  );
}
