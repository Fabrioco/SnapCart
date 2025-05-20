import { Request, Response } from "express";
import { createUser, getAllUsers } from "../services/userService";

export const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};

export const addUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await createUser(name, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar usuário" });
  }
};
