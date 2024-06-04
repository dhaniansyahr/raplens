import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  
      console.log("Data:", data);
  
      if (verifyToken.role === "GURU") {
        if (!data.id_kelas || !data.kelas) {
          return NextResponse.json(
            { error: "Id, Kelas field is Required" },
            { status: 400 }
          );
        }
  
        await prisma.kelas.create({
          data: {
            id_kelas: data?.id_kelas,
            kelas: data?.kelas,
          }
        });
  
        return NextResponse.json(
          { message: "Kelas telah dibuat" },
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
  