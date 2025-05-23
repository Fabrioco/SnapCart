import express from "express";
import {
  create,
  getAllOfUser,
  update,
  remove,
  getOne,
} from "../controllers/addressController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/addresses", authMiddleware, create);
router.get("/addresses", authMiddleware, getAllOfUser);
router.get("/addresses/:id", authMiddleware, getOne);
router.patch("/addresses/:id", authMiddleware, update);
router.delete("/addresses/:id", authMiddleware, remove);

export default router;
