import { Request, Response } from "express";
import {
  createStripeCardPayment,
  
} from "../services/paymentStripeService";
import { getIdUser } from "../utils/getIdUser";


export const createStripeCardPaymentController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = await getIdUser(res);
    const { url } = await createStripeCardPayment(userId);

    res.json({ url });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Erro ao criar sessão de pagamento com Stripe" });
    }
  }
};
