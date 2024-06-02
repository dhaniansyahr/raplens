// pages/api/items.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from '@/lib/prismadb';
import { Siswa } from '@prisma/client';
import { User } from '@prisma/client';
function getRoleFromToken(token: string): string | null {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET ?? "") as JwtPayload;
        return decodedToken.role || null;
    } catch (error) {
        console.error("Failed to verify token:", error);
        return null;
    }
}


export default async function handler(req: NextRequest, res: NextResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            if (token.role === "GURU") {
                try {
                    const siswa = await prisma.siswa.findMany()

                    if (!siswa) {
                        return NextResponse.json({ error: 'Siswa tidak ditemukan' }, { status: 404 });
                    }

                    return NextResponse.json(siswa, { status: 200 });
                } catch (error) {
                    return NextResponse.json({ error: 'Failed to fetch siswa by name' }, { status: 500 });
                }
            } else if (token.role === "OANG-TUA") {
                try {
                    const siswa = await prisma.siswa.findMany({
                        where: {
                            OR: [
                                { nama_ayah: token.name },
                                { nama_ibu: token.name }
                            ]
                        }
                    })

                    if (!siswa) {
                        return NextResponse.json({ error: 'Siswa tidak ditemukan' }, { status: 404 });
                    }
                    return NextResponse.json(siswa, { status: 200 });
                } catch (error) {
                    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
                }
            }

        case 'POST':
            try {
                const { nis, nama, nisn, tempat_lahir, tanggal_lahir, alamat, agama, nama_ayah, nama_ibu, pekerjaan_ayah, pekerjaan_ibu, jenis_kelamin } = req.body;
                const newItem = await prisma.siswa.create({
                    data: {
                        nis, nama, nisn, tempat_lahir, tanggal_lahir, alamat, agama, nama_ayah, nama_ibu, pekerjaan_ayah, pekerjaan_ibu, jenis_kelamin
                    },
                });
                return NextResponse.json(newItem,{status: 201});
            } catch (error) {
                return NextResponse.json({ error: 'Internal server error'}, {status:500});
            }

        case 'PUT':
            try {
                const { nis, nama, nisn, tempat_lahir, tanggal_lahir, alamat, agama, nama_ayah, nama_ibu, pekerjaan_ayah, pekerjaan_ibu, jenis_kelamin } = req.body;
                const updatedItem = await prisma.siswa.update({
                    where: { nis },
                    data: { nama, nisn, tempat_lahir, tanggal_lahir, alamat, agama, nama_ayah, nama_ibu, pekerjaan_ayah, pekerjaan_ibu, jenis_kelamin },
                });
                return NextResponse.json(updatedItem,{status:200});
            } catch (error) {
                return NextResponse.json({ error: 'Internal server error'},{status:500});
            }

        case 'DELETE':
            try {
                const { nis } = req.body;
                await prisma.siswa.delete({ where: { nis } });
                return NextResponse.json({status:204});
            } catch (error) {
                return NextResponse.json({ error: 'Internal server error' },{status:500});
            }

        default:
            try{
                const newHeaders = new Headers(request.headers)
                newHeaders.set('Allow', 'GET, POST, PUT, DELETE');
                return NextResponse.next({
                request: {
                  headers: newHeaders,
                },
              })
            } catch(error){
                return NextResponse.json(`Method ${method} Not Allowed`,{status:405});
            }
    }
}
