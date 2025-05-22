import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient/prismaClient";

export const verifyRoleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ error: "Não autorizado token inexistente" });
    return;
  }
  try {
    const payload = jwt.verify(token, "secret") as { email: string };
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (!user || user.role !== "admin") {
      res.status(403).json({ error: "Acesso negado." });
      return;
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Token inválido") {
        res.status(401).json({ error: error.message });
        return;
      }
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
