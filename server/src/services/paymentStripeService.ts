import { stripe } from "../config/stripe";
import prisma from "../prismaClient/prismaClient";

export const createStripeCardPayment = async (
  userId: number,
  addressId: number
) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (!cartItems.length) {
      throw new Error("Carrinho vazio");
    }

    if (!addressId) {
      throw new Error("Endereço é necessáro antes de finalizar a compra");
    }

    const address = await prisma.address.findUnique({
      where: {
        id: addressId,
      },
    });

    if (!address) {
      throw new Error("Endereço não encontrado");
    }

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.product.name,
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url:
        "http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/payment/cancel",
      metadata: { userId: String(userId), address: String(address.id) },
    });

    return { url: session.url };
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Erro ao criar sessão de pagamento com Stripe");
  }
};
