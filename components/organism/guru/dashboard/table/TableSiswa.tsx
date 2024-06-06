"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { DialogAdd } from "../dialog/DialogAdd";
import Akademik from "../charts/Akademik";
import PersentaseKehadiran from "../charts/PersentaseKehadiran";
import { DialogDetail } from "../dialog/DialogDetail";
import { DialogEdit } from "../dialog/DialogEdit";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export type Data = {
  id: string;
  nama: string;
  nisn: string;
  nama_ayah: string;
};

export default function TableSiswa() {
  const router = useRouter();

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);
  const tanggal = new Date().toLocaleDateString();

  const auth = useAuth();

  const columns: ColumnDef<Data>[] = [
    {
      accessorKey: "nama",
      header: "NAMA",
      cell: ({ row }: any) => (
        <div className="capitalize">{row.getValue("nama")}</div>
      ),
    },
    {
      accessorKey: "nisn",
      header: "NISN",
      cell: ({ row }: any) => (
        <div className="lowercase">{row.getValue("nisn")}</div>
      ),
    },
    {
      accessorKey: "nama_ayah",
      header: "NAMA ORANG TUA",
      cell: ({ row }: any) => (
        <div className="capitalize">{row.getValue("nama_ayah")}</div>
      ),
    },
    {
      accessorKey: "id",
      id: "actions",
      header: "AKSI",
      enableHiding: false,
      cell: ({ row }: any) => {
        return (
          <div className="flex flex-row gap-4 w-full items-center justify-center">
            <DialogDetail
              onClose={(v: boolean) => setOpen(!v)}
              id={row.original.id}
            />
            <DialogEdit onClose={setOpen} id={row.original.id} isOpen={open} />
            <button
              onClick={() => handleDelete(row.original.id)}
              className="bg-[#FD2943] px-4 py-2 rounded-full border-none flex items-center justify-center hover:bg-opacity-80"
            >
              <span className="text-white font-medium text-base">Hapus</span>
            </button>
          </div>
        );
      },
    },
  ];

  const getData = async () => {
    setLoading(true);
    axios
      .get("/api/siswa", {
        headers: {
          Authorization: `Bearer ${auth.auth?.accessToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setData(res.data?.siswa);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id: string) => {
    setLoading(true);
    toast.loading("Loading...");
    axios
      .delete(`/api/siswa?id=${id}`, {
        headers: {
          Authorization: `Bearer ${auth.auth?.accessToken}`,
        },
      })
      .then((res) => {
        toast.dismiss();
        toast.success("Data Siswa berhasil dihapus!");
        getData();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.dismiss();
        toast.error("Data Siswa gagal dihapus!");
      });
  };

  useEffect(() => {
    getData();
  }, [open]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <section className="flex flex-col gap-20 w-full">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 w-full">
          <span className="text-xl font-normal text-black">Semester</span>
          <div className="p-2 bg-white rounded-2xl shadow">Semester</div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <span className="text-xl font-normal">Kelas</span>
          <div className="p-2 bg-white rounded-2xl text-center">
            7 (VII) - 1
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-3xl text-white">Data Siswa</h1>
        <DialogAdd onClose={setOpen} isOpen={open} />
      </div>

      <div className="flex flex-col gap-4 bg-white">
        <div className="w-full bg-[#D9D9D9] flex items-center">
          <h1 className="text-2xl text-[#0B378D] font-normal p-6">
            Table Siswa
          </h1>
        </div>

        <div className="p-6">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup: any) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header: any) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row: any) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell: any) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full items-center">
        <h1 className="text-4xl font-normal text-center">
          Grafik Penilaian Tiap Semester
        </h1>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full bg-white p-2 md:p-6 rounded-lg">
            <Akademik />
          </div>
        </div>
        <button
          onClick={() => router.push("/guru/raport-siswa/data-raport")}
          className="bg-[#BCF7FF] rounded-full px-6 py-3 outline-none border-none shadow max-w-[300px]"
        >
          <span className="text-[#0B378D] font-normal text-2xl">
            Lihat Daftar Raport
          </span>
        </button>
      </div>

      <div className="flex flex-col gap-6 w-full items-center">
        <div className="w-full flex md:flex-row flex-col items-center justify-center gap-4 px-10 py-4 bg-[#3AADDF] rounded-xl">
          <div className="w-full h-full p-2 md:p-6 rounded-lg flex flex-col gap-4">
            <PersentaseKehadiran />
          </div>
          <div className="w-full p-2 flex flex-col gap-4">
            <h1 className="text-5xl font-bold text-center">
              Persentase Rata-rata Kehadiran siswa/i semester ini
            </h1>
            <p className="font-normal text-3xl">
              Data diambil dari tanggal {tanggal} sampai dengan {tanggal}
            </p>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-row gap-2">
                  <span className="size-4 bg-[#0088FE] rounded-full"></span>
                  <h1 className="text-sm font-normal">Hadir</h1>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="size-4 bg-[#ADD8E6] rounded-full"></span>
                  <h1 className="text-sm font-normal">Sakit</h1>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-row gap-2">
                  <span className="size-4 bg-[#00C49F] rounded-full"></span>
                  <h1 className="text-sm font-normal">Izin</h1>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="size-4 bg-[#FFA07A] rounded-full"></span>
                  <h1 className="text-sm font-normal">Alpa</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
