import express, { Request, Response } from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../controllers/productController";
import { verifyRoleAdmin } from "../middlewares/verifyRoleAdminMiddleware";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", getOne);
router.post("/products", verifyRoleAdmin, create);
router.patch("/products/:id", verifyRoleAdmin, update);
router.delete("/products/:id", verifyRoleAdmin, remove);

export default router;
