import { Request, Response } from "express";
import {
  createAddressSchema,
  updateAddressSchema,
} from "../validators/addressValidator";
import {
  createNewAddressForUser,
  deleteAddressById,
  getAllAddressesOfUser,
  getOneAddressByUserId,
  updateExistingAddress,
} from "../services/addressService";
import { getIdUser } from "../utils/getIdUser";

export const create = async (req: Request, res: Response) => {
  const validation = createAddressSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ errors: validation.error.format() });
    return;
  }

  const data = validation.data;
  const userId = await getIdUser(res);
  try {
    const address = await createNewAddressForUser(data, +userId);
    res.status(201).json(address);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Dados do endereço ausentes") {
        res.status(400).json(error.message);
        return;
      }
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

export const getAllOfUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = await getIdUser(res);
  try {
    const addresses = await getAllAddressesOfUser(+userId);
    res.status(200).json(addresses);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Usuário não encontrado") {
        res.status(404).json(error.message);
        return;
      }
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ error: "Id do endereço não encontrado" });
    return;
  }

  const userId = await getIdUser(res);
  try {
    const address = await getOneAddressByUserId(+id, +userId);
    res.status(200).json(address);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Usuário não encontrado") {
        res.status(404).json(error.message);
        return;
      }
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ error: "Id do endereço não encontrado" });
    return;
  }

  const validation = updateAddressSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ error: validation.error.format() });
    return;
  }

  const data = validation.data;

  try {
    const address = await updateExistingAddress(+id, data);
    res.status(200).json(address);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Endereço não encontrado") {
        res.status(404).json(error.message);
        return;
      }
      res.status(400).json(error.message);
      return;
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ error: "Id do endereço não encontrado" });
    return;
  }
  try {
    await deleteAddressById(+id);
    res.status(200).json({ message: "Endereço deletado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Endereço não encontrado") {
        res.status(404).json(error.message);
        return;
      }
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};
