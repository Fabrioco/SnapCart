import prisma from "../prismaClient/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UpdateUserInput } from "../validators/userValidator";

export const getAllUsers = () => {
  return prisma.user.findMany();
};

export const getOneUser = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Erro ao buscar os dados do usuário");
  }
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

export const updateUserData = async (userId: number, data: UpdateUserInput) => {
  const findUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!findUser) {
    throw new Error("Usuário não encontrado");
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });

    console.log(updatedUser);
    return { message: "Dados atualizado com sucesso" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Erro ao atualizar os dados do usuário");
  }
};
