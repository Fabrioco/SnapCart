import express from "express";
import {
  createOrderFromCartController,
  findAllOrdersController,
  findOneOrderController,
  updateStatusOrderController,
} from "../controllers/orderController";

const router = express.Router();

router.post("/orders", createOrderFromCartController);
router.get("/orders", findAllOrdersController);
router.get("/orders/:id", findOneOrderController);
router.patch("/orders/:id", updateStatusOrderController);

export default router;
