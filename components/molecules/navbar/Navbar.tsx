import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const auth = useAuth();
  const route = useRouter();

  const getProfile = () => {
    axios
      .get("/api/profile", {
        headers: {
          Authorization: `Bearer ${auth.auth?.accessToken}`,
        },
      })
      .then((res) => {
        setNama(res.data.data?.name);
      })
      .catch(() => {
        console.log("error");
      });
  };

  useEffect(() => {
    getProfile();
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/sample-avatar.png" alt="User Avatar" />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem>
                <button
                  onClick={() => {
                    auth.logout();
                    route.push("/");
                  }}
                  className="flex flex-row gap-2"
                >
                  <LogOut size={18} className="text-neutral-800" />
                  <span className="text-neutral-800 text-base leading-6 font-normal">
                    Logout
                  </span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="hidden md:block font-bold text-base">
            {nama ?? "Nama Pengguna"}
          </span>
        </div>
      </div>
    </nav>
  );
}
