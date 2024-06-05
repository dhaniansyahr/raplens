import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

    // if (verifyToken.role === "ORANG_TUA") {
    //   const siswa = await prisma.siswa.findMany({
    //     where: {
    //       OR: [{ nama_ayah: verifyToken.name }, { nama_ibu: verifyToken.name }],
    //     },
    //   });

    //   if (!siswa) {
    //     return NextResponse.json(
    //       { error: "Siswa tidak ditemukan" },
    //       { status: 404 }
    //     );
    //   }
    //   return NextResponse.json({ siswa }, { status: 200 });
    // }

    if (verifyToken.role === "GURU") {
      const semester = await prisma.semester.findMany();

      if (!semester || semester.length === 0) {
        return NextResponse.json(
          { error: "semester tidak ditemukan" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { data: semester, message: "Semester Succesfullufy Loaded!" },
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

export { GET };
