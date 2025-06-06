import prisma from "../prismaClient/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  CreateUserInput,
  SignInInput,
  UpdateUserInput,
} from "../validators/userValidator";
import { Response } from "express";

export const getAllUsers = () => {
  return prisma.user.findMany();
};

export const getOneUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
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

export const createUser = async (data: CreateUserInput) => {
  try {
    const findUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (findUser) {
      throw new Error("Email já cadastrado");
    }

    const hashPassword = await bcrypt.hash(data.password, 10);
    data.password = hashPassword;

    const token = jwt.sign({ email: data.email }, "secret", {
      expiresIn: "7d",
    });
    if (!token) {
      throw new Error("Erro ao criar token");
    }

    const userCreated = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        number: data.number,
      },
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

    return { message: "Dados atualizado com sucesso" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Erro ao atualizar os dados do usuário");
  }
};

export const signIn = async (data: SignInInput) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error("Login inválido email");
  }

  const hashedPassword = await bcrypt.compare(data.password, user.password);

  if (!hashedPassword) {
    throw new Error("Login inválido senha");
  }

  try {
    const token = jwt.sign({ email: data.email }, "secret", {
      expiresIn: "7d",
    });

    return { access_token: token };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Erro ao fazer login");
  }
};

export const logOut = (res: Response) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Deslogado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Erro ao fazer logout");
  }
};

export const deleteUserData = async (id: number) => {
  const findUser = await prisma.user.findUnique({ where: { id } });
  if (!findUser) {
    throw new Error("Usuário não encontrado");
  }

  try {
    await prisma.user.delete({ where: { id } });
    return { message: "Usuário deletado com sucesso" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Erro ao deletar usuário");
  }
};

export const forgotPasswordService = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    const token = jwt.sign({ email: user.email }, "secret", {
      expiresIn: "1h",
    });
    if (!token) {
      throw new Error("Erro ao criar token");
    }
    return { access_token: token };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Erro ao buscar usuário");
  }
};

export const resetPasswordService = async (token: string, password: string) => {
  try {
    const payload = jwt.verify(token, "secret") as { email: string };
    if (!payload.email) {
      throw new Error("Token expirado");
    }
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email: payload.email },
      data: { password: hashPassword },
    });
    return { message: "Senha atualizada com sucesso" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Erro ao buscar usuário");
  }
};
