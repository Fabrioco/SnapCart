import express from "express";
import {
  createOrderFromCartController,
  findAllOrdersController,
  findOneOrderController,
} from "../controllers/orderController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/orders", authMiddleware, createOrderFromCartController);
router.get("/orders", authMiddleware, findAllOrdersController);
router.get("/orders/:id", authMiddleware, findOneOrderController);

export default router;
