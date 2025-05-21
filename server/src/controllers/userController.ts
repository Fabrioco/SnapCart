import { Request, Response } from "express";
import { createUser, getAllUsers, getOneUser } from "../services/userService";
import { createUserSchema } from "../validators/userValidator";

export const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ error: "Id do usuário não encontrado" });
  }

  try {
    const user = await getOneUser(+id);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Usuário não encontrado") {
        res.status(404).json(error.message);
        return;
      }
      res.status(400).json(error.message);
      return;
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const addUser = async (req: Request, res: Response): Promise<void> => {
  const validation = createUserSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ errors: validation.error.format() });
    return;
  }

  const { name, email, password } = validation.data;

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
