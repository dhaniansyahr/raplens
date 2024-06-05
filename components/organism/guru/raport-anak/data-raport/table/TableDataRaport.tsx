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
import { useRouter } from "next/navigation";

export type Data = {
  id: string;
  nama: string;
  nisn: string;
  semester: string;
};

export default function TableDataRaport() {
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const tanggal = new Date().toLocaleDateString();

  const columns: ColumnDef<Data>[] = [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    //   cell: ({ row }: any) => (
    //     <div className="capitalize">{row.getValue("id")}</div>
    //   ),
    // },
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
    // {
    //   accessorKey: "nama_ayah",
    //   header: "NAMA ORANG TUA",
    //   cell: ({ row }: any) => (
    //     <div className="capitalize">{row.getValue("nama_ayah")}</div>
    //   ),
    // },
    {
      accessorKey: "id",
      id: "actions",
      header: "AKSI",
      enableHiding: false,
      cell: ({ row }: any) => {
        // console.log("Row: ", row.original);
        return (
          <div className="flex flex-row gap-4 w-full items-center justify-center">
            <button
              onClick={() =>
                router.push(`/guru/raport-siswa/data-raport/${row.original.id}`)
              }
              className="bg-[#7AA4C0] px-4 py-2 rounded-full border-none flex items-center justify-center hover:bg-opacity-80"
            >
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

  const getData = async (token: string) => {
    setLoading(true);
    toast.loading("Loading...");
    axios
      .get("/api/siswa", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setData(res.data?.siswa);
        toast.dismiss();
        toast.success("Data Siswa berhasil diambil!");

        console.log("Data Siswa: ", res.data?.siswa);
      })
      .catch(() => {
        setLoading(false);
        toast.dismiss();
        toast.error("Data Siswa gagal diambil!");
      });
  };

  const handleDelete = (id: string) => {
    setLoading(true);
    toast.loading("Loading...");
    axios
      .delete(`/api/siswa?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        toast.dismiss();
        toast.success("Data Siswa berhasil dihapus!");
        getData(token);
      })
      .catch(() => {
        setLoading(false);
        toast.dismiss();
        toast.error("Data Siswa gagal dihapus!");
      });
  };

  useEffect(() => {
    const temp =
      typeof window !== "undefined" && localStorage.getItem("raplens");
    if (temp) {
      const data = JSON.parse(temp);
      setToken(data.token);
      getData(data?.token);
    }
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
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-3xl text-white">Data Raport</h1>
        <button
          className="bg-[#BCF7FF] rounded-full px-6 py-3 outline-none border-none shadow max-w-[300px]"
          onClick={() =>
            router.push("/guru/raport-siswa/data-raport/tambah-nilai")
          }
        >
          <span className="text-[#0B378D] font-normal text-2xl">
            Tambah Nilai Raport
          </span>
        </button>
      </div>

      <div className="flex flex-col gap-4 bg-white">
        <div className="w-full bg-[#D9D9D9] flex items-center">
          <h1 className="text-2xl text-[#0B378D] font-normal p-6">
            Nilai Raport
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

      <div className="flex w-full items-center justify-center">
        <button
          className="bg-[#BCF7FF] rounded-full px-6 py-3 outline-none border-none shadow max-w-[300px]"
          onClick={() => router.push("/guru/raport-siswa/visualisasi")}
        >
          <span className="text-[#0B378D] font-normal text-2xl">
            Lihat Visualisasi
          </span>
        </button>
      </div>
    </section>
  );
}
