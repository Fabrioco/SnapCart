import {
  CreateProductInput,
  UpdateProductInput,
} from "../validators/productValidator";
import prisma from "../prismaClient/prismaClient";

export const findAllProducts = async () => {
  try {
    return await prisma.product.findMany();
  } catch (error) {
    throw new Error("Erro ao buscar todos os produtos");
  }
};

export const findOneProduct = async (id: number) => {
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new Error("Produto não encontrado");
    }
    return product;
  } catch (error) {
    throw new Error("Erro ao buscar produto");
  }
};

export const createProduct = async (data: CreateProductInput) => {
  try {
    if (!data) {
      throw new Error("Dados do produto estão ausentes");
    }
    const product = await prisma.product.create({ data });
    if (!product) {
      throw new Error("Falha ao criar produto");
    }
    return product;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Erro ao criar produto");
    }
    throw new Error("Erro desconhecido ao criar produto");
  }
};

export const updateProduct = async (id: number, data: UpdateProductInput) => {
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new Error("Produto não encontrado");
    }
    return await prisma.product.update({ where: { id }, data });
  } catch (error) {
    throw new Error("Erro ao atualizar produto");
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new Error("Produto não encontrado");
    }
    return await prisma.product.delete({ where: { id } });
  } catch (error) {
    throw new Error("Erro ao deletar produto");
  }
};
