import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

// Post Method
const POST = async (req: NextRequest) => {
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
            const { id_siswa, nisn, id_semester, akademis, nonAkademis, sikap, kehadiran } = await req.json();

            const akademisData = await prisma.akademis.upsert({
                where: {
                    id_siswa: id_siswa,
                },
                update: akademis,
                create: { id_siswa, id_semester, nisn, ...akademis },
            });

            const nonAkademisData = await prisma.nonAkademis.upsert({
                where: {
                    id_siswa: id_siswa,
                },
                update: nonAkademis,
                create: { id_siswa, id_semester, nisn, ...nonAkademis },
            });

            const sikapData = await prisma.sikap.upsert({
                where: {
                    id_siswa: id_siswa,
                },
                update: sikap,
                create: { id_semester, nisn, ...sikap },
            });

            const kehadiranData = await prisma.kehadiran.upsert({
                where: {
                    id_siswa: id_siswa,
                },
                update: kehadiran,
                create: { id_semester, nisn, ...kehadiran },
            });

            return NextResponse.json({
                message: "Rapor berhasil disimpan",
                akademis: akademisData,
                nonAkademis: nonAkademisData,
                sikap: sikapData,
                kehadiran: kehadiranData,
            });
        }

    } catch (error) {
        console.error("Error creating report:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};


//GET Method
const GET = async (req: NextRequest) => {
    try {
        //ambil token
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

        //Ambil nilai siswa berdasarkan NISN untuk guru
        if (verifyToken.role === "ORANG_TUA") {
            const siswa = await prisma.siswa.findFirst({
                where: {
                    OR: [{ nama_ayah: verifyToken.name }, { nama_ibu: verifyToken.name }]
                }
            })
            const nisn = siswa?.nisn;
            if (!nisn) {
                return NextResponse.json({ error: "NISN tidak diberikan" }, { status: 400 });
            }
            const akademis = await prisma.akademis.findMany({ where: { nisn } });
            const nonAkademis = await prisma.nonAkademis.findMany({ where: { nisn } });
            const sikap = await prisma.sikap.findMany({ where: { nisn } });
            const kehadiran = await prisma.kehadiran.findMany({ where: { nisn } });

            return NextResponse.json({
                akademis,
                nonAkademis,
                sikap,
                kehadiran,
            });
        }

        //Ambil nilai siswa berdasarkan NISN untuk guru
        if (verifyToken.role === "GURU") {
            try {
                const { nisn } = await req.json();
                if (!nisn) {
                    return NextResponse.json({ error: "NISN tidak diberikan" }, { status: 400 });
                }

                const akademis = await prisma.akademis.findMany({ where: { nisn } });
                const nonAkademis = await prisma.nonAkademis.findMany({ where: { nisn } });
                const sikap = await prisma.sikap.findMany({ where: { nisn } });
                const kehadiran = await prisma.kehadiran.findMany({ where: { nisn } });

                return NextResponse.json({
                    akademis,
                    nonAkademis,
                    sikap,
                    kehadiran,
                });
            } catch (error) {
                console.error("Error fetching reports:", error);
                return NextResponse.json({ error: "Internal server error" }, { status: 500 });
            }
        }

    } catch (error) {
        console.error("Error fetching reports:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Update an existing report for a student
const PUT = async (req: NextRequest) => {
    try {
        //ambil token
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
            const { id_siswa, nisn, id_semester, akademis, nonAkademis, sikap, kehadiran } = await req.json();

            const updatedAkademis = await prisma.akademis.update({
                where: {
                    id_siswa: id_siswa,
                  },
                data: akademis,
            });

            const updatedNonAkademis = await prisma.nonAkademis.update({
                where: {
                    id_siswa: id_siswa,
                  },
                data: nonAkademis,
            });

            const updatedSikap = await prisma.sikap.update({
                where: {
                    id_siswa: id_siswa,
                  },
                data: sikap,
            });

            const updatedKehadiran = await prisma.kehadiran.update({
                where: {
                    id_siswa: id_siswa,
                  },
                data: kehadiran,
            });

            return NextResponse.json({
                message: "Rapor berhasil diperbarui",
                akademis: updatedAkademis,
                nonAkademis: updatedNonAkademis,
                sikap: updatedSikap,
                kehadiran: updatedKehadiran,
            });
        }

    } catch (error) {
        console.error("Error updating report:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Delete a report for a student
const DELETE = async (req: NextRequest) => {
    try {
        //ambil token
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
            const { nisn } = await req.json();
            await prisma.akademis.deleteMany({ where: nisn });
            await prisma.nonAkademis.deleteMany({ where: nisn });
            await prisma.sikap.deleteMany({ where: nisn });
            await prisma.kehadiran.deleteMany({ where: nisn });
        }
        return NextResponse.json({ message: "Rapor berhasil dihapus" });
    } catch (error) {
        console.error("Error deleting report:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

export { GET, POST, PUT, DELETE };
