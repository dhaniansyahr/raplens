import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../../../../ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function DialogEdit({
  onClose,
  id,
  isOpen,
}: {
  onClose: (v: boolean) => void;
  id: string;
  isOpen: boolean;
}) {
  const [detail, setDetail] = useState<any>([]);
  const [nama, setNama] = useState<string>("");
  const [nis, setNis] = useState<string>("");
  const [nisn, setNisn] = useState<string>("");

  const [tempatLahir, setTempatLahir] = useState<string>("");
  const [tanggalLahir, setTanggalLahir] = useState<string>("");
  const [jenisKelamin, setJenisKelamin] = useState<string>("");

  const [agama, setAgama] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");

  const [namaAyah, setNamaAyah] = useState<string>("");
  const [pekerjaanAyah, setPekerjaanAyah] = useState<string>("");

  const [namaIbu, setNamaIbu] = useState<string>("");
  const [pekerjaanIbu, setPekerjaanIbu] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const auth = useAuth();

  const handleCreate = () => {
    setLoading(true);
    toast.loading("Menambahkan data siswa...");

    const body = {
      nama: nama,
      nis: nis,
      nisn: nisn,
      tempat_lahir: tempatLahir,
      tanggal_lahir: tanggalLahir,
      jenis_kelamin: jenisKelamin,
      agama: agama,
      alamat: alamat,
      nama_ayah: namaAyah,
      pekerjaan_ayah: pekerjaanAyah,
      nama_ibu: namaIbu,
      pekerjaan_ibu: pekerjaanIbu,
    };

    axios
      .put(`/api/siswa?id=${id}`, body, {
        headers: {
          Authorization: `Bearer ${auth.auth?.accessToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        toast.dismiss();
        toast.success("Data siswa berhasil ditambahkan");
        onClose(!isOpen);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Gagal menambahkan data siswa");
      });
  };

  const handleDetail = () => {
    setLoading(true);
    toast.loading("Loading...");

    axios
      .get(`/api/siswa/get-by-id?id=${id}`, {
        headers: {
          Authorization: `Bearer ${auth.auth?.accessToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setDetail(res.data.siswa);
        toast.dismiss();
        toast.success("Data Siswa successfully loaded!");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Failed to load data siswa");
      });
  };

  useEffect(() => {
    handleDetail();
  }, []);

  useEffect(() => {
    if (detail) {
      setNama(detail.nama);
      setNis(detail.nis);
      setNisn(detail.nisn);
      setTempatLahir(detail.tempat_lahir);
      setTanggalLahir(detail.tanggal_lahir);
      setJenisKelamin(detail.jenis_kelamin);
      setAgama(detail.agama);
      setAlamat(detail.alamat);
      setNamaAyah(detail.nama_ayah);
      setPekerjaanAyah(detail.pekerjaan_ayah);
      setNamaIbu(detail.nama_ibu);
      setPekerjaanIbu(detail.pekerjaan_ibu);
    }
  }, [detail]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#C5C80D] px-4 py-2 rounded-full border-none flex items-center justify-center hover:bg-opacity-80">
          <span className="text-white font-medium text-base">Edit</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Data Siswa</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="flex flex-col gap-2 w-full">
              <span className="text-lg font-normal pr-2">Nama</span>
              <Input
                className="shadow-lg"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-lg font-normal pr-2">
                NIS (Nomor Induk Siswa)
              </span>
              <Input
                className="shadow-lg"
                value={nis}
                onChange={(e) => setNis(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-lg font-normal pr-2">NISN</span>
              <Input
                className="shadow-lg"
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="flex flex-col gap-2 w-full">
              <span className="text-lg font-normal pr-2">Tempat Lahir</span>
              <Input
                className="shadow-lg"
                value={tempatLahir}
                onChange={(e) => setTempatLahir(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-lg font-normal pr-2">Tanggal Lahir</span>
              <Input
                type="date"
                className="shadow-lg"
                value={tanggalLahir}
                onChange={(e) => setTanggalLahir(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <span className="text-lg font-normal pr-2">Jenis Kelamin</span>
              <Select
                value={jenisKelamin}
                onValueChange={(onchange) => setJenisKelamin(onchange)}
              >
                <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
                  <SelectValue placeholder="Jenis Kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="LAKI_LAKI">Laki - Laki</SelectItem>
                    <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="flex flex-col gap-2 w-full">
              <span className="text-lg font-normal pr-2">Agama</span>
              <Input
                className="shadow-lg"
                value={agama}
                onChange={(e) => setAgama(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 w-full col-span-2">
              <span className="text-lg font-normal pr-2">Alamat</span>
              <Input
                className="shadow-lg"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-4">
            <div className="flex flex-col gap-2 w-full col-start-2">
              <span className="text-lg font-normal pr-2">Nama Ibu</span>
              <Input
                className="shadow-lg"
                value={namaIbu}
                onChange={(e) => setNamaIbu(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 w-full col-start-3">
              <span className="text-lg font-normal pr-2">Pekerjaan Ibu</span>
              <Input
                className="shadow-lg"
                value={pekerjaanIbu}
                onChange={(e) => setPekerjaanIbu(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-4">
            <div className="flex flex-col gap-2 w-full col-start-2">
              <span className="text-lg font-normal pr-2">Nama Ayah</span>
              <Input
                className="shadow-lg"
                value={namaAyah}
                onChange={(e) => setNamaAyah(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 w-full col-start-3">
              <span className="text-lg font-normal pr-2">Pekerjaan Ayah</span>
              <Input
                className="shadow-lg"
                value={pekerjaanAyah}
                onChange={(e) => setPekerjaanAyah(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-row gap-6 w-full items-center justify-center">
            <DialogClose>
              <button
                onClick={() => {
                  handleCreate();
                  onClose(!isOpen);
                }}
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
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
