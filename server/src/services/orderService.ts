import { stripe } from "../config/stripe";
import prisma from "../prismaClient/prismaClient";

export const createOrderFromCartService = async (
  userId: number,
  paymentId: string
) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (!cartItems.length) throw new Error("Carrinho está vazio");

    const total = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    const order = await prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        paymentId,
        total,
        orderStatus: "Pagamento pendente",
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    await prisma.cartItem.deleteMany({ where: { userId } });

    return { message: "Pedido criado com sucesso", order };
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Erro ao finalizar compra");
  }
};

export const findAllOrdersService = async (userId: number) => {
  try {
    if (!userId) throw new Error("Usuário inválido");

    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });

    if (!orders.length) {
      throw new Error("Nenhum pedido encontrado para o usuário");
    }

    return orders;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Erro ao buscar pedidos");
  }
};

export const findOneOrderService = async (sessionId: string) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return {
      id: session.id,
      status: session.status,
      amount_total: session.amount_total,
      payment_intent: session.payment_intent,
      created: session.created,
      items: session.line_items,
      metadata: session.metadata,
    };
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Erro ao buscar pedidos");
  }
};
