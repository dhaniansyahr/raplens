import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EditNilai({ id }: { id: string }) {
  const router = useRouter();
  const [nama, setNama] = useState<string>("");
  const [semester, setSemester] = useState<string>("");
  const [kelas, setKelas] = useState<string>("");

  const [matematika, setMatematika] = useState<any>({});
  const [bahasaIndonesia, setBahasaIndonesia] = useState<any>({});
  const [ipa, setIpa] = useState<any>({});
  const [ips, setIps] = useState<any>({});
  const [kesenian, setKesenian] = useState<any>({});

  const [olahraga, setOlahraga] = useState<any>({});
  const [olimpiade, setOlimpiade] = useState<any>({});
  const [seni, setSeni] = useState<any>({});
  const [keterampilan, setKeterampilan] = useState<any>({});

  const [kedisiplinan, setKedisiplinan] = useState<any>({});
  const [tanggungJawab, setTanggungJawab] = useState<any>({});
  const [kerjaSama, setKerjaSama] = useState<any>({});
  const [adaptasi, setAdaptasi] = useState<any>({});
  const [etikaBelajar, setEtikaBelajar] = useState<any>({});

  const [hadir, setHadir] = useState<number>(0);
  const [izin, setIzin] = useState<number>(0);
  const [sakit, setSakit] = useState<number>(0);
  const [alpa, setAlpa] = useState<number>(0);

  const [dataKelas, setDataKelas] = useState<any>(null);
  const [dataSemester, setDataSemester] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  const [detail, setDetail] = useState<any>(null);

  const getData = async (token: string) => {
    setLoading(true);
    axios
      .get("/api/semester", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataSemester(res.data.data);

        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        console.error(err);
      });
  };

  const getKelas = async (token: string) => {
    setLoading(true);
    axios
      .get("/api/kelas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataKelas(res.data.data);

        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        console.error(err);
      });
  };

  const handleData = (token: string) => {
    setLoading(true);

    axios
      .get(`/api/nilai?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);

        setDetail(res.data.data);
        toast.success("Data berhasil ditambahkan");
      })
      .catch((err) => {
        setLoading(false);

        toast.dismiss();
        toast.error("Gagal menambahkan data");
      });
  };

  const handleCreate = () => {
    setLoading(true);

    const body = {
      nama: nama,
      semesterid: semester,
      kelasid: kelas,
      matematika: matematika,
      bahasaIndonesia: bahasaIndonesia,
      ipa: ipa,
      ips: ips,
      kesenian: kesenian,
      olahraga: olahraga,
      olimpiade: olimpiade,
      seni: seni,
      keterampilan: keterampilan,
      kedisiplinan: kedisiplinan,
      tanggungJawab: tanggungJawab,
      kerjaSama: kerjaSama,
      adaptasi: adaptasi,
      etikaBelajar: etikaBelajar,
      hadir: hadir,
      izin: izin,
      sakit: sakit,
      alpa: alpa,
    };

    console.log(body);

    axios
      .put(`/api/nilai?nama=${nama}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);

        toast.success("Data berhasil ditambahkan");

        router.back();

        setNama("");
        setSemester("");
        setMatematika(null);
        setBahasaIndonesia(null);
        setIpa(null);
        setIps(null);
        setKesenian(null);
        setOlahraga(null);
        setOlimpiade(null);
        setSeni(null);
        setKeterampilan(null);
        setKedisiplinan(null);
        setTanggungJawab(null);
        setKerjaSama(null);
        setAdaptasi(null);
        setEtikaBelajar(null);
        setHadir(0);
        setIzin(0);
        setSakit(0);
        setAlpa(0);
      })
      .catch((err) => {
        setLoading(false);

        toast.dismiss();
        toast.error("Gagal menambahkan data");
      });
  };

  useEffect(() => {
    const temp =
      typeof window !== "undefined" && localStorage.getItem("raplens");
    if (temp) {
      const data = JSON.parse(temp);
      getData(data?.token);
      getKelas(data?.token);
      setToken(data?.token);
      handleData(data?.token);
    }
  }, []);

  useEffect(() => {
    if (detail) {
      setNama(detail?.siswa.nama);
      setSemester(detail?.semester.id);
      setKelas(detail?.kelas.id);
      setMatematika(detail?.Akademik?.matematika);
      setBahasaIndonesia(detail?.Akademik?.bahasaIndonesia);
      setIpa(detail?.Akademik?.ipa);
      setIps(detail?.Akademik?.ips);
      setKesenian(detail?.Akademik?.seniBudaya);
      setOlahraga(detail?.NonAkademik?.olahraga);
      setOlimpiade(detail?.NonAkademik?.olimpiade);
      setSeni(detail?.NonAkademik?.seni);
      setKeterampilan(detail?.NonAkademik?.keterampilan);
      setKedisiplinan(detail?.Sikap?.kedisiplinan);
      setTanggungJawab(detail?.Sikap?.tanggungJawab);
      setKerjaSama(detail?.Sikap?.kerjaSama);
      setAdaptasi(detail?.Sikap?.adaptasi);
      setEtikaBelajar(detail?.Sikap?.etikaBelajar);
      setHadir(detail?.Kehadiran?.hadir);
      setIzin(detail?.Kehadiran?.izin);
      setSakit(detail?.Kehadiran?.sakit);
      setAlpa(detail?.Kehadiran?.alpa);
    }
  }, []);

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 max-w-md">
        <h1 className="font-normal text-lg">Nama Siswa</h1>
        <Input
          placeholder="Nama Siswa"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
      </div>

      {/* <div className="flex flex-col gap-4 max-w-md">
        <h1 className="font-normal text-lg">Semester</h1>
        <Select
          value={semester}
          onValueChange={(onchange) => setSemester(onchange)}
        >
          <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full bg-[#BCF7FF] shadow-md">
            <SelectValue placeholder="Kelas" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {dataSemester?.map((item: any) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}

      {/* <div className="flex flex-col gap-4 max-w-md">
        <h1 className="font-normal text-lg">Kelas</h1>
        <Select value={kelas} onValueChange={(onchange) => setKelas(onchange)}>
          <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full bg-[#BCF7FF] shadow-md">
            <SelectValue placeholder="Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {dataKelas?.map((item: any) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}

      <div className="w-full flex flex-col gap-6 items-center justify-center">
        <h1 className="font-semibold text-2xl">Penilaian Akademis</h1>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="w-full flex items-center justify-center">
              <span className="text-xl font-normal">Mata Pelajaran</span>
            </div>
            <div className="w-full flex items-center justify-center col-span-2">
              <span className="text-xl font-normal">Nilai Angka</span>
            </div>
          </div>

          {/* Matematika */}
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
              <span className="text-xl font-normal">Matematika</span>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uas"
                  className="shadow-lg"
                  value={matematika.uas ?? 0}
                  onChange={(e) =>
                    setMatematika({
                      ...matematika,
                      uas: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uts"
                  className="shadow-lg"
                  value={matematika.uts ?? 0}
                  onChange={(e) =>
                    setMatematika({
                      ...matematika,
                      uts: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 1"
                  className="shadow-lg"
                  value={matematika.tugas_1 ?? 0}
                  onChange={(e) =>
                    setMatematika({
                      ...matematika,
                      tugas_1: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 2"
                  className="shadow-lg"
                  value={matematika.tugas_2 ?? 0}
                  onChange={(e) =>
                    setMatematika({
                      ...matematika,
                      tugas_2: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
              <span className="text-xl font-normal">Bahasa Indonesia</span>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uas"
                  className="shadow-lg"
                  value={bahasaIndonesia.uas ?? 0}
                  onChange={(e) =>
                    setBahasaIndonesia({
                      ...bahasaIndonesia,
                      uas: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uts"
                  className="shadow-lg"
                  value={bahasaIndonesia.uts ?? 0}
                  onChange={(e) =>
                    setBahasaIndonesia({
                      ...bahasaIndonesia,
                      uts: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 1"
                  className="shadow-lg"
                  value={bahasaIndonesia.tugas_1 ?? 0}
                  onChange={(e) =>
                    setBahasaIndonesia({
                      ...bahasaIndonesia,
                      tugas_1: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 2"
                  className="shadow-lg"
                  value={bahasaIndonesia.tugas_2 ?? 0}
                  onChange={(e) =>
                    setBahasaIndonesia({
                      ...bahasaIndonesia,
                      tugas_2: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
              <span className="text-xl font-normal">IPA</span>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uas"
                  className="shadow-lg"
                  value={ipa.uas ?? 0}
                  onChange={(e) =>
                    setIpa({ ...ipa, uas: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uts"
                  className="shadow-lg"
                  value={ipa.uts ?? 0}
                  onChange={(e) =>
                    setIpa({ ...ipa, uts: parseInt(e.target.value) })
                  }
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 1"
                  className="shadow-lg"
                  value={ipa.tugas_1 ?? 0}
                  onChange={(e) =>
                    setIpa({ ...ipa, tugas_1: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 2"
                  className="shadow-lg"
                  value={ipa.tugas_2 ?? 0}
                  onChange={(e) =>
                    setIpa({ ...ipa, tugas_2: parseInt(e.target.value) })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
              <span className="text-xl font-normal">IPS</span>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uas"
                  className="shadow-lg"
                  value={ips.uas ?? 0}
                  onChange={(e) =>
                    setIps({ ...ips, uas: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uts"
                  className="shadow-lg"
                  value={ips.uts ?? 0}
                  onChange={(e) =>
                    setIps({ ...ips, uts: parseInt(e.target.value) })
                  }
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 1"
                  className="shadow-lg"
                  value={ips.tugas_1 ?? 0}
                  onChange={(e) =>
                    setIps({ ...ips, tugas_1: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 2"
                  className="shadow-lg"
                  value={ips.tugas_2 ?? 0}
                  onChange={(e) =>
                    setIps({ ...ips, tugas_2: parseInt(e.target.value) })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
              <span className="text-xl font-normal">Kesenian</span>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uas"
                  className="shadow-lg"
                  value={kesenian.uas ?? 0}
                  onChange={(e) =>
                    setKesenian({ ...kesenian, uas: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uts"
                  className="shadow-lg"
                  value={kesenian.uts ?? 0}
                  onChange={(e) =>
                    setKesenian({ ...kesenian, uts: parseInt(e.target.value) })
                  }
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 1"
                  className="shadow-lg"
                  value={kesenian.tugas_1 ?? 0}
                  onChange={(e) =>
                    setKesenian({
                      ...kesenian,
                      tugas_1: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 2"
                  className="shadow-lg"
                  value={kesenian.tugas_2 ?? 0}
                  onChange={(e) =>
                    setKesenian({
                      ...kesenian,
                      tugas_2: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-6 items-center justify-center">
        <h1 className="font-semibold text-2xl">Penilaian Non-Akademis</h1>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="w-full flex items-center justify-center">
              <span className="text-xl font-normal">Ekstrakurikuler</span>
            </div>
            <div className="w-full flex items-center justify-center col-span-2">
              <span className="text-xl font-normal">Nilai Angka</span>
            </div>
          </div>

          {/* Matematika */}
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
              <span className="text-xl font-normal">Olahraga</span>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uas"
                  className="shadow-lg"
                  value={olahraga.uas ?? 0}
                  onChange={(e) =>
                    setOlahraga({ ...olahraga, uas: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uts"
                  className="shadow-lg"
                  value={olahraga.uts ?? 0}
                  onChange={(e) =>
                    setOlahraga({ ...olahraga, uts: parseInt(e.target.value) })
                  }
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 1"
                  className="shadow-lg"
                  value={olahraga.tugas_1 ?? 0}
                  onChange={(e) =>
                    setOlahraga({
                      ...olahraga,
                      tugas_1: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 2"
                  className="shadow-lg"
                  value={olahraga.tugas_2 ?? 0}
                  onChange={(e) =>
                    setOlahraga({
                      ...olahraga,
                      tugas_2: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
              <span className="text-xl font-normal">Olimpiade</span>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uas"
                  className="shadow-lg"
                  value={olimpiade.uas ?? 0}
                  onChange={(e) =>
                    setOlimpiade({
                      ...olimpiade,
                      uas: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uts"
                  className="shadow-lg"
                  value={olimpiade.uts ?? 0}
                  onChange={(e) =>
                    setOlimpiade({
                      ...olimpiade,
                      uts: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 1"
                  className="shadow-lg"
                  value={olimpiade.tugas_1 ?? 0}
                  onChange={(e) =>
                    setOlimpiade({
                      ...olimpiade,
                      tugas_1: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 2"
                  className="shadow-lg"
                  value={olimpiade.tugas_2 ?? 0}
                  onChange={(e) =>
                    setOlimpiade({
                      ...olimpiade,
                      tugas_2: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
              <span className="text-xl font-normal">Seni</span>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uas"
                  className="shadow-lg"
                  value={seni.uas ?? 0}
                  onChange={(e) =>
                    setSeni({ ...seni, uas: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uts"
                  className="shadow-lg"
                  value={seni.uts ?? 0}
                  onChange={(e) =>
                    setSeni({ ...seni, uts: parseInt(e.target.value) })
                  }
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 1"
                  className="shadow-lg"
                  value={seni.tugas_1 ?? 0}
                  onChange={(e) =>
                    setSeni({ ...seni, tugas_1: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 2"
                  className="shadow-lg"
                  value={seni.tugas_2 ?? 0}
                  onChange={(e) =>
                    setSeni({ ...seni, tugas_2: parseInt(e.target.value) })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
              <span className="text-xl font-normal">keterampilan</span>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uas"
                  className="shadow-lg"
                  value={keterampilan.uas ?? 0}
                  onChange={(e) =>
                    setKeterampilan({
                      ...keterampilan,
                      uas: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uts"
                  className="shadow-lg"
                  value={keterampilan.uts ?? 0}
                  onChange={(e) =>
                    setKeterampilan({
                      ...keterampilan,
                      uts: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 1"
                  className="shadow-lg"
                  value={keterampilan.tugas_1 ?? 0}
                  onChange={(e) =>
                    setKeterampilan({
                      ...keterampilan,
                      tugas_1: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 2"
                  className="shadow-lg"
                  value={keterampilan.tugas_2 ?? 0}
                  onChange={(e) =>
                    setKeterampilan({
                      ...keterampilan,
                      tugas_2: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-6 items-center justify-center">
        <h1 className="font-semibold text-2xl">Penilaian Sikap dan Perilaku</h1>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="w-full flex items-center justify-center">
              <span className="text-xl font-normal">Sikap/Perilaku</span>
            </div>
            <div className="w-full flex items-center justify-center col-span-2">
              <span className="text-xl font-normal">Nilai Angka</span>
            </div>
          </div>

          {/* Matematika */}
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
              <span className="text-xl font-normal">Kedisiplinan</span>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uas"
                  className="shadow-lg"
                  value={kedisiplinan.kehadiran ?? 0}
                  onChange={(e) =>
                    setKedisiplinan({
                      ...kedisiplinan,
                      kehadiran: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uts"
                  className="shadow-lg"
                  value={kedisiplinan.keterlambatan ?? 0}
                  onChange={(e) =>
                    setKedisiplinan({
                      ...kedisiplinan,
                      keterlambatan: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 1"
                  className="shadow-lg"
                  value={kedisiplinan.kepatuhan ?? 0}
                  onChange={(e) =>
                    setKedisiplinan({
                      ...kedisiplinan,
                      kepatuhan: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 2"
                  className="shadow-lg"
                  value={kedisiplinan.kerapihan ?? 0}
                  onChange={(e) =>
                    setKedisiplinan({
                      ...kedisiplinan,
                      kerapihan: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
              <span className="text-xl font-normal">Tanggung Jawab</span>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uas"
                  className="shadow-lg"
                  value={tanggungJawab.tugas ?? 0}
                  onChange={(e) =>
                    setTanggungJawab({
                      ...tanggungJawab,
                      tugas: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uts"
                  className="shadow-lg"
                  value={tanggungJawab.kebersihan ?? 0}
                  onChange={(e) =>
                    setTanggungJawab({
                      ...tanggungJawab,
                      kebersihan: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 1"
                  className="shadow-lg"
                  value={tanggungJawab.kepemimpinan ?? 0}
                  onChange={(e) =>
                    setTanggungJawab({
                      ...tanggungJawab,
                      kepemimpinan: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              {/* <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 2"
                  className="shadow-lg"
                  value={tanggungJawab.tugas_2}
                  onChange={(e) =>
                    setTanggungJawab({
                      ...tanggungJawab,
                      tugas_2: parseInt(e.target.value),
                    })
                  }
                />
              </div> */}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
              <span className="text-xl font-normal">Kerja Sama</span>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uas"
                  className="shadow-lg"
                  value={kerjaSama.kerjaTim ?? 0}
                  onChange={(e) =>
                    setKerjaSama({
                      ...kerjaSama,
                      kerjaTim: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uts"
                  className="shadow-lg"
                  value={kerjaSama.kerjaSama ?? 0}
                  onChange={(e) =>
                    setKerjaSama({
                      ...kerjaSama,
                      kerjaSama: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 1"
                  className="shadow-lg"
                  value={kerjaSama.komunikasi ?? 0}
                  onChange={(e) =>
                    setKerjaSama({
                      ...kerjaSama,
                      komunikasi: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              {/* <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 2"
                  className="shadow-lg"
                  value={kerjaSama.tugas_2}
                  onChange={(e) =>
                    setKerjaSama({ ...kerjaSama, tugas_2: parseInt(e.target.value) })
                  }
                />
              </div> */}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
              <span className="text-xl font-normal">Adaptasi</span>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uas"
                  className="shadow-lg"
                  value={adaptasi.kehadiran ?? 0}
                  onChange={(e) =>
                    setAdaptasi({
                      ...adaptasi,
                      kehadiran: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uts"
                  className="shadow-lg"
                  value={adaptasi.keterlambatan ?? 0}
                  onChange={(e) =>
                    setAdaptasi({
                      ...adaptasi,
                      keterlambatan: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 1"
                  className="shadow-lg"
                  value={adaptasi.kepatuhan ?? 0}
                  onChange={(e) =>
                    setAdaptasi({
                      ...adaptasi,
                      kepatuhan: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 2"
                  className="shadow-lg"
                  value={adaptasi.kerapihan ?? 0}
                  onChange={(e) =>
                    setAdaptasi({
                      ...adaptasi,
                      kerapihan: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3">
            <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10">
              <span className="text-xl font-normal">Etika Belajar</span>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uas"
                  className="shadow-lg"
                  value={etikaBelajar.kerajinan ?? 0}
                  onChange={(e) =>
                    setEtikaBelajar({
                      ...etikaBelajar,
                      kerajinan: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Uts"
                  className="shadow-lg"
                  value={etikaBelajar.integrasi ?? 0}
                  onChange={(e) =>
                    setEtikaBelajar({
                      ...etikaBelajar,
                      integrasi: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6">
              <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 1"
                  className="shadow-lg"
                  value={etikaBelajar.konsentrasi ?? 0}
                  onChange={(e) =>
                    setEtikaBelajar({
                      ...etikaBelajar,
                      konsentrasi: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              {/* <div className="w-full">
                <Input
                  type="number"
                  placeholder="Nilai Tugas 2"
                  className="shadow-lg"
                  value={etikaBelajar.tugas_2}
                  onChange={(e) =>
                    setEtikaBelajar({ ...etikaBelajar, tugas_2: e.target.value })
                  }
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-6 items-center justify-center">
        <h1 className="font-semibold text-2xl">Penilaian Kehadiran</h1>
        <div className="w-full flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10 col-span-2">
            <span className="text-xl font-normal">Hadir</span>
          </div>
          <div className="w-full">
            <Input
              type="number"
              placeholder="Input Hadir"
              className="shadow-lg"
              value={hadir ?? 0}
              onChange={(e) => setHadir(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10 col-span-2">
            <span className="text-xl font-normal">Izin</span>
          </div>
          <div className="w-full">
            <Input
              type="number"
              placeholder="Input Izin"
              className="shadow-lg"
              value={izin ?? 0}
              onChange={(e) => setIzin(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10 col-span-2">
            <span className="text-xl font-normal">Sakit</span>
          </div>
          <div className="w-full">
            <Input
              type="number"
              placeholder="Input Sakit"
              className="shadow-lg"
              value={sakit ?? 0}
              onChange={(e) => setSakit(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 lg:grid lg:grid-cols-3">
          <div className="bg-[#BCF7FF] px-4 py-2 w-full flex items-center justify-center shadow-lg rounded-lg h-10 col-span-2">
            <span className="text-xl font-normal">Alpa</span>
          </div>
          <div className="w-full">
            <Input
              type="number"
              placeholder="Input Alpa"
              className="shadow-lg"
              value={alpa ?? 0}
              onChange={(e) => setAlpa(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-6 w-full items-center justify-center">
        <button
          onClick={handleCreate}
          className="bg-[#58D68D] w-[150px] rounded-full px-6 py-3 outline-none border-none shadow max-w-[300px] flex items-center justify-center"
        >
          <span className="text-black font-normal text-2xl">Simpan</span>
        </button>
        <button className="bg-[#FB9486] w-[150px] rounded-full px-6 py-3 outline-none border-none shadow max-w-[300px] flex items-center justify-center">
          <span className="text-black font-normal text-2xl">Batal</span>
        </button>
      </div>
    </section>
  );
}
