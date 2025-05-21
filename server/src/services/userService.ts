import prisma from "../prismaClient/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = () => {
  return prisma.user.findMany();
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const findUser = await prisma.user.findUnique({ where: { email } });
    if (findUser) {
      throw new Error("Email já cadastrado");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    password = hashPassword;

    const token = jwt.sign({ email }, "secret", { expiresIn: "7d" });
    if (!token) {
      throw new Error("Erro ao criar token");
    }

    const userCreated = await prisma.user.create({
      data: { name, email, password },
    });

    const { password: pass, ...userWithoutPassword } = userCreated;

    return {
      access_token: token,
      userWithoutPassword,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Erro desconhecido ao registrar");
  }
};
