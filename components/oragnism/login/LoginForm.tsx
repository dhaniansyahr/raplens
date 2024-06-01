"use client";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaKey } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function LoginForm() {
  const router = useRouter();
  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className="p-10 flex flex-col justify-between bg-white rounded-lg w-full h-full">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-medium">Selamat Datang di</h1>
          <Image
            src="/brand/wording-logo.png"
            width={178}
            height={49}
            alt="Raplens: Rapor Online Holistik"
          />
        </div>

        <div className="w-full h-full flex items-center justify-center flex-col gap-4">
          <div className="w-full flex flex-row gap-2 bg-[#ECECEC] px-4 py-2 items-center rounded-lg">
            <IoMdMail size={24} />
            <div className="flex flex-col gap-2 w-full">
              <span className="text-xs font-normal pr-2">Nama</span>
              <input
                type="text"
                placeholder="Masukan Nama Anda"
                className="p-2 bg-transparent w-full border-none focus:outline-none"
              />
            </div>
          </div>
          <div className="w-full flex flex-row gap-2 bg-[#ECECEC] px-4 py-2 items-center rounded-lg">
            <FaKey size={24} />
            <div className="flex flex-col gap-2 w-full">
              <span className="text-xs font-normal pr-2">Password</span>
              <input
                type="password"
                placeholder="Masukan Password Anda"
                className="p-2 bg-transparent w-full border-none focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-row gap-1 items-center justify-start w-full">
            <Checkbox />
            <span className="text-base font-normal">Ingat saya</span>
          </div>

          <button
            className="w-full bg-[#5DADE2] text-white font-semibold text-base py-4 rounded-lg"
            onClick={() => router.push("/orang-tua/dashboard")}
          >
            Masuk
          </button>
        </div>
      </div>
    </section>
  );
}
