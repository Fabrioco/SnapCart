import { NextFunction, Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  findAllProducts,
  findOneProduct,
  updateProduct,
} from "../services/productService";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/productValidator";

export const create = async (req: Request, res: Response): Promise<void> => {
  const validation = createProductSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ errors: validation.error.format() });
    return;
  }
  try {
    const data = validation.data;
    const product = await createProduct(data);
    res.status(201).json(product);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Categoria inválida") {
        res.status(400).json({ error: "Categoria inválida" });
        return;
      }
      if (error.message === "Produto com este nome já existe") {
        res.status(409).json({ error: "Produto com este nome já existe" });
        return;
      }
      res.status(400).json({ error: "Erro ao criar produto" });
      return;
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: "Erro ao buscar produtos" });
      return;
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ error: "Id do produto não encontrado" });
    return;
  }

  try {
    const product = await findOneProduct(+id);
    res.status(200).json(product);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Produto não encontrado") {
        res.status(404).json({ error: "Produto não encontrado" });
        return;
      }
      res.status(400).json({ error: "Erro ao buscar produto" });
      return;
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ error: "Id do produto não encontrado" });
    return;
  }

  const validation = updateProductSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ error: validation.error.format() });
    return;
  }
  const data = validation.data;

  try {
    const product = await updateProduct(+id, data);
    res.status(200).json(product);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Produto não encontrado") {
        res.status(404).json({ error: "Produto não encontrado" });
        return;
      }
      if (error.message === "Categoria inválida") {
        res.status(400).json({ error: "Categoria inválida" });
        return;
      }
      res.status(400).json({ error: "Erro ao atualizar produto" });
      return;
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ error: "Id do produto não encontrado" });
    return;
  }

  try {
    await deleteProduct(+id);
    res.status(204).json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Produto não encontrado") {
        res.status(404).json({ error: "Produto não encontrado" });
        return;
      }
      res.status(400).json({ error: "Erro ao deletar produto" });
      return;
    }
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
