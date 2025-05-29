import { stripe } from "../config/stripe";
import { transporterMail } from "../config/transporter";
import prisma from "../prismaClient/prismaClient";

export const finalizePurchaseService = async (sessionId: string) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || !session.payment_intent) {
      throw new Error("Sessão inválida ou sem Payment Intent.");
    }

    const payment = await stripe.paymentIntents.retrieve(
      session.payment_intent as string
    );

    if (payment.status !== "succeeded") {
      throw new Error("Pagamento não foi aprovado.");
    }

    const id = session.metadata?.userId;

    const userId = Number(id);

    if (!userId) {
      throw new Error("Usuário nao encontrado.");
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (!cartItems.length) {
      throw new Error("Carrinho está vazio.");
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
    if (!session.metadata) {
      throw new Error("Dados não encontrados");
    }

    const order = await prisma.order.create({
      data: {
        userId: Number(session.metadata.userId),
        paymentId: sessionId,
        total,
        addressId: Number(session.metadata.address),
        orderStatus: "Pago",
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user && user.email) {
      const mailOptions = {
        from: "ecommerce fabriciooliveiralopes50@gmail.com", // quem está enviando
        to: user.email, // destinatário
        subject: `Pedido #${order.paymentId} confirmado!`, // assunto do e-mail
        text: `Olá, ${user.name}! Seu pedido foi confirmado. Total: R$ ${total.toFixed(2).replace(".", ",")}`,
        html: `<p>Olá, <strong>${user.name}</strong>! Seu pedido foi confirmado.</p><p>Total: <strong>R$ ${total.toFixed(2).replace(".", ",")}</strong></p>`,
      };

      await transporterMail.sendMail(mailOptions);
    }

    await prisma.cartItem.deleteMany({ where: { userId } });

    return { success: true, order };
  } catch (error) {
    console.error("Erro ao finalizar compra:", error);
    throw new Error(
      error instanceof Error ? error.message : "Erro ao finalizar compra"
    );
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

export const updateStatusOrderService = async (id: number, status: string) => {
  try {
    const order = await prisma.order.update({
      where: { id },
      data: { orderStatus: status },
    });
    return order;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Erro ao atualizar status do pedido");
  }
};

