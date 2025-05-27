import express from "express";
import { createStripeCardPaymentController } from "../controllers/paymentStripeController";

const router = express.Router();

router.post("/stripe/card", createStripeCardPaymentController);

export default router;
