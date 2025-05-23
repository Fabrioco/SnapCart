import prisma from "../prismaClient/prismaClient";
import {
  CreateAddressInput,
  UpdateAddressInput,
} from "../validators/addressValidator";

export const createNewAddressForUser = async (
  data: CreateAddressInput,
  userId: number
) => {
  if (!data) {
    throw new Error("Dados do endereço ausentes");
  }

  if (!userId) {
    throw new Error("Usuário não encontrado");
  }

  try {
    const address = await prisma.address.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return address;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Erro ao criar endereço");
  }
};

export const getAllAddressesOfUser = async (userId: number) => {
  try {
    const addresses = await prisma.address.findMany({ where: { userId } });
    return addresses;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Erro ao buscar endereço");
  }
};

export const getOneAddressByUserId = async (id: number, userId: number) => {
  try {
    const address = await prisma.address.findUnique({ where: { id, userId } });
    return address;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Erro ao buscar endereço");
  }
};

export const updateExistingAddress = async (
  id: number,
  data: UpdateAddressInput
) => {
  if (!data) {
    throw new Error("Dados do endereço ausentes");
  }
  try {
    const address = await prisma.address.update({ where: { id }, data });
    return address;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Erro ao atualizar endereço");
  }
};

export const deleteAddressById = async (id: number) => {
  try {
    const address = await prisma.address.delete({ where: { id } });
    return address;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Erro ao deletar endereço");
  }
};
