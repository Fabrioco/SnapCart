import prisma from "../prismaClient/prismaClient";

export const createFavoriteService = async (
  userId: number,
  productId: number
) => {
  try {
    const favorite = await prisma.favorite.create({
      data: {
        userId,
        productId,
      },
    });
    return favorite;
  } catch (error) {
    throw error;
  }
};

export const findAllFavoritesService = async (userId: number) => {
  try {
    const favorites = await prisma.favorite.findMany({ where: { userId } });
    return favorites;
  } catch (error) {
    throw error;
  }
};

export const findOneFavoriteService = async (
  userId: number,
  productId: number
) => {
  try {
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
    if (!favorite) {
      throw new Error("Produto não encontrado");
    }
    return favorite;
  } catch (error) {
    throw error;
  }
};

export const deleteFavoriteService = async (
  userId: number,
  productId: number
) => {
  try {
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!favorite) {
      throw new Error("Produto nao encontrado");
    }

    const deletedFavorite = await prisma.favorite.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
    return deletedFavorite;
  } catch (error) {
    throw error;
  }
};
