import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";
const GET = async (req: any) => {
  try {
    const token = req.headers.get("Authorization");
    if (!token) {
      return NextResponse.json(
        { message: "Authorization Failed!" },
        { status: 401 }
      );
    }

    const validToken = token.split(" ")[1];

    const verifyToken = jwt.verify(
      validToken,
      process.env.JWT_SECRET || ""
    ) as JwtPayload;

    if (verifyToken.role === "ORANG_TUA") {
      const siswa = await prisma.siswa.findMany({
        where: {
          OR: [{ nama_ayah: verifyToken.name }, { nama_ibu: verifyToken.name }],
        },
      });

      if (!siswa) {
        return NextResponse.json(
          { error: "Siswa tidak ditemukan" },
          { status: 404 }
        );
      }
      return NextResponse.json({ siswa }, { status: 200 });
    }

    if (verifyToken.role === "GURU") {
      const siswa = await prisma.siswa.findMany();

      if (!siswa || siswa.length === 0) {
        return NextResponse.json(
          { error: "Siswa tidak ditemukan" },
          { status: 404 }
        );
      }
      return NextResponse.json({ siswa }, { status: 200 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

const POST = async (req: any) => {
  try {
    const token = req.headers.get("Authorization");
    if (!token) {
      return NextResponse.json(
        { message: "Authorization Failed!" },
        { status: 401 }
      );
    }

    const validToken = token.split(" ")[1];

    const verifyToken = jwt.verify(
      validToken,
      process.env.JWT_SECRET || ""
    ) as JwtPayload;

    const data: any = await req.json();

    if (verifyToken.role === "GURU") {
      if (!data.nama || !data.nisn || !data.nis) {
        return NextResponse.json(
          { error: "Nama, NISN, dan NIS field is Required" },
          { status: 400 }
        );
      }

      await prisma.siswa.create({
        data: {
          id: uuid(),
          nama: data?.nama,
          nisn: data?.nisn,
          nis: data?.nis,
          tempat_lahir: data?.tempat_lahir,
          tanggal_lahir: data?.tanggal_lahir,
          alamat: data?.alamat,
          agama: data?.agama,
          nama_ayah: data?.nama_ayah,
          nama_ibu: data?.nama_ibu,
          pekerjaan_ayah: data?.pekerjaan_ayah,
          pekerjaan_ibu: data?.pekerjaan_ibu,
          jenis_kelamin: data?.jenis_kelamin,
        },
      });

      return NextResponse.json(
        { message: "Siswa successfully created!" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

const PUT = async (req: any) => {
  try {
    const token = req.headers.get("Authorization");
    if (!token) {
      return NextResponse.json(
        { message: "Authorization Failed!" },
        { status: 401 }
      );
    }

    const validToken = token.split(" ")[1];

    const verifyToken = jwt.verify(
      validToken,
      process.env.JWT_SECRET || ""
    ) as JwtPayload;

    const data: any = await req.json();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (verifyToken.role === "GURU") {
      if (!data.nama || !data.nisn || !data.nis) {
        return NextResponse.json(
          { error: "Nama, NISN, dan NIS field is Required" },
          { status: 400 }
        );
      }

      if (!id) {
        return NextResponse.json({ error: "ID is Required" }, { status: 400 });
      }

      const siswaExists = await prisma.siswa.findUnique({
        where: {
          id: id,
        },
      });

      if (!siswaExists) {
        return NextResponse.json({ error: "Siswa not found" }, { status: 404 });
      }

      await prisma.siswa.update({
        where: {
          id: id,
        },
        data,
      });

      return NextResponse.json(
        { message: "Siswa successfully updated!" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

const DELETE = async (req: any) => {
  try {
    const token = req.headers.get("Authorization");
    if (!token) {
      return NextResponse.json(
        { message: "Authorization Failed!" },
        { status: 401 }
      );
    }

    const validToken = token.split(" ")[1];

    const verifyToken = jwt.verify(
      validToken,
      process.env.JWT_SECRET || ""
    ) as JwtPayload;

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (verifyToken.role === "GURU") {
      if (!id) {
        return NextResponse.json({ error: "ID is Required" }, { status: 400 });
      }

      const siswaExists = await prisma.siswa.findUnique({
        where: {
          id: id,
        },
      });

      if (!siswaExists) {
        return NextResponse.json({ error: "Siswa not found" }, { status: 404 });
      }

      await prisma.siswa.delete({
        where: {
          id: id,
        },
      });

      return NextResponse.json(
        { message: "Siswa successfully deleted!" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export { GET, POST, PUT, DELETE };
