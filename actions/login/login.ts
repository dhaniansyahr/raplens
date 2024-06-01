import jwt from "jsonwebtoken";
import prisma from "@/lib/prismadb";
import { User } from "@prisma/client";

function createToken(user: User) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? "", {
    expiresIn: 86400, // 24 hours
  });
}

const login = async (req: any, res: any) => {
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

    const token = createToken(user);

    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
