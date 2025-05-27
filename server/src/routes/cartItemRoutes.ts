import express from "express";
import {
  addCartItem,
  deleteCartItem,
  deleteProductFromCart,
  findAllCartItems,
  updateQuantityCartItem,
} from "../controllers/cartItemController";

const router = express.Router();

router.post("/cart-items", addCartItem);
router.delete("/cart-items/:id", deleteCartItem);
router.delete("/cart-items/:cartId/product/:productId", deleteProductFromCart);
router.get("/cart-items", findAllCartItems);
router.patch("/cart-items/:productId", updateQuantityCartItem);

export default router;
