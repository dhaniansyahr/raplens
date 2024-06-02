"use server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prismadb";
import { User } from "@prisma/client";

function createToken(user: User) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? "", {
    expiresIn: 86400, // 24 hours
  });
}

const login = async (data: any) => {
  const { email, password } = data;

  try {
    const user: any = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return { status: 404, message: "User not found" };
    }

    const passwordIsValid = user.password === password;

    if (!passwordIsValid) {
      return { status: 401, message: "Invalid password" };
    }

    const token = createToken(user);

    return { status: 200, user, token };
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export default login;
