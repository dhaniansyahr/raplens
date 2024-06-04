import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../../ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";

export function DialogDetail({
  token,
  onClose,
  id,
}: {
  token: string;
  onClose: (v: boolean) => void;
  id: string;
}) {
  const [detail, setDetail] = useState<any>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const handleDetail = () => {
    setLoading(true);
    // toast.loading("Loading...");

    axios
      .get(`/api/siswa/get-by-id?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setDetail(res.data.siswa);
        // toast.dismiss();
        // toast.success("Data Siswa successfully loaded!");
      })
      .catch((err) => {
        setLoading(false);
        // toast.error("Failed to load data siswa");
      });
  };

  useEffect(() => {
    handleDetail();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#7AA4C0] px-4 py-2 rounded-full border-none flex items-center justify-center hover:bg-opacity-80">
          <span className="text-white font-medium text-base">Detail</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detail Data Siswa</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="flex flex-col gap-2 w-full">
              <span className="text-lg font-normal pr-2">Nama</span>
              <Input className="shadow-lg" value={detail?.nama} disabled />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-lg font-normal pr-2">
                NIS (Nomor Induk Siswa)
              </span>
              <Input className="shadow-lg" value={detail?.nis} disabled />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-lg font-normal pr-2">NISN</span>
              <Input className="shadow-lg" value={detail?.nisn} disabled />
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="flex flex-col gap-2 w-full">
              <span className="text-lg font-normal pr-2">Tempat Lahir</span>
              <Input
                className="shadow-lg"
                value={detail?.tempat_lahir}
                disabled
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-lg font-normal pr-2">Tanggal Lahir</span>
              <Input
                type="text"
                className="shadow-lg"
                value={detail?.tanggal_lahir}
                disabled
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-lg font-normal pr-2">Jenis Kelamin</span>
              <Input
                type="text"
                className="shadow-lg"
                value={detail?.jenis_kelamin}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="flex flex-col gap-2 w-full">
              <span className="text-lg font-normal pr-2">Agama</span>
              <Input className="shadow-lg" value={detail?.agama} disabled />
            </div>
            <div className="flex flex-col gap-2 w-full col-span-2">
              <span className="text-lg font-normal pr-2">Alamat</span>
              <Input className="shadow-lg" value={detail?.alamat} disabled />
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-4">
            <div className="flex flex-col gap-2 w-full col-start-2">
              <span className="text-lg font-normal pr-2">Nama Ibu</span>
              <Input className="shadow-lg" value={detail?.nama_ibu} disabled />
            </div>
            <div className="flex flex-col gap-2 w-full col-start-3">
              <span className="text-lg font-normal pr-2">Pekerjaan Ibu</span>
              <Input
                className="shadow-lg"
                value={detail?.pekerjaan_ibu}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-4">
            <div className="flex flex-col gap-2 w-full col-start-2">
              <span className="text-lg font-normal pr-2">Nama Ayah</span>
              <Input className="shadow-lg" value={detail?.nama_ayah} disabled />
            </div>
            <div className="flex flex-col gap-2 w-full col-start-3">
              <span className="text-lg font-normal pr-2">Pekerjaan Ayah</span>
              <Input
                className="shadow-lg"
                value={detail?.pekerjaan_ayah}
                disabled
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          {/* <div className="flex flex-row gap-6 w-full items-center justify-center">
            <DialogClose>
              <button
                onClick={handleCreate}
                className="bg-[#58D68D] w-[150px] rounded-full px-6 py-3 outline-none border-none shadow max-w-[300px] flex items-center justify-center"
              >
                <span className="text-black font-normal text-2xl">Simpan</span>
              </button>
            </DialogClose>
            <DialogClose>
              <button className="bg-[#FB9486] w-[150px] rounded-full px-6 py-3 outline-none border-none shadow max-w-[300px] flex items-center justify-center">
                <span className="text-black font-normal text-2xl">Batal</span>
              </button>
            </DialogClose>
          </div> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
