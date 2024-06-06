import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
import AnalisaAkademik from "./charts/AnalisaAkademik";
import AnalisaNonAkademik from "./charts/AnalisaNonAkademik";
import AnalisaKehadiran from "./charts/AnalisaKehadiran";
import AnalisaSikap from "./charts/AnalisaSikap";

export default function AnalisaPerkembangan({ name }: { name: string }) {
  const [selectedAkademik, setSelectedAkademik] =
    useState<string>("Matematika");
  const [dataAkademik, setDataAkademik] = useState<any>(null);

  const [selectedNonAkademik, setSelectedNonAkademik] =
    useState<string>("Olahraga");
  const [dataNonAkademik, setDataNonAkademik] = useState<any>(null);

  const [selectedKehadiran, setSelectedKehadiran] = useState<string>("Hadir");
  const [dataKehadiran, setDataKehadiran] = useState<any>(null);

  const [selectedSikap, setSelectedSikap] = useState<string>("Kedisiplinan");
  const [dataSikap, setDataSikap] = useState<any>(null);

  const getAkademik = (akademik: string) => {
    axios
      .get(
        `/api/visualisasi/guru/analisa-perkembangan/akademik?nama=${name}&mapel=${
          selectedAkademik ?? "Matematika"
        }`,
        {
          headers: {
            Authorization: `Bearer ${akademik}`,
          },
        }
      )
      .then((res) => {
        setDataAkademik(res.data.data);
      })
      .catch(() => {
        console.log("error");
      });
  };

  useEffect(() => {
    const temp =
      typeof window !== "undefined" && localStorage.getItem("raplens");
    if (temp) {
      const data = JSON.parse(temp);
      getAkademik(data?.token);
    }
  }, [selectedAkademik]);

  const getNonAkademik = (akademik: string) => {
    axios
      .get(
        `/api/visualisasi/guru/analisa-perkembangan/non-akademik?nama=${name}&mapel=${
          selectedNonAkademik ?? "Olahraga"
        }`,
        {
          headers: {
            Authorization: `Bearer ${akademik}`,
          },
        }
      )
      .then((res) => {
        setDataNonAkademik(res.data.data);
      })
      .catch(() => {
        console.log("error");
      });
  };

  useEffect(() => {
    const temp =
      typeof window !== "undefined" && localStorage.getItem("raplens");
    if (temp) {
      const data = JSON.parse(temp);
      getNonAkademik(data?.token);
    }
  }, [selectedNonAkademik]);

  const getKehadiran = (token: string) => {
    axios
      .get(
        `/api/visualisasi/guru/analisa-perkembangan/kehadiran?nama=${name}&key=${
          selectedKehadiran ?? "Hadir"
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setDataKehadiran(res.data.data);
      })
      .catch(() => {
        console.log("error");
      });
  };

  useEffect(() => {
    const temp =
      typeof window !== "undefined" && localStorage.getItem("raplens");
    if (temp) {
      const data = JSON.parse(temp);
      getKehadiran(data?.token);
    }
  }, [selectedKehadiran]);

  const getSikap = (token: string) => {
    axios
      .get(
        `/api/visualisasi/guru/analisa-perkembangan/sikap-dan-perilaku?nama=${name}&key=${
          selectedSikap ?? "Kedisiplinan"
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setDataSikap(res.data.data);
      })
      .catch(() => {
        console.log("error");
      });
  };

  useEffect(() => {
    const temp =
      typeof window !== "undefined" && localStorage.getItem("raplens");
    if (temp) {
      const data = JSON.parse(temp);
      getSikap(data?.token);
    }
  }, [selectedSikap]);

  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <h1 className="md:text-4xl text-2xl font-bold text-white">
          Nilai Akademis
        </h1>
        <Select
          value={selectedAkademik}
          onValueChange={(e) => setSelectedAkademik(e)}
        >
          <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
            <SelectValue placeholder="Mata Pelajaran" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Matematika">Matematika</SelectItem>
              <SelectItem value="Bahasa Indonesia">Bahasa Indonesia</SelectItem>
              <SelectItem value="IPA">IPA</SelectItem>
              <SelectItem value="IPS">IPS</SelectItem>
              <SelectItem value="Seni Budaya">Seni Budaya</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-6 md:flex-row bg-white rounded-3xl p-6 lg:p-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl text-[#77B9E5]">{selectedAkademik}</h1>
          <div className="flex flex-row gap-2 items-center">
            <span className="size-4 bg-[#0088FE] rounded-full"></span>
            <h1 className="text-sm font-normal">Nilai Siswa/i</h1>
          </div>
        </div>
        <div className="w-full">
          <AnalisaAkademik data={dataAkademik?.akademik} />
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <h1 className="md:text-4xl text-2xl font-bold text-white">
          Nilai Non - Akademis
        </h1>
        <Select
          value={selectedNonAkademik}
          onValueChange={(e) => setSelectedNonAkademik(e)}
        >
          <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
            <SelectValue placeholder="Mata Pelajaran" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Olahraga">Olahraga</SelectItem>
              <SelectItem value="Seni">Seni</SelectItem>
              <SelectItem value="Olimpiade">Olimpiade</SelectItem>
              <SelectItem value="Keterampilan">Keterampilan</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-6 md:flex-row bg-white rounded-3xl p-6 lg:p-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl text-[#77B9E5]">{selectedNonAkademik}</h1>
          <div className="flex flex-row gap-2 items-center">
            <span className="size-4 bg-[#0088FE] rounded-full"></span>
            <h1 className="text-sm font-normal">Nilai Siswa/i</h1>
          </div>
        </div>
        <div className="w-full">
          <AnalisaNonAkademik data={dataNonAkademik?.nonAkademik} />
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <h1 className="md:text-4xl text-2xl font-bold text-white">
          Nilai Kehadiran
        </h1>
        <Select
          value={selectedKehadiran}
          onValueChange={(e) => setSelectedKehadiran(e)}
        >
          <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
            <SelectValue placeholder="Kehadiran" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Hadir">Hadir</SelectItem>
              <SelectItem value="Izin">Izin</SelectItem>
              <SelectItem value="Sakit">Sakit</SelectItem>
              <SelectItem value="Alpa">Alpa</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-6 md:flex-row bg-white rounded-3xl p-6 lg:p-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl text-[#77B9E5]">{selectedKehadiran}</h1>
          <div className="flex flex-row gap-2 items-center">
            <span className="size-4 bg-[#0088FE] rounded-full"></span>
            <h1 className="text-sm font-normal">Nilai Siswa/i</h1>
          </div>
        </div>
        <div className="w-full">
          <AnalisaKehadiran data={dataKehadiran?.kehadiran} />
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <h1 className="md:text-4xl text-2xl font-bold text-white">
          Nilai Sikap dan Perilaku
        </h1>
        <Select
          value={selectedSikap}
          onValueChange={(e) => setSelectedSikap(e)}
        >
          <SelectTrigger className="w-full max-w-[280px] h-[40px] rounded-full">
            <SelectValue placeholder="Sikap dan Perilaku" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Kedisiplinan">Kedisiplinan</SelectItem>
              <SelectItem value="Tanggung Jawab">Tanggung Jawab</SelectItem>
              <SelectItem value="Kerja Sama">Kerja Sama</SelectItem>
              <SelectItem value="Adaptasi">Adaptasi</SelectItem>
              <SelectItem value="Etika Belajar">Etika Belajar</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-6 md:flex-row bg-white rounded-3xl p-6 lg:p-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl text-[#77B9E5]">{selectedSikap}</h1>
          <div className="flex flex-row gap-2 items-center">
            <span className="size-4 bg-[#0088FE] rounded-full"></span>
            <h1 className="text-sm font-normal">Nilai Siswa/i</h1>
          </div>
        </div>
        <div className="w-full">
          <AnalisaSikap data={dataSikap?.sikap} />
        </div>
      </div>
    </section>
  );
}
