import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AkademikLineChart from "../charts/AkademikLineChart";
import { useEffect, useState } from "react";
import axios from "axios";
import NonAkademikLineChart from "../charts/NonAkademikLineChart";
import { useAuth } from "@/hooks/useAuth";

export default function NilaiAkademisSection() {
  const auth = useAuth();
  const [selectedAkademik, setSelectedAkademik] =
    useState<string>("Matematika");
  const [dataAkademik, setDataAkademik] = useState<any>(null);

  const [selectedNonAkademik, setSelectedNonAkademik] =
    useState<string>("Olahraga");
  const [dataNonAkademik, setDataNonAkademik] = useState<any>(null);

  const getAkademik = () => {
    axios
      .get(
        `/api/nilai/dashboard-orang-tua/nilai-akademik?mapel=${
          selectedAkademik ?? "Matematika"
        }`,
        {
          headers: {
            Authorization: `Bearer ${auth.auth?.accessToken}`,
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

  const getNonAkademik = () => {
    axios
      .get(
        `/api/nilai/dashboard-orang-tua/nilai-non-akademik?mapel=${
          selectedNonAkademik ?? "Olahraga"
        }`,
        {
          headers: {
            Authorization: `Bearer ${auth.auth?.accessToken}`,
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
    getAkademik();
    getNonAkademik();
  }, [selectedAkademik, selectedNonAkademik]);

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
          <AkademikLineChart data={dataAkademik?.akademik} />
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
          <NonAkademikLineChart data={dataNonAkademik?.nonAkademik} />
        </div>
      </div>
    </section>
  );
}
