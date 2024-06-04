import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

const GET_NISN_LIST = async (req: NextRequest) => {
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

        console.log("Data:", data);

        if (verifyToken.role === "GURU") {
            const siswaList = await prisma.siswa.findMany({
                select: {
                    nisn: true,
                    nama: true,
                },
            });

            if (!siswaList || siswaList.length === 0) {
                return NextResponse.json({ error: "Tidak ada siswa ditemukan" }, { status: 404 });
            }
            return NextResponse.json({ siswaList }, { status: 200 });
        }

    } catch (error) {
        console.error("Error fetching NISN list:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};
