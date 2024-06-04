import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

//list data siswa
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

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (verifyToken.role === "GURU") {
      if (!id) {
        return NextResponse.json({ error: "ID is Required" }, { status: 400 });
      }

      const siswa = await prisma.siswa.findUnique({
        where: {
          id: id,
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
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export { GET };
