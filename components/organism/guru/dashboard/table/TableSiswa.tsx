"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Data[] = [
  {
    id: "m5gr84i9",
    nama: "Ahmad",
    nisn: "1234567890",
    nama_orang_tua: "Budi",
  },
  {
    id: "m5gr84i9",
    nama: "Budi",
    nisn: "1234567890",
    nama_orang_tua: "Budi",
  },
  {
    id: "m5gr84i9",
    nama: "Caca",
    nisn: "1234567890",
    nama_orang_tua: "Budi",
  },
  {
    id: "m5gr84i9",
    nama: "Dedi",
    nisn: "1234567890",
    nama_orang_tua: "Budi",
  },
  {
    id: "m5gr84i9",
    nama: "Euis",
    nisn: "1234567890",
    nama_orang_tua: "Budi",
  },
  {
    id: "m5gr84i9",
    nama: "Fafa",
    nisn: "1234567890",
    nama_orang_tua: "Budi",
  },
  {
    id: "m5gr84i9",
    nama: "Gaga",
    nisn: "1234567890",
    nama_orang_tua: "Budi",
  },
  {
    id: "m5gr84i9",
    nama: "Haha",
    nisn: "1234567890",
    nama_orang_tua: "Budi",
  },
  {
    id: "m5gr84i9",
    nama: "Ii",
    nisn: "1234567890",
    nama_orang_tua: "Budi",
  },
  {
    id: "m5gr84i9",
    nama: "Jaja",
    nisn: "1234567890",
    nama_orang_tua: "Budi",
  },
  {
    id: "m5gr84i9",
    nama: "Kaka",
    nisn: "1234567890",
    nama_orang_tua: "Budi",
  },
  {
    id: "m5gr84i9",
    nama: "Lala",
    nisn: "1234567890",
    nama_orang_tua: "Budi",
  },
  {
    id: "m5gr84i9",
    nama: "Mama",
    nisn: "1234567890",
    nama_orang_tua: "Budi",
  },
];

export type Data = {
  id: string;
  nama: string;
  nisn: string;
  nama_orang_tua: string;
};

export const columns: ColumnDef<Data>[] = [
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
    accessorKey: "nama_orang_tua",
    header: "NAMA ORANG TUA",
    cell: ({ row }: any) => (
      <div className="capitalize">{row.getValue("nama_orang_tua")}</div>
    ),
  },
  {
    id: "actions",
    header: "AKSI",
    enableHiding: false,
    cell: ({ row }: any) => {
      return (
        <div className="flex flex-row gap-4 w-full items-center justify-center">
          <button className="bg-[#7AA4C0] px-4 py-2 rounded-full border-none flex items-center justify-center hover:bg-opacity-80">
            <span className="text-white font-medium text-base">Detail</span>
          </button>
          <button className="bg-[#C5C80D] px-4 py-2 rounded-full border-none flex items-center justify-center hover:bg-opacity-80">
            <span className="text-white font-medium text-base">Edit</span>
          </button>
          <button className="bg-[#FD2943] px-4 py-2 rounded-full border-none flex items-center justify-center hover:bg-opacity-80">
            <span className="text-white font-medium text-base">Hapus</span>
          </button>
        </div>
      );
    },
  },
];

export default function TableSiswa() {
  const tanggal = new Date().toLocaleDateString();
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <section className="flex flex-col gap-6 w-full">
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
        <button className="bg-[#BCF7FF] rounded-full px-6 py-3 outline-none border-none shadow max-w-[300px]">
          <span className="text-[#0B378D] font-normal text-2xl">
            Tambah Data Siswa
          </span>
        </button>
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
    </section>
  );
}
