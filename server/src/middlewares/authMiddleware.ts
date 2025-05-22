import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
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
    const payload = jwt.verify(token, "secret");
    res.locals.token = payload;

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
