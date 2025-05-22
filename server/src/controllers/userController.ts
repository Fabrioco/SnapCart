import { Request, Response } from "express";
import {
  createUser,
  deleteUserData,
  getAllUsers,
  getOneUser,
  logOut,
  signIn,
  updateUserData,
} from "../services/userService";
import {
  createUserSchema,
  signInUserSchema,
  updateUserSchema,
} from "../validators/userValidator";

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

  try {
    const newUser = await createUser(name, email, password);

    res.cookie("token", newUser.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ error: "Id do usuário não encontrado" });
    return;
  }

  const validation = updateUserSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ error: validation.error.format() });
    return;
  }

  try {
    const data = validation.data;
    const updatedUser = await updateUserData(+id, data);
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Usuário não encontrado") {
        res.status(404).json(error.message);
        return;
      }
      res.status(400).json(error.message);
      return;
    }
    res.status(500).json("Erro interno do servidor");
  }
};

export const login = async (req: Request, res: Response) => {
  const validation = signInUserSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ error: validation.error.format() });
    return;
  }

  try {
    const login = await signIn(validation.data);
    res.cookie("token", login.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Bem vindo de volta!" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "Erro ao fazer login") {
        res.status(409).json({ error: error.message });
        return;
      }
      if (error.message === "Login inválido") {
        res.status(400).json({ error: error.message });
        return;
      }
    }
    res.status(500).json("Erro interno do servidor");
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    const logout = logOut(res);
    res.status(200).json(logout);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ error: "Id do usuário nao encontrado" });
    return;
  }
  try {
    const deletedUser = await deleteUserData(+id);
    res.status(200).json(deletedUser);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Usuário não encontrado") {
        res.status(404).json(error.message);
        return;
      }
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
