import { Request, Response } from "express";
import {
  finalizePurchaseService,
  findAllOrdersService,
  findOneOrderService,
  updateStatusOrderService,
} from "../services/orderService";
import { getIdUser } from "../utils/getIdUser";
import prisma from "../prismaClient/prismaClient";
import { stripe } from "../config/stripe";

export const createOrderFromCartController = async (
  req: Request,
  res: Response
) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      throw new Error("paymentId é necessário");
    }

    const verifyOrder = await prisma.order.findMany({
      where: {
        paymentId,
      },
    });

    if (verifyOrder.length) {
      throw new Error("Pedido já cadastrado");
    }

    const result = await finalizePurchaseService(paymentId);
    res.status(201).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Erro ao criar pedido" });
    }
  }
};

export const findAllOrdersController = async (req: Request, res: Response) => {
  try {
    const userId = await getIdUser(res);
    const orders = await findAllOrdersService(+userId);
    if (!orders) throw new Error("Nenhum pedido encontrado");

    res.status(200).json(orders);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Erro ao buscar pedidos" });
    }
  }
};

export const findOneOrderController = async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.id;

    const order = await findOneOrderService(sessionId);
    if (!order) throw new Error("Pedido não encontrado");

    const paymentId = await stripe.paymentIntents.retrieve(
      String(order.payment_intent)
    );

    res.status(200).json({ order, paymentId });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Erro ao buscar pedido" });
    }
  }
};

export const updateStatusOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      throw new Error("Id e status são necessários");
    }

    const updatedOrder = await updateStatusOrderService(id, status);
    res.status(200).json(updatedOrder);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Erro ao atualizar status do pedido" });
    }
  }
};

