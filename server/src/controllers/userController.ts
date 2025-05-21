import { Request, Response } from "express";
import { createUser, getAllUsers } from "../services/userService";

export const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};

export const addUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Todos os dados são obrigatórios" });
    return;
  }
  try {
    const newUser = await createUser(name, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Email já cadastrado") {
        res.status(409).json({ error: error.message });
        return;
      }
      if (error.message === "Erro ao criar token") {
        res.status(409).json({ error: error.message });
        return;
      }
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
