import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosNotificationsOutline, IoMdMenu } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

export default function Navbar({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}) {
  const [nama, setNama] = useState<string>("Nama Pengguna");

  useEffect(() => {
    const temp =
      typeof window !== "undefined" && localStorage.getItem("raplens");
    if (temp) {
      const data = JSON.parse(temp);
      setNama(data.name?.name);
    }
  }, []);

  return (
    <nav className="fixed w-full top-0 flex justify-between bg-white shadow px-4 py-2 z-10">
      <div className="flex flex-row gap-6 items-center">
        <Image
          src="/brand/logo.png"
          width={240}
          height={40}
          alt="Raplens: Rapor Online Holistik"
          className="w-[100px] md:w-[240px] h-[40px]"
        />
        <IoMdMenu
          size={32}
          className="cursor-pointer"
          onClick={() => setOpen(!isOpen)}
        />
      </div>
      <div className="w-full max-w-[400px] hidden border border-black rounded-full py-2 px-4 md:flex flex-row gap-2 items-center justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="border-none bg-white focus:outline-none py-2 w-full"
        />
        <IoSearch size={24} className="cursor-pointer" />
      </div>

      <div className="flex flex-row gap-2 md:gap-6 items-center">
        <button className="size-10 rounded-full bg-neutral-50">
          <IoIosNotificationsOutline size={20} className="text-[#5DADE2]" />
        </button>
        <div className="flex flex-row gap-2 items-center">
          <Avatar className="cursor-pointer">
            <AvatarImage src="/sample-avatar.png" alt="User Avatar" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <span className="hidden md:block font-bold text-base">
            {nama ?? "Nama Pengguna"}
          </span>
        </div>
      </div>
    </nav>
  );
}
