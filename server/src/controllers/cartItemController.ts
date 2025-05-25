import {
  createCartItemService,
  deleteCartItemService,
  deleteProductFromCartService,
  findAllCartItemsService,
  updateQuantityCartItemService,
} from "../services/cartItemService";
import { Request, Response } from "express";
import { getIdUser } from "../utils/getIdUser";

export const addCartItem = async (req: Request, res: Response) => {
  const userId = await getIdUser(res);
  const { productId, quantity } = req.body;
  try {
    const cartItem = await createCartItemService(userId, productId, quantity);
    res.status(201).json(cartItem);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(500)
        .json({ error: "Erro desconhecido ao adicionar item ao carrinho" });
    }
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const userId = await getIdUser(res);
  const { id } = req.params;
  try {
    const cartItem = await deleteCartItemService(+id, +userId);
    res.status(200).json(cartItem);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res
        .status(500)
        .json({ error: "Erro desconhecido ao deletar item do carrinho" });
    }
  }
};

export const deleteProductFromCart = async (req: Request, res: Response) => {
  const userId = await getIdUser(res);

  const { productId, cartId } = req.params as {
    productId: string;
    cartId: string;
  };
  if (!productId || !cartId) {
    res.status(404).json({ error: "Id do produto ou carrinho nao encontrado" });
  }

  try {
    const cartItem = await deleteProductFromCartService(
      +cartId,
      +userId,
      +productId
    );
    res.status(200).json(cartItem);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res
        .status(500)
        .json({ error: "Erro desconhecido ao deletar item do carrinho" });
    }
  }
};

export const findAllCartItems = async (req: Request, res: Response) => {
  const userId = await getIdUser(res);
  try {
    const cartItems = await findAllCartItemsService(userId);
    res.status(200).json(cartItems);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(500)
        .json({ error: "Erro desconhecido ao buscar itens do carrinho" });
    }
  }
};

export const updateQuantityCartItem = async (req: Request, res: Response) => {
  const userId = await getIdUser(res);
  const { quantity } = req.body;
  const { productId } = req.params;
  try {
    const cartItem = await updateQuantityCartItemService(
      userId,
      +productId,
      +quantity
    );
    res.status(200).json(cartItem);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({
        error: "Erro desconhecido ao atualizar quantidade do item no carrinho",
      });
    }
  }
};
