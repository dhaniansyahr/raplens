"use client";
import Navbar from "@/components/molecules/navbar/Navbar";
import Sidebar from "@/components/molecules/sidebar/Sidebar";
import Top from "@/components/organism/orang-tua/Dashboard/section/Top";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [sideOpen, setSideOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);

  const temp = typeof window !== "undefined" && localStorage.getItem("raplens");
  const token = temp && JSON.parse(temp).token;

  const getWhises = useCallback(async () => {
    await axios
      .get("/api/siswa/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status !== 200) {
          console.log("Failed");
          return;
        }
        const data = res.data?.wishes;
        console.log("Response Berhasil : ", res);
      })
      .catch((err) => {
        console.log(err);
        console.log("Terjadi kesalahan");
      });
  }, [setData]);

  useEffect(() => {
    getWhises();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/siswa", {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Replace with your actual token
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const responseData: any = await response.json();

  //       console.log("Data : ", responseData);
  //       setData(responseData);
  //     } catch (error) {
  //       console.error("There was an error!", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <main className="w-full h-full flex flex-col bg-dashboard">
      <Navbar isOpen={sideOpen} setOpen={setSideOpen} />
      <div className="flex flex-row">
        <Sidebar isOpen={sideOpen} onClose={setSideOpen} />
        <div className="w-full h-full py-24 px-6 lg:p-24 lg:pt-[400px] flex items-center justify-center max-h-screen overflow-y-scroll">
          <Top />
        </div>
      </div>
    </main>
  );
}
