import { Request, Response } from "express";
import { getIdUser } from "../utils/getIdUser";
import {
  createFavoriteService,
  deleteFavoriteService,
  findAllFavoritesService,
  findOneFavoriteService,
} from "../services/favoriteService";

export const createFavoriteController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = await getIdUser(res);
  const { productId } = req.body;
  try {
    const favorite = await createFavoriteService(+userId, +productId);
    res.status(201).json(favorite);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Usuário não encontrado") {
        res.status(404).json({ error: error.message });
        return;
      }
      if (error.message === "Produto não encontrado") {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};

export const findAllFavoriteController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = await getIdUser(res);
  try {
    const favorites = await findAllFavoritesService(+userId);
    res.status(200).json(favorites);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Usuário não encontrado") {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};

export const findOneFavoriteController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = await getIdUser(res);

  const { productId } = req.params;
  if (!productId) {
    res.status(404).json({ error: "Id do produto não encontrado" });
  }

  try {
    const favorite = await findOneFavoriteService(+userId, +productId);
    res.status(200).json(favorite);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Usuário não encontrado") {
        res.status(404).json({ error: error.message });
        return;
      }
      if (error.message === "Produto não encontrado") {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};

export const deleteFavoriteController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = await getIdUser(res);
  const { productId } = req.params;
  try {
    await deleteFavoriteService(+userId, +productId);
    res.status(204).json({ message: "Deletado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Usuário não encontrado") {
        res.status(404).json({ error: error.message });
        return;
      }
      if (error.message === "Produto não encontrado") {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};
