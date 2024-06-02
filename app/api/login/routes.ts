import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export default async function login(req: any, res: any) {
  const { email, password } = req.body;

  try {
    const user: any = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordIsValid = user.password === password;
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({ token: "token" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
