import prisma from "../prismaClient/prismaClient";

export const createCartItemService = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new Error("Produto não encontrado");
  }

  try {
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (existingCartItem) {
      const updatedCartItem = await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });
      return updatedCartItem;
    }
    const cartItem = await prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity,
      },
    });
    return cartItem;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const deleteCartItemService = async (id: number, userId: number) => {
  try {
    await prisma.cartItem.delete({ where: { id, userId } });
    return { message: "Carrinho deletado com sucesso" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const deleteProductFromCartService = async (
  cartId: number,
  userId: number,
  productId: number
) => {
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id: cartId,
      userId,
      productId,
    },
  });

  if (!cartItem) {
    throw new Error("Item do carrinho não encontrado");
  }

  try {
    await prisma.cartItem.deleteMany({
      where: {
        id: cartId,
        userId,
        productId,
      },
    });
    return { message: "Item deletado com sucesso" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const findAllCartItemsService = async (userId: number) => {
  try {
    const cartItems = await prisma.cartItem.findMany({ where: { userId } });
    return cartItems;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const updateQuantityCartItemService = async (userId: number, productId: number, quantity: number) => {
  const existingCartItem = await prisma.cartItem.findFirst({
    where: {
      userId,
      productId,
    },
  });

  if (!existingCartItem) {
    throw new Error("Item do carrinho não encontrado");
  }

  try {
    const updatedCartItem = await prisma.cartItem.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        quantity,
      },
    });
    return updatedCartItem;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};
