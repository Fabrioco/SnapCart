import { Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient/prismaClient";

export async function getIdUser(res: Response) {
  try {
    const payload = res.locals.token as { email: string };
    if (!payload.email) {
      throw new Error("Token inválido");
    }

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user.id;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Erro ao buscar o usuário");
  }
}
