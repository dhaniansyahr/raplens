"use client";
import Image from "next/image";
import { HiMiniChevronDoubleLeft } from "react-icons/hi2";
import { HiOutlineBookmarkAlt } from "react-icons/hi";
import { RiCoinsLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import useIsMobile from "@/hooks/UseIsMobiile";
import { IoIosArrowDown } from "react-icons/io";

type sidebarProps = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
};

export default function Sidebar({ isOpen, onClose }: sidebarProps) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(true);

  return (
    <>
      {isMobile ? (
        <motion.div
          initial={{ width: "0px" }}
          animate={{
            width: isOpen ? "260px" : "0px",
            position: "fixed",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            zIndex: 20,
          }}
          transition={{
            duration: 0.5,
          }}
          className={`${
            isOpen
              ? "h-screen bg-white flex flex-col gap-4 py-10 px-6"
              : "hidden"
          }`}
        >
          <div className={`flex items-center w-full justify-end`}>
            <HiMiniChevronDoubleLeft
              size={22}
              className={`cursor-pointer ${isOpen ? "" : "rotate-180"}`}
              onClick={() => onClose(!isOpen)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div
              className={`flex flex-row gap-3 p-3 items-center rounded cursor-pointer ${
                pathname.includes("dashboard")
                  ? "bg-[#5DADE2] bg-opacity-10 rounded-md"
                  : "text-neutral-600"
              }`}
              onClick={() => router.push("/orang-tua/dashboard")}
            >
              <MdOutlineDashboard size={24} className="flex-shrink-0" />
              {isOpen && (
                <motion.h1
                  initial={{ visibility: "visible" }}
                  animate={{
                    visibility: isOpen ? "visible" : "hidden",
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="text-base leading-6 font-medium"
                >
                  Dashboard
                </motion.h1>
              )}
            </div>

            <div
              className={`flex justify-between items-center cursor-pointer ${
                pathname.includes("raport-anak")
                  ? "bg-[#5DADE2] bg-opacity-10 rounded-md"
                  : "text-neutral-600"
              }`}
              onClick={() => setOpen(!open)}
            >
              <div
                className={`flex flex-row gap-3 p-3 items-center rounded cursor-pointer`}
              >
                <TbReport size={24} className={`flex-shrink-0`} />
                {isOpen && (
                  <motion.h1
                    initial={{ visibility: "visible" }}
                    animate={{
                      visibility: isOpen ? "visible" : "hidden",
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    className="text-base leading-6 font-medium"
                  >
                    Raport Anak
                  </motion.h1>
                )}
              </div>
              <IoIosArrowDown
                size={15}
                className={`flex-shrink-0 transition duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </div>

            <motion.div
              initial={{
                height: 0,
                overflow: "hidden",
              }}
              animate={{
                height: open ? "auto" : 0,
                overflow: open ? "hidden" : "hidden",
                display: open ? "flex" : "none",
                flexDirection: "column",
                gap: "16px",
                padding: "16px",
              }}
              transition={{
                height: {
                  duration: 0.5,
                  ease: [0.42, 0, 0.58, 1], // Ease-in-out custom bezier curve for smoothness
                },
              }}
            >
              <div
                className="cursor-pointer border border-[#5DADE2] rounded-xl text-center flex items-center justify-center py-2"
                onClick={() =>
                  router.push("/orang-tua/raport-anak/ringkasan-nilai")
                }
              >
                <span className="text-xl font-normal">Ringkasan Nilai</span>
              </div>
              <div
                onClick={() =>
                  router.push("/orang-tua/raport-anak/detail-nilai")
                }
                className="cursor-pointer border border-[#5DADE2] rounded-xl text-center flex items-center justify-center py-2"
              >
                <span className="text-xl font-normal">Detail Nilai</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ width: "260px" }}
          animate={{
            width: isOpen ? "260px" : "80px",
          }}
          transition={{
            duration: 0.5,
          }}
          className="bg-white flex flex-col gap-4 py-10 px-6 h-screen mt-14"
        >
          <div className="flex flex-col gap-2">
            <div
              className={`flex flex-row gap-3 p-3 items-center rounded cursor-pointer ${
                pathname.includes("dashboard")
                  ? "bg-[#5DADE2] bg-opacity-10 rounded-md"
                  : "text-neutral-600"
              }`}
              onClick={() => router.push("/guru/dashboard")}
              // onClick={() => router.push("/orang-tua/dashboard")}
            >
              <MdOutlineDashboard size={24} className="flex-shrink-0" />
              {isOpen && (
                <motion.h1
                  initial={{ visibility: "visible" }}
                  animate={{
                    visibility: isOpen ? "visible" : "hidden",
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="text-base leading-6 font-medium"
                >
                  Dashboard
                </motion.h1>
              )}
            </div>

            <div
              className={`flex justify-between items-center cursor-pointer`}
              onClick={() => setOpen(!open)}
            >
              <div
                className={`flex flex-row gap-3 p-3 items-center rounded cursor-pointer`}
              >
                <TbReport size={24} className={`flex-shrink-0`} />
                {isOpen && (
                  <motion.h1
                    initial={{ visibility: "visible" }}
                    animate={{
                      visibility: isOpen ? "visible" : "hidden",
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    className="text-base leading-6 font-medium"
                  >
                    {/* Raport Anak */}
                    Raport Siswa
                  </motion.h1>
                )}
              </div>
              {isOpen && (
                <IoIosArrowDown
                  size={15}
                  className={`flex-shrink-0 transition duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>

            {isOpen && (
              <motion.div
                initial={{
                  height: 0,
                  overflow: "hidden",
                }}
                animate={{
                  height: open ? "auto" : 0,
                  overflow: open ? "hidden" : "hidden",
                  display: open ? "flex" : "none",
                  flexDirection: "column",
                  gap: "16px",
                  padding: "16px",
                }}
                transition={{
                  height: {
                    duration: 0.5,
                    ease: [0.42, 0, 0.58, 1], // Ease-in-out custom bezier curve for smoothness
                  },
                }}
              >
                <div
                  onClick={() => router.push("/guru/raport-siswa/data-raport")}
                  className="cursor-pointer border border-[#5DADE2] rounded-xl text-center flex items-center justify-center py-2"
                >
                  <span className="text-xl font-normal">Data Raport</span>
                </div>
                <div
                  onClick={() => router.push("/guru/raport-siswa/visualisasi")}
                  className="cursor-pointer border border-[#5DADE2] rounded-xl text-center flex items-center justify-center py-2"
                >
                  <span className="text-xl font-normal">Visualisasi</span>
                </div>
                {/* <div
                  onClick={() =>
                    router.push("/orang-tua/raport-anak/ringkasan-nilai")
                  }
                  className="cursor-pointer border border-[#5DADE2] rounded-xl text-center flex items-center justify-center py-2"
                >
                  <span className="text-xl font-normal">Ringkasan Nilai</span>
                </div>
                <div
                  onClick={() =>
                    router.push("/orang-tua/raport-anak/detail-nilai")
                  }
                  className="cursor-pointer border border-[#5DADE2] rounded-xl text-center flex items-center justify-center py-2"
                >
                  <span className="text-xl font-normal">Detail Nilai</span>
                </div> */}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}
