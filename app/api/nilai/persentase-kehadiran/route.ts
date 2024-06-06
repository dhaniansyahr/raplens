import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

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

    if (verifyToken.role === "GURU") {
      const kehadiran = await prisma.kehadiran.findMany();

      if (!kehadiran) {
        return NextResponse.json(
          { error: "Nilai Not be Found!" },
          { status: 404 }
        );
      }

      const sumHadir = kehadiran.reduce((acc, curr) => acc + curr.hadir, 0);
      const sumIzin = kehadiran.reduce((acc, curr) => acc + curr.izin, 0);
      const sumSakit = kehadiran.reduce((acc, curr) => acc + curr.sakit, 0);
      const sumAlpa = kehadiran.reduce((acc, curr) => acc + curr.alpa, 0);

      return NextResponse.json(
        {
          data: [
            {
              name: "Hadir",
              value: sumHadir,
            },
            {
              name: "Izin",
              value: sumIzin,
            },
            {
              name: "Sakit",
              value: sumSakit,
            },
            {
              name: "Alpa",
              value: sumAlpa,
            },
          ],
        },
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
